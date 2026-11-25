export const personalInfo = {
  name: "ASHIF",
  fullName: "Ashif Ahamad",
  taglines: [
    "Full Stack Developer",
    "MERN Stack Engineer",
    ".NET & Angular Developer",
    "AI Integrations Builder",
    "Problem Solver",
  ],
  bio: "I'm a Full Stack Developer driven by one thing — building software that solves real problems. I work across MERN, Angular, ASP.NET Core, and AI integrations, with a focus on microservices architecture and secure REST APIs. Every project I ship has to be something I'm proud to put my name on.",
  shortBio:
    "Full Stack Developer building production-grade systems with MERN, .NET Core, Angular, and AI.",
  location: "India",
  email: "ahamad.ashif77@gmail.com",
  github: "https://github.com/ds-ashif",
  linkedin: "https://linkedin.com/in/ashif-ahamad",
  twitter: "",
  resume: "/Ashif_Ahamad_Resume.pdf",
  avatar: "/avatar.jpg",
};

export const skills = [
  // Languages
  { name: "JavaScript", icon: "JS", color: "#F7DF1E", category: "Language", level: 90 },
  { name: "TypeScript", icon: "TS", color: "#3178C6", category: "Language", level: 82 },
  { name: "C/C++",      icon: "C+", color: "#00599C", category: "Language", level: 92 },
  { name: "Java",       icon: "☕", color: "#ED8B00", category: "Language", level: 72 },
  { name: "C#",         icon: "C#", color: "#9B4F96", category: "Language", level: 75 },
  { name: "Python",     icon: "🐍", color: "#3776AB", category: "Language", level: 70 },
  // Frontend
  { name: "React.js",    icon: "⚛️", color: "#61DAFB", category: "Frontend", level: 88 },
  { name: "Angular 17",  icon: "🅰",  color: "#DD0031", category: "Frontend", level: 80 },
  { name: "Next.js",     icon: "▲",  color: "#ffffff", category: "Frontend", level: 78 },
  { name: "Bootstrap",   icon: "🅱",  color: "#7952B3", category: "Frontend", level: 85 },
  { name: "TailwindCSS", icon: "🎨", color: "#06B6D4", category: "Frontend", level: 82 },
  // Backend
  { name: "Node.js",      icon: "🟢", color: "#339933", category: "Backend", level: 85 },
  { name: "Express.js",   icon: "⚡", color: "#ffffff", category: "Backend", level: 83 },
  { name: "ASP.NET Core", icon: ".N", color: "#512BD4", category: "Backend", level: 78 },
  { name: "JWT Auth",     icon: "🔐", color: "#D63AFF", category: "Backend", level: 78 },
  // Database
  { name: "MongoDB",    icon: "🍃", color: "#47A248", category: "Database", level: 80 },
  { name: "SQL Server", icon: "🗄",  color: "#CC2927", category: "Database", level: 75 },
  { name: "MySQL",      icon: "🐬", color: "#4479A1", category: "Database", level: 80 },
  // DevOps
  { name: "Git",   icon: "🌿", color: "#F05032", category: "DevOps", level: 88 },
  { name: "Linux", icon: "🐧", color: "#FCC624", category: "DevOps", level: 65 },
];

export const experiences = [
  {
    id: 1,
    role: "Software Engineer",
    company: "Capgemini India",
    duration: "Dec 2025 – Present",
    location: "Mumbai, India",
    description:
      "underwent a corporate training program at Capgemini India as part of the cohort, working on enterprise-grade full-stack development. Built a production-ready 4-microservice ECommerce system and earned the Capgemini Exceller Edge Fellowship on program completion.",
    achievements: [
      "Architected a 4-microservice backend (Identity, Catalog, Workflow, AdminReporting) behind an Ocelot API Gateway handling role-based routing for 4 user roles",
      "Implemented JWT-based RBAC with Angular route guards and ASP.NET Core [Authorize(Roles)], securing 15+ private API routes across all microservices",
      "Engineered a 6-step Publish Wizard with full product lifecycle pipeline (Draft → Enrichment → Review → Approved → Published)",
      "Developed Admin Reporting dashboard with KPI cards, 4 report types, and CSV/Excel export via ClosedXML",
      "Awarded Capgemini Exceller Edge Fellowship on program completion",
    ],
    technologies: ["Angular 17", "ASP.NET Core", "SQL Server", "Ocelot", "JWT", "C#", ".NET 8"],
    type: "Internship",
  },
  {
    id: 2,
    role: "AI Trainer & Conversation Specialist",
    company: "Outlier AI",
    duration: "Feb 2025 – May 2025",
    location: "Remote",
    description:
      "Worked as an AI Trainer at Outlier AI, contributing to the improvement of large language models through conversation-based training, prompt evaluation, and structured response quality assessment.",
    achievements: [
      "Trained AI models by crafting and evaluating high-quality conversational datasets across multiple domains",
      "Reviewed and ranked AI-generated responses to improve factual accuracy, tone, and instruction-following",
      "Contributed to prompt engineering tasks to handle edge cases and nuanced user queries",
      "Provided structured feedback that directly influenced model behaviour and output quality",
    ],
    technologies: ["Prompt Engineering", "LLM Evaluation", "Conversational AI", "Data Annotation"],
    type: "contract",
  },
];

export const projects = [
  {
    id: 1,
    title: "ECommerce Product Management",
    subtitle: "4-Microservice Enterprise System",
    description:
      "Architected a production-grade ECommerce backend during Capgemini training — 4 microservices behind an Ocelot API Gateway with JWT-based RBAC, a 6-step product publish pipeline, and an admin reporting dashboard with CSV/Excel export.",
    technologies: ["Angular 17", "ASP.NET Core", "SQL Server", "Ocelot", "JWT", "C#", ".NET 8"],
    features: [
      "4 microservices: Identity, Catalog, Workflow, AdminReporting",
      "Ocelot API Gateway with role-based routing for 4 user roles",
      "JWT-based RBAC securing 15+ private API routes",
      "6-step Publish Wizard: Draft → Enrichment → Review → Approved → Published",
      "Admin dashboard with KPI cards and CSV/Excel export via ClosedXML",
    ],
    metrics: {
      microservices: "4",
      apiRoutes: "15+",
      userRoles: "4",
    },
    github: "https://github.com/ds-ashif",
    live: "https://github.com/ds-ashif",
    featured: true,
    color: "#512BD4",
  },
  {
    id: 2,
    title: "Movie Ticket Booking System",
    subtitle: "Full-Stack MERN Application",
    description:
      "Full-stack MERN ticket booking platform handling movie browsing, seat selection, booking, and cancellation. Token-authenticated, with optimised MongoDB schema achieving ~30% faster data fetch and modular backend reducing debugging time by 40%.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "JavaScript"],
    features: [
      "Movie browsing, seat selection, booking and cancellation flows",
      "Token-based authentication securing 10+ private API routes",
      "5+ MongoDB collections with schema optimisation (~30% faster fetch)",
      "Modular backend architecture reducing debugging time by 40%",
      "1000+ simulated concurrent user requests without failures",
    ],
    metrics: {
      requests: "1000+",
      collections: "5+",
      authRoutes: "10+",
    },
    github: "https://github.com/ds-ashif",
    live: "https://movie-ticket-booking-system-omega-plum.vercel.app",
    featured: true,
    color: "#E50914",
  },
  {
    id: 3,
    title: "Phone-Mart with Chatbot",
    subtitle: "E-Commerce + AI Chatbot",
    description:
      "Full-stack phone store with server-side rendering via EJS, cart and checkout management, 10+ Express API routes, and an integrated rule-based chatbot that automatically resolves 80% of common customer queries.",
    technologies: ["Node.js", "Express.js", "EJS", "MySQL", "Bootstrap", "JavaScript"],
    features: [
      "500+ product listings with CRUD operations",
      "Server-side rendering with EJS reducing page load by 20%",
      "Rule-based chatbot resolving 80% of common user queries",
      "10+ Express.js API routes for cart and order management",
      "Session-based authentication and cart persistence",
    ],
    metrics: {
      products: "500+",
      queryResolution: "80%",
      apiRoutes: "10+",
    },
    github: "https://github.com/ds-ashif/Phone-Mart",
    live: "https://github.com/ds-ashif/Phone-Mart",
    featured: true,
    color: "#F97316",
  },
  {
    id: 4,
    title: "AI Safety Incident Dashboard",
    subtitle: "React + TypeScript Dashboard",
    description:
      "React 18 + TypeScript dashboard for viewing, filtering, and reporting AI safety incidents. Built as a take-home assignment for HumanChain — features severity filtering, date sorting, dark/light mode toggle, and validated incident submission.",
    technologies: ["React 18", "TypeScript", "CSS", "Context API", "Vite"],
    features: [
      "Filter incidents by severity: Low, Medium, High",
      "Sort by reported date — newest or oldest first",
      "Expand incident cards to view full descriptions",
      "Dark / light mode with localStorage persistence",
      "Form validation for new incident reporting",
    ],
    metrics: {
      TypeSafe: "100%",
      deployment: "Netlify",
      mode: "Dark/Light",
    },
    github: "https://github.com/ds-ashif/Safety-Incident-Dashboard",
    live: "https://incidash.netlify.app",
    featured: false,
    color: "#8B5CF6",
  },
  {
    id: 5,
    title: "Weather Dashboard",
    subtitle: "Real-Time Weather App",
    description:
      "Real-time weather dashboard built with React and Vite, consuming the OpenWeather API to display current conditions, temperature, humidity, wind speed, and city-based forecasts with a clean responsive UI.",
    technologies: ["React", "JavaScript", "Vite", "OpenWeather API", "CSS"],
    features: [
      "City-based real-time weather search",
      "Temperature, humidity, wind speed display",
      "Live OpenWeather API integration",
      "Responsive layout for all devices",
      "Deployed on GitHub Pages",
    ],
    metrics: {
      api: "Live",
      deployment: "GitHub Pages",
      responsive: "Yes",
    },
    github: "https://github.com/ds-ashif/weather-Dashboard",
    live: "https://ds-ashif.github.io/weather-Dashboard",
    featured: false,
    color: "#06B6D4",
  },
  {
    id: 6,
    title: "TextUtils",
    subtitle: "React Text Utility Tool",
    description:
      "React-based text utility app with case conversion, character counting, whitespace removal, and one-click clipboard copy. SEO-optimised with Google Search Console verification, sitemap.xml, and deployed on GitHub Pages.",
    technologies: ["React", "JavaScript", "Vite", "CSS", "HTML"],
    features: [
      "Uppercase / lowercase case conversion",
      "Character, word, and sentence counter",
      "Remove extra whitespace",
      "One-click copy to clipboard",
      "SEO optimised — Google Search Console verified",
    ],
    metrics: {
      features: "6+",
      seo: "Optimised",
      deployment: "GitHub Pages",
    },
    github: "https://github.com/ds-ashif/TextUtils-React_App",
    live: "https://ds-ashif.github.io/TextUtils-React_App/",
    featured: false,
    color: "#10B981",
  },
];

export const achievements = [
  {
    id: 1,
    title: "Capgemini Exceller Edge Fellowship",
    subtitle: "Corporate Recognition — Capgemini India",
    description:
      "Awarded the Capgemini Exceller Edge Fellowship on completion of the Pre-Onboarding training program — recognising consistent performance across enterprise full-stack development, microservices architecture, and software engineering practices.",
    icon: "🏅",
    type: "fellowship",
    year: "2026",
    color: "#F59E0B",
  },
  {
    id: 2,
    title: "Adobe × GFG Gensolve Hackathon",
    subtitle: "Top 5 Percentile — 5,000+ Participants",
    description:
      "Qualified Round 1 of the Adobe × GFG Gensolve Hackathon, ranking in the top 5 percentile among 5,000+ participants in the algorithmic coding screening round.",
    icon: "🏆",
    type: "award",
    year: "2024",
    color: "#FF6B35",
  },
  {
    id: 3,
    title: "NPTEL Cloud Computing — Elite",
    subtitle: "IIT Kharagpur · Govt. of India",
    description:
      "Earned Elite certification in Cloud Computing from IIT Kharagpur via NPTEL — a 12-week proctored course funded by the Ministry of Education, Govt. of India. One of 30,816 certified candidates.",
    icon: "☁️",
    type: "certification",
    year: "Jul–Oct 2024",
    color: "#0F9D58",
  },
  {
    id: 4,
    title: "Microsoft Frontend Certification",
    subtitle: "Professional Certification",
    description:
      "Microsoft-backed professional certification in modern frontend development, mastering 15+ core concepts including React hooks, state management, and component lifecycle.",
    icon: "📜",
    type: "certification",
    year: "2024",
    color: "#0078D4",
  },
  {
    id: 5,
    title: "Smart India Hackathon 2024",
    subtitle: "Shortlisted — EcoHome Project",
    description:
      "EcoHome project shortlisted for Smart India Hackathon 2024 — a React-based smart home energy optimisation platform built to reduce household power, water, and lighting waste.",
    icon: "🚀",
    type: "achievement",
    year: "2024",
    color: "#3B82F6",
  },
  {
    id: 6,
    title: "Community Development Volunteer",
    subtitle: "Guru Nanak Mission — Punjab",
    description:
      "Mentored underprivileged and specially-abled children at Guru Nanak Mission Netarheen Bridh Ashram, Punjab — promoting educational development, confidence building, and social inclusion.",
    icon: "🤝",
    type: "volunteer",
    year: "2023–2024",
    color: "#10B981",
  },
];

export const stats = [
  { label: "Technologies", value: 15, suffix: "+" },
  { label: "Contributions", value: 170, suffix: "+" },
  { label: "Projects Shipped", value: 10, suffix: "+" },
];

export const techStack = [
  { name: "React",       color: "#61DAFB" },
  { name: "Next.js",     color: "#ffffff" },
  { name: "Angular",     color: "#DD0031" },
  { name: "TypeScript",  color: "#3178C6" },
  { name: "JavaScript",  color: "#F7DF1E" },
  { name: "Node.js",     color: "#339933" },
  { name: "ASP.NET",     color: "#512BD4" },
  { name: "C#",          color: "#9B4F96" },
  { name: "Java",        color: "#ED8B00" },
  { name: "C/C++",       color: "#00599C" },
  { name: "MongoDB",     color: "#47A248" },
  { name: "MySQL",       color: "#4479A1" },
  { name: "SQL Server",  color: "#CC2927" },
  { name: "Python",      color: "#3776AB" },
  { name: "Bootstrap",   color: "#7952B3" },
  { name: "TailwindCSS", color: "#06B6D4" },
  { name: "Linux",       color: "#FCC624" },
  { name: "Git",         color: "#F05032" },
];
