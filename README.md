# Anes Portfolio

Personal portfolio site for a Computing and Informatics student at **ETF Sarajevo** (Faculty of Electrical Engineering, University of Sarajevo). It highlights projects, academic achievements, and work experience in a single-page layout with smooth motion and a responsive UI.

**Live repo:** [github.com/djuuuma/AnesPortfolio](https://github.com/djuuuma/AnesPortfolio)

## Features

- **Hero** with intro, avatar, and primary calls to action  
- **Stats** strip (projects, GPA, courses, experience)  
- **Tabs** for **Projects**, **Academia**, and **Careers** with cards and timelines  
- **Contact** section with social links and a message form (UI only; wire-up as needed)  
- **Dark-friendly theming** via CSS variables and Tailwind  

## Tech stack

| Area | Choice |
|------|--------|
| UI | React 19, TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS v4, Geist Variable |
| Components | shadcn-style primitives (`components/ui`), Base UI |
| Motion | Motion (`motion/react`) |
| Icons | Lucide React |

## Getting started

**Prerequisites:** [Node.js](https://nodejs.org/) (LTS recommended)

```bash
npm install
npm run dev
```

The dev server listens on **port 3000** and binds to all interfaces (`0.0.0.0`), so you can open it from other devices on your network if needed.

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Typecheck with `tsc --noEmit` |

## Customizing content

Most copy and lists live in **`src/data.ts`** (`PROJECTS`, `ACHIEVEMENTS`, `EXPERIENCES`).  
Hero text, navigation labels, contact details, and layout structure are in **`src/App.tsx`**.

Replace the placeholder avatar URL, email, and social URLs in `App.tsx` with your own.

## Environment variables

The template ship with **`.env.example`** (e.g. `GEMINI_API_KEY`, `APP_URL`) for optional integrations. The current portfolio UI does not call the Gemini API; you only need a `.env` file if you add features that use those variables. Vite loads env from the project root; see [Vite env docs](https://vitejs.dev/guide/env-and-mode.html) for naming (`VITE_` prefix if you expose values to the browser).

## License

Private / personal project unless you add an explicit license.
