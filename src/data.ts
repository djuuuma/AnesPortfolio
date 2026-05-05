
export interface Project {
  title: string;
  description: string;
  link: string;
  tags: string[];
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
    title: "Zrno Liard",
    description: "A premium creative portfolio and agency website designed to showcase high-end visual work and digital solutions with a focus on minimalist aesthetics.",
    link: "https://zrno-liard.vercel.app",
    tags: ["React", "Motion", "Tailwind CSS", "UI/UX"]
  },
  {
    title: "Dr. SK Ordinacija",
    description: "A comprehensive digital platform for a modern medical clinic, featuring appointment scheduling, service information, and a patient-centric interface.",
    link: "https://dr-sk-ordinacija.vercel.app/",
    tags: ["Next.js", "Healthcare", "Web Apps", "SEO"]
  },
  {
    title: "Foto Djumisic V2",
    description: "A professional photography showcase featuring immersive galleries, client categories, and optimized image delivery for high-performance visual storytelling.",
    link: "https://foto-djumisic-v2.vercel.app/",
    tags: ["Photography", "Portfolio", "Image Optimization", "React"]
  },
  {
    title: "MSN Design",
    description: "An architectural and interior design studio website that emphasizes structural elegance and visual harmony through grid-based layouts and high-resolution imagery.",
    link: "https://msn-design.vercel.app/",
    tags: ["Architecture", "Design", "Grid Layouts", "Branding"]
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: "Silver Badge of University of Sarajevo",
    issuer: "University of Sarajevo",
    date: "2025",
    description: "Awarded for exceptional academic results during undergraduate studies at the Faculty of Electrical Engineering (ETF)."
  },
  {
    title: "Dean's List",
    issuer: "ETF Sarajevo",
    date: "2023 - 2024",
    description: "Recognized for maintaining a GPA within the top 5% of the Computing and Informatics department."
  },
  {
    title: "National Competition in Informatics",
    issuer: "Ministry of Education",
    date: "2022",
    description: "Placed in Top 10 nationally for algorithmic problem solving and software design."
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: "Tech Solutions d.o.o.",
    role: "Full-Stack Developer Intern",
    period: "June 2024 - Sept 2024",
    description: [
      "Collaborated on building a real-time monitoring dashboard for industrial IoT devices.",
      "Optimized database queries reducing load times by 40%.",
      "Implemented responsive UI components using React and Tailwind CSS."
    ]
  },
  {
    company: "Faculty of Electrical Engineering (ETF)",
    role: "Student Teaching Assistant",
    period: "Oct 2023 - June 2024",
    description: [
      "Assisted in 'Programming Techniques' and 'Algorithms and Data Structures' courses.",
      "Provided mentorship to 50+ first-year students during lab sessions.",
      "Contributed to course material updates and automated grading scripts."
    ]
  }
];
