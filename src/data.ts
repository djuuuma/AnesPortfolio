
export interface Project {
  title: string;
  description: string;
  link: string;
  tags: string[];
  /** Optional screenshot — add a path like "/screenshots/zrno.jpg" (save to public/) or a URL */
  image?: string;
}

export interface Achievement {
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export const PROJECTS: Project[] = [
  {
    title: "Zrno",
    description: "Digital online menu for UR Caffe Bar & Slastičarnica Zrno in Sarajevo. Showcases the café's philosophy, full menu, opening hours, and location.",
    link: "https://zrno-online-menu.vercel.app/",
    tags: ["React", "Online Menu", "Local Business", "UI/UX"],
    image: "/zrno.png",
  },
  {
    title: "Guerilla Intel",
    description:
      "Lineup reference web app — browse and compare roster-style lineups in a focused, readable layout.",
    link: "https://smokovi-za-kanter.vercel.app/",
    tags: ["React", "Reference Tool", "UI/UX", "Vercel"],
    image: "/gurilla%20intel.png",
  },
  {
    title: "Dr. SK Ordinacija",
    description: "Patient-facing website for Dr. Sanela Kapić's dental clinic. Presents services, clinic information, and contact details with a clean, trustworthy interface.",
    link: "https://dr-sk-ordinacija.vercel.app/",
    tags: ["Next.js", "Dental Clinic", "Web App", "SEO"],
    image: "/drsk.png",
  },
  {
    title: "Foto Đumišić V2",
    description: "Wedding and family photography studio website for Foto Đumišić in Sarajevo. Features immersive galleries, service categories, and a booking inquiry form.",
    link: "https://foto-djumisic-v2.vercel.app/",
    tags: ["React", "Photography", "Portfolio", "Image Optimization"],
    image: "/fotodjumisic.png",
  },
  {
    title: "MSN Design",
    description: "Business website for MSN Design — a Sarajevo studio specialising in direct print on glass and ceramics. Targets HoReCa clients and B2B branding projects.",
    link: "https://msn-design.vercel.app/",
    tags: ["Business Website", "Branding", "Web App", "B2B"],
    image: "/msndesign.png",
  }
];

export const ACHIEVEMENTS: Achievement[] = [];

export const EXPERIENCES: Experience[] = [
  {
    company: "FEF Export Import doo Sarajevo",
    role: "Inventory & Data Assistant",
    period: "Jan 2022 – Present",
    description: [
      "Digitally transformed manual operational records, migrating paper-based logs into structured digital systems.",
      "Managed and processed work and travel orders to facilitate accurate company logistics.",
      "Maintained inventory accuracy using Microsoft Excel and Google Sheets."
    ]
  },
  {
    company: "People's Lounge",
    role: "Bartender",
    period: "Jul 2024 – Sep 2024",
    description: [
      "Curated and prepared classic and signature cocktails with consistent flavor profiles and presentation.",
      "Operated professional espresso machinery in a high-volume environment.",
      "Tracked daily stock levels, identified waste patterns, and coordinated orders for seamless bar operations."
    ]
  }
];
