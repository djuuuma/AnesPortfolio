import {
  createContext,
  forwardRef,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import { debounce } from "lodash"
import Matter, {
  Bodies,
  Common,
  Engine,
  Events,
  Mouse,
  MouseConstraint,
  Query,
  Render,
  Runner,
  World,
} from "matter-js"
import decomp from "poly-decomp"
import SVGPathCommander from "svg-path-commander"

import { cn } from "@/lib/utils"

/** Matter.Mouse implements these at runtime; @types/matter-js omits them. */
type MatterMouseDomHandlers = {
  mousedown: (event: MouseEvent | TouchEvent) => void
  mousemove: (event: MouseEvent | TouchEvent) => void
  mouseup: (event: MouseEvent | TouchEvent) => void
}

/**
 * Feed pointer input through Matter.Mouse's own handlers so positions use the
 * same math as _getRelativeMousePosition (pageX/scroll + canvas backing-store
 * scale). Setting mouse.position from clientX/rect alone breaks hit-tests on
 * high-DPI / scaled canvases — especially on iOS Safari.
 */
function forwardPointerToMatterMouse(
  mouse: Matter.Mouse & MatterMouseDomHandlers,
  e: PointerEvent,
  phase: "down" | "move" | "up"
) {
  const touchLike = e.pointerType === "touch" || e.pointerType === "pen"

  const asTouchList = (): TouchList => {
    const touch = {
      identifier: e.pointerId,
      target: e.target as EventTarget,
      clientX: e.clientX,
      clientY: e.clientY,
      screenX: e.screenX,
      screenY: e.screenY,
      pageX: e.pageX,
      pageY: e.pageY,
      radiusX: 0,
      radiusY: 0,
      rotationAngle: 0,
      force: 0,
    } as Touch
    return {
      length: 1,
      item: (index: number) => (index === 0 ? touch : null),
      [Symbol.iterator]: function* () {
        yield touch
      },
    } as unknown as TouchList
  }

  if (touchLike) {
    const synthetic = {
      changedTouches: asTouchList(),
      touches: phase === "up" ? asTouchList() : asTouchList(),
      preventDefault: () => e.preventDefault(),
      stopPropagation: () => e.stopPropagation(),
    } as unknown as TouchEvent

    if (phase === "down") mouse.mousedown(synthetic)
    else if (phase === "move") mouse.mousemove(synthetic)
    else mouse.mouseup(synthetic)
  } else {
    if (phase === "down") mouse.mousedown(e as unknown as MouseEvent)
    else if (phase === "move") mouse.mousemove(e as unknown as MouseEvent)
    else mouse.mouseup(e as unknown as MouseEvent)
  }
}

function parsePathToVertices(path: string, sampleLength = 15) {
  const commander = new SVGPathCommander(path)

  const points: { x: number; y: number }[] = []
  let lastPoint: { x: number; y: number } | null = null

  const totalLength = commander.getTotalLength()
  let length = 0

  while (length < totalLength) {
    const point = commander.getPointAtLength(length)

    if (!lastPoint || point.x !== lastPoint.x || point.y !== lastPoint.y) {
      points.push({ x: point.x, y: point.y })
      lastPoint = point
    }

    length += sampleLength
  }

  const finalPoint = commander.getPointAtLength(totalLength)
  if (
    lastPoint &&
    (finalPoint.x !== lastPoint.x || finalPoint.y !== lastPoint.y)
  ) {
    points.push({ x: finalPoint.x, y: finalPoint.y })
  }

  return points
}

function calculatePosition(
  value: number | string | undefined,
  containerSize: number,
  elementSize: number
) {
  if (typeof value === "string" && value.endsWith("%")) {
    const percentage = parseFloat(value) / 100
    return containerSize * percentage
  }
  return typeof value === "number"
    ? value
    : elementSize - containerSize + elementSize / 2
}

type GravityProps = {
  children: ReactNode
  debug?: boolean
  gravity?: { x: number; y: number }
  resetOnResize?: boolean
  grabCursor?: boolean
  addTopWall?: boolean
  autoStart?: boolean
  className?: string
}

type PhysicsBody = {
  element: HTMLElement
  body: Matter.Body
  props: MatterBodyProps
}

type MatterBodyProps = {
  children: ReactNode
  matterBodyOptions?: Matter.IBodyDefinition
  isDraggable?: boolean
  bodyType?: "rectangle" | "circle" | "svg"
  sampleLength?: number
  x?: number | string
  y?: number | string
  angle?: number
  className?: string
}

export type GravityRef = {
  start: () => void
  stop: () => void
  reset: () => void
}

const GravityContext = createContext<{
  registerElement: (
    id: string,
    element: HTMLElement,
    props: MatterBodyProps
  ) => void
  unregisterElement: (id: string) => void
} | null>(null)

const MatterBody: FC<MatterBodyProps> = ({
  children,
  className,
  matterBodyOptions = {
    friction: 0.1,
    restitution: 0.1,
    density: 0.001,
    isStatic: false,
  },
  bodyType = "rectangle",
  isDraggable = true,
  sampleLength = 15,
  x = 0,
  y = 0,
  angle = 0,
}) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(Math.random().toString(36).substring(7))
  const context = useContext(GravityContext)

  // Register on mount, unregister on unmount. Re-registering on every render
  // (the original implementation) creates a feedback loop because rest props
  // are a fresh object each render.
  useEffect(() => {
    if (!elementRef.current || !context) return
    const id = idRef.current
    context.registerElement(id, elementRef.current, {
      children,
      matterBodyOptions,
      bodyType,
      sampleLength,
      isDraggable,
      x,
      y,
      angle,
    })

    return () => context.unregisterElement(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={elementRef}
      className={cn(
        "absolute",
        className,
        isDraggable && "pointer-events-none"
      )}
    >
      {children}
    </div>
  )
}

const Gravity = forwardRef<GravityRef, GravityProps>(
  (
    {
      children,
      debug = false,
      gravity = { x: 0, y: 1 },
      grabCursor = true,
      resetOnResize = true,
      addTopWall = true,
      autoStart = true,
      className,
    },
    ref
  ) => {
    const canvas = useRef<HTMLDivElement>(null)
    const engine = useRef(Engine.create())
    const render = useRef<Render | null>(null)
    const runner = useRef<Runner | null>(null)
    const bodiesMap = useRef(new Map<string, PhysicsBody>())
    const frameId = useRef<number | null>(null)
    const mouseConstraint = useRef<Matter.MouseConstraint | null>(null)
    const mouseDown = useRef(false)
    const pointerDownHandler = useRef<((e: PointerEvent) => void) | null>(null)
    const pointerMoveHandler = useRef<((e: PointerEvent) => void) | null>(null)
    const pointerUpHandler = useRef<((e: PointerEvent) => void) | null>(null)
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })

    const isRunning = useRef(false)

    const registerElement = useCallback(
      (id: string, element: HTMLElement, props: MatterBodyProps) => {
        if (!canvas.current) return
        const width = element.offsetWidth
        const height = element.offsetHeight
        const canvasRect = canvas.current.getBoundingClientRect()

        const angle = (props.angle || 0) * (Math.PI / 180)

        const x = calculatePosition(props.x, canvasRect.width, width)
        const y = calculatePosition(props.y, canvasRect.height, height)

        let body: Matter.Body | undefined
        if (props.bodyType === "circle") {
          const radius = Math.max(width, height) / 2
          body = Bodies.circle(x, y, radius, {
            ...props.matterBodyOptions,
            angle,
            render: {
              fillStyle: debug ? "#888888" : "#00000000",
              strokeStyle: debug ? "#333333" : "#00000000",
              lineWidth: debug ? 3 : 0,
            },
          })
        } else if (props.bodyType === "svg") {
          const paths = element.querySelectorAll("path")
          const vertexSets: Matter.Vector[][] = []

          paths.forEach((path) => {
            const d = path.getAttribute("d")
            if (!d) return
            const p = parsePathToVertices(d, props.sampleLength)
            vertexSets.push(p)
          })

          body = Bodies.fromVertices(x, y, vertexSets, {
            ...props.matterBodyOptions,
            angle,
            render: {
              fillStyle: debug ? "#888888" : "#00000000",
              strokeStyle: debug ? "#333333" : "#00000000",
              lineWidth: debug ? 3 : 0,
            },
          })
        } else {
          body = Bodies.rectangle(x, y, width, height, {
            ...props.matterBodyOptions,
            angle,
            render: {
              fillStyle: debug ? "#888888" : "#00000000",
              strokeStyle: debug ? "#333333" : "#00000000",
              lineWidth: debug ? 3 : 0,
            },
          })
        }

        if (body) {
          World.add(engine.current.world, [body])
          bodiesMap.current.set(id, { element, body, props })
        }
      },
      [debug]
    )

    const unregisterElement = useCallback((id: string) => {
      const body = bodiesMap.current.get(id)
      if (body) {
        World.remove(engine.current.world, body.body)
        bodiesMap.current.delete(id)
      }
    }, [])

    const updateElements = useCallback(() => {
      bodiesMap.current.forEach(({ element, body }) => {
        const { x, y } = body.position
        const rotation = body.angle * (180 / Math.PI)

        element.style.transform = `translate(${
          x - element.offsetWidth / 2
        }px, ${y - element.offsetHeight / 2}px) rotate(${rotation}deg)`
      })

      frameId.current = requestAnimationFrame(updateElements)
    }, [])

    const startEngine = useCallback(() => {
      if (runner.current) {
        runner.current.enabled = true
        Runner.run(runner.current, engine.current)
      }
      if (render.current) {
        Render.run(render.current)
      }
      frameId.current = requestAnimationFrame(updateElements)
      isRunning.current = true
    }, [updateElements])

    const stopEngine = useCallback(() => {
      if (!isRunning.current) return

      if (runner.current) {
        Runner.stop(runner.current)
      }
      if (render.current) {
        Render.stop(render.current)
      }
      if (frameId.current) {
        cancelAnimationFrame(frameId.current)
      }
      isRunning.current = false
    }, [])

    const initializeRenderer = useCallback(() => {
      if (!canvas.current) return

      const height = canvas.current.offsetHeight
      const width = canvas.current.offsetWidth

      // poly-decomp is required for non-convex SVG bodies. Vite is ESM, so we
      // import it statically and hand it to Matter via setDecomp here.
      Common.setDecomp(decomp)

      engine.current.gravity.x = gravity.x
      engine.current.gravity.y = gravity.y

      render.current = Render.create({
        element: canvas.current,
        engine: engine.current,
        options: {
          width,
          height,
          wireframes: false,
          background: "#00000000",
        },
      })

      // Mobile/touch: ensure dragging doesn't get swallowed by page scrolling.
      // Matter.js uses touch events under the hood, but browsers may treat the
      // interaction as a pan/scroll unless touch-action is disabled.
      canvas.current.style.touchAction = "none"
      ;(canvas.current.style as unknown as { msTouchAction?: string }).msTouchAction =
        "none"
      render.current.canvas.style.touchAction = "none"
      ;(render.current.canvas.style as unknown as { msTouchAction?: string }).msTouchAction =
        "none"

      const mouse = Mouse.create(render.current.canvas) as Matter.Mouse &
        MatterMouseDomHandlers

      mouseConstraint.current = MouseConstraint.create(engine.current, {
        mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: debug,
          },
        },
      })

      // Pointer Events: forward through Matter.Mouse so coords match Physics/canvas scaling.
      const canvasEl = render.current.canvas

      const onPointerDown = (e: PointerEvent) => {
        // Primary button / first touch only
        if (!e.isPrimary) return
        if (e.pointerType === "touch" || e.pointerType === "pen") {
          e.preventDefault()
        }
        try {
          canvasEl.setPointerCapture(e.pointerId)
        } catch {}
        forwardPointerToMatterMouse(mouse, e, "down")
      }

      const onPointerMove = (e: PointerEvent) => {
        forwardPointerToMatterMouse(mouse, e, "move")
        const dragging =
          !!mouseConstraint.current?.body || mouse.button === 0
        if (
          dragging &&
          (e.pointerType === "touch" || e.pointerType === "pen")
        ) {
          e.preventDefault()
        }
      }

      const onPointerUp = (e: PointerEvent) => {
        if (!e.isPrimary) return
        if (e.pointerType === "touch" || e.pointerType === "pen") {
          e.preventDefault()
        }
        forwardPointerToMatterMouse(mouse, e, "up")
        try {
          canvasEl.releasePointerCapture(e.pointerId)
        } catch {}
      }

      pointerDownHandler.current = onPointerDown
      pointerMoveHandler.current = onPointerMove
      pointerUpHandler.current = onPointerUp

      canvasEl.addEventListener("pointerdown", onPointerDown, { passive: false })
      canvasEl.addEventListener("pointermove", onPointerMove, { passive: false })
      canvasEl.addEventListener("pointerup", onPointerUp, { passive: false })
      canvasEl.addEventListener("pointercancel", onPointerUp, { passive: false })

      const walls = [
        Bodies.rectangle(width / 2, height + 10, width, 20, {
          isStatic: true,
          friction: 1,
          render: { visible: debug },
        }),
        Bodies.rectangle(width + 10, height / 2, 20, height, {
          isStatic: true,
          friction: 1,
          render: { visible: debug },
        }),
        Bodies.rectangle(-10, height / 2, 20, height, {
          isStatic: true,
          friction: 1,
          render: { visible: debug },
        }),
      ]

      const topWall = addTopWall
        ? Bodies.rectangle(width / 2, -10, width, 20, {
            isStatic: true,
            friction: 1,
            render: { visible: debug },
          })
        : null

      if (topWall) {
        walls.push(topWall)
      }

      const touchingMouse = () =>
        Query.point(
          engine.current.world.bodies,
          mouseConstraint.current?.mouse.position || { x: 0, y: 0 }
        ).length > 0

      if (grabCursor) {
        Events.on(engine.current, "beforeUpdate", () => {
          if (canvas.current) {
            if (!mouseDown.current && !touchingMouse()) {
              canvas.current.style.cursor = "default"
            } else if (touchingMouse()) {
              canvas.current.style.cursor = mouseDown.current
                ? "grabbing"
                : "grab"
            }
          }
        })

        canvas.current.addEventListener("mousedown", () => {
          mouseDown.current = true

          if (canvas.current) {
            if (touchingMouse()) {
              canvas.current.style.cursor = "grabbing"
            } else {
              canvas.current.style.cursor = "default"
            }
          }
        })
        canvas.current.addEventListener("mouseup", () => {
          mouseDown.current = false

          if (canvas.current) {
            if (touchingMouse()) {
              canvas.current.style.cursor = "grab"
            } else {
              canvas.current.style.cursor = "default"
            }
          }
        })
      }

      World.add(engine.current.world, [mouseConstraint.current, ...walls])

      render.current.mouse = mouse

      runner.current = Runner.create()
      Render.run(render.current)
      updateElements()
      runner.current.enabled = false

      if (autoStart) {
        runner.current.enabled = true
        startEngine()
      }
    }, [
      updateElements,
      debug,
      autoStart,
      addTopWall,
      grabCursor,
      gravity.x,
      gravity.y,
      startEngine,
    ])

    const clearRenderer = useCallback(() => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current)
      }

      if (mouseConstraint.current) {
        World.remove(engine.current.world, mouseConstraint.current)
      }

      if (render.current) {
        Mouse.clearSourceEvents(render.current.mouse)
        if (pointerDownHandler.current) {
          render.current.canvas.removeEventListener(
            "pointerdown",
            pointerDownHandler.current
          )
          pointerDownHandler.current = null
        }
        if (pointerMoveHandler.current) {
          render.current.canvas.removeEventListener(
            "pointermove",
            pointerMoveHandler.current
          )
          pointerMoveHandler.current = null
        }
        if (pointerUpHandler.current) {
          render.current.canvas.removeEventListener(
            "pointerup",
            pointerUpHandler.current
          )
          render.current.canvas.removeEventListener(
            "pointercancel",
            pointerUpHandler.current
          )
          pointerUpHandler.current = null
        }
        Render.stop(render.current)
        render.current.canvas.remove()
      }

      if (runner.current) {
        Runner.stop(runner.current)
      }

      if (engine.current) {
        World.clear(engine.current.world, false)
        Engine.clear(engine.current)
      }

      bodiesMap.current.clear()
    }, [])

    const handleResize = useCallback(() => {
      if (!canvas.current || !resetOnResize) return

      const newWidth = canvas.current.offsetWidth
      const newHeight = canvas.current.offsetHeight

      setCanvasSize({ width: newWidth, height: newHeight })

      clearRenderer()
      initializeRenderer()
    }, [clearRenderer, initializeRenderer, resetOnResize])

    const reset = useCallback(() => {
      stopEngine()
      bodiesMap.current.forEach(({ element, body, props }) => {
        body.angle = props.angle || 0

        const x = calculatePosition(
          props.x,
          canvasSize.width,
          element.offsetWidth
        )
        const y = calculatePosition(
          props.y,
          canvasSize.height,
          element.offsetHeight
        )
        body.position.x = x
        body.position.y = y
      })
      updateElements()
      handleResize()
    }, [canvasSize.height, canvasSize.width, handleResize, stopEngine, updateElements])

    useImperativeHandle(
      ref,
      () => ({
        start: startEngine,
        stop: stopEngine,
        reset,
      }),
      [startEngine, stopEngine, reset]
    )

    useEffect(() => {
      if (!resetOnResize) return

      const debouncedResize = debounce(handleResize, 500)
      window.addEventListener("resize", debouncedResize)

      return () => {
        window.removeEventListener("resize", debouncedResize)
        debouncedResize.cancel()
      }
    }, [handleResize, resetOnResize])

    useEffect(() => {
      initializeRenderer()
      return clearRenderer
    }, [initializeRenderer, clearRenderer])

    return (
      <GravityContext.Provider value={{ registerElement, unregisterElement }}>
        <div
          ref={canvas}
          className={cn(className, "absolute top-0 left-0 w-full h-full")}
        >
          {children}
        </div>
      </GravityContext.Provider>
    )
  }
)

Gravity.displayName = "Gravity"
export { Gravity, MatterBody }
