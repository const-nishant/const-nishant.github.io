/* ———————————————————————————————————————————
   portfolio-data.ts  —  Desktop OS Portfolio
   ——————————————————————————————————————————— */

export type AppId =
  | "about"
  | "projects"
  | "skills"
  | "experience"
  | "hackathons"
  | "terminal"
  | "contact";

export type AppDef = {
  id: AppId;
  label: string;
  icon: string;
  defaultW: number;
  defaultH: number;
};

export type Project = {
  name: string;
  status: string;
  summary: string;
  stack: string[];
  href?: string;
};

export type SkillGroup = {
  title: string;
  tone: "violet" | "teal" | "coral" | "amber";
  items: string[];
};

export type TimelineEntry = {
  period: string;
  title: string;
  org: string;
  detail: string;
};

export type HackathonEntry = {
  index: string;
  name: string;
  project: string;
  venue: string;
  detail: string;
};

export type ContactLink = {
  title: string;
  value: string;
  href: string;
};

/* ── identity ── */
export const name = "Nishant Patil";
export const role = "Full-Stack Cross-Platform Developer";
// "Mumbai, India"
export const location = [77, 117, 109, 98, 97, 105, 44, 32, 73, 110, 100, 105, 97].map(c => String.fromCharCode(c)).join("");
// Obfuscated to prevent AI crawlers and scrapers from reading the plain text.
// Computed at runtime: "nishantspatil04@gmail.com"
export const email = [110, 105, 115, 104, 97, 110, 116, 115, 112, 97, 116, 105, 108, 48, 52, 64, 103, 109, 97, 105, 108, 46, 99, 111, 109]
  .map((c) => String.fromCharCode(c))
  .join("");

// "in/const-nishant"
export const linkedinValue = [105, 110, 47, 99, 111, 110, 115, 116, 45, 110, 105, 115, 104, 97, 110, 116].map(c => String.fromCharCode(c)).join("");
// "https://linkedin.com/in/const-nishant"
export const linkedinHref = [104, 116, 116, 112, 115, 58, 47, 47, 108, 105, 110, 107, 101, 100, 105, 110, 46, 99, 111, 109, 47, 105, 110, 47, 99, 111, 110, 115, 116, 45, 110, 105, 115, 104, 97, 110, 116].map(c => String.fromCharCode(c)).join("");

// "github.com/const-nishant"
export const githubValue = [103, 105, 116, 104, 117, 98, 46, 99, 111, 109, 47, 99, 111, 110, 115, 116, 45, 110, 105, 115, 104, 97, 110, 116].map(c => String.fromCharCode(c)).join("");
// "https://github.com/const-nishant"
export const githubHref = [104, 116, 116, 112, 115, 58, 47, 47, 103, 105, 116, 104, 117, 98, 46, 99, 111, 109, 47, 99, 111, 110, 115, 116, 45, 110, 105, 115, 104, 97, 110, 116].map(c => String.fromCharCode(c)).join("");

/* ── apps ── */
export const apps: AppDef[] = [
  { id: "about",      label: "About",        icon: "User",          defaultW: 620, defaultH: 480 },
  { id: "projects",   label: "Projects",     icon: "FolderKanban",  defaultW: 700, defaultH: 520 },
  { id: "skills",     label: "Skills",       icon: "Sparkles",      defaultW: 600, defaultH: 460 },
  { id: "experience", label: "Experience",   icon: "Briefcase",     defaultW: 600, defaultH: 500 },
  { id: "hackathons", label: "Hackathons",   icon: "Trophy",        defaultW: 640, defaultH: 480 },
  { id: "terminal",   label: "Terminal",     icon: "Terminal",      defaultW: 640, defaultH: 400 },
  { id: "contact",    label: "Contact",      icon: "Mail",          defaultW: 500, defaultH: 380 },
];

/* ── bio ── */
export const bio =
  "I build product-minded software across web, desktop, and mobile. My work leans toward systems that feel polished, readable, and durable — with enough visual personality to stand out without feeling noisy.";

export const heroTaglines = [
  "Full-Stack Cross-Platform Developer",
  "Building with React, Rust & Flutter",
  "Shipping products that feel native",
  "Open to new opportunities",
];

/* ── projects ── */
export const projects: Project[] = [
  {
    name: "CipherLine",
    status: "Production",
    summary:
      "Cross-platform encrypted messaging with Signal-style primitives, a Rust core, and a desktop-first interface.",
    stack: ["Rust", "Tauri v2", "React 19", "Axum", "SQLCipher"],
    href: "https://github.com/const-nishant",
  },
  {
    name: "PersonalAPI",
    status: "Hackathon Winner",
    summary:
      "A personal data layer connecting Gmail, GitHub, Notion, Spotify, and Slack into one searchable surface.",
    stack: ["FastAPI", "Next.js", "PostgreSQL", "pgvector", "Redis"],
    href: "https://github.com/const-nishant",
  },
  {
    name: "Productivity App",
    status: "Shipped",
    summary:
      "Meeting workflow tool for transcription, speaker tracking, and semantic search.",
    stack: ["React", "Tauri", "Python", "Whisper", "ChromaDB"],
  },
  {
    name: "Syncora",
    status: "WIP",
    summary:
      "Crypto payment experience built around username-based transfers instead of raw wallet addresses.",
    stack: ["Flutter", "Ethereum", "Solidity", "MetaMask", "Web3"],
    href: "https://github.com/const-nishant",
  },
];

/* ── skills ── */
export const skillGroups: SkillGroup[] = [
  { title: "Languages",       tone: "violet", items: ["TypeScript", "JavaScript", "Python", "Rust", "Dart", "Solidity"] },
  { title: "Frameworks & UI", tone: "teal",   items: ["React", "Next.js", "Flutter", "Tauri", "FastAPI", "Express", "Radix UI", "Tailwind CSS"] },
  { title: "Databases",       tone: "coral",  items: ["PostgreSQL", "MongoDB", "Redis", "Firebase", "SQLCipher", "ChromaDB"] },
  { title: "AI / ML",         tone: "amber",  items: ["Whisper", "pgvector", "Gemini API", "ONNX", "PyO3", "Celery"] },
  { title: "Cryptography",    tone: "violet", items: ["X3DH", "X25519", "Ed25519", "ChaCha20-Poly1305", "BLAKE2b"] },
  { title: "Tools",           tone: "teal",   items: ["Docker", "Git", "Linux", "n8n", "Appwrite", "Firebase"] },
];

/* ── timeline ── */
export const timeline: TimelineEntry[] = [
  {
    period: "2025",
    title: "Full-Stack Developer Intern",
    org: "Surfboard Ventures",
    detail: "Built a cross-platform desktop productivity app and shipped integrations across transcription, connected services, and semantic search.",
  },
  {
    period: "2025 – Present",
    title: "B.E. in AI & ML",
    org: "Universal College of Engineering",
    detail: "Focused on software engineering fundamentals, machine learning, and production-ready systems.",
  },
  {
    period: "2022 – 2025",
    title: "Diploma in Computer Engineering",
    org: "VIVA College of Diploma Engineering and Technology",
    detail: "Built a foundation in programming, networking, databases, and product-minded implementation.",
  },
];

/* ── hackathons ── */
export const hackathons: HackathonEntry[] = [
  { index: "01", name: "MegaHacks 6.0",          project: "PersonalAPI",    venue: "St. John College of Engineering",       detail: "Unified multiple services into one interface with AI-friendly retrieval." },
  { index: "02", name: "MegaHacks 5.0",          project: "Syncora",        venue: "St. John College of Engineering",       detail: "Built a wallet-based payment flow with human-readable transfers." },
  { index: "03", name: "CodeVerse 3.0",           project: "Formata",        venue: "Bhausaheb Vartak Polytechnic, Vasai",   detail: "Created a normalization pipeline converting messy data into ML-ready outputs." },
  { index: "04", name: "Edith — AI Agent Buildathon", project: "CI/CD Automation", venue: "Shree L. R. Tiwari College of Engineering", detail: "Automated build & deploy workflows via an event-driven n8n pipeline." },
  { index: "05", name: "TechBlitz 2025",          project: "Event Platform",  venue: "Vidyavardhani's College of Engineering", detail: "Designed a local event discovery platform connecting organizers with audiences." },
];

/* ── contact ── */
export const contactLinks: ContactLink[] = [
  { title: "Email",     value: email,        href: `mailto:${email}` },
  { title: "LinkedIn",  value: linkedinValue, href: linkedinHref },
  { title: "GitHub",    value: githubValue,   href: githubHref },
  // { title: "Instagram", value: "bits_n_beginnings",          href: "https://www.instagram.com/bits_n_beginnings" },
];

/* ── certifications ── */
export const certifications = [
  "MERN Stack Development — Edba Academy",
  "React and Redux — Complete Coding",
  "Flutter & Kotlin — Android App Dev",
  "Intro to Cybersecurity — Cisco",
];

/* ── terminal ── */
export const terminalHelp = [
  "help       — show commands",
  "whoami     — profile summary",
  "ls         — list apps",
  "open <app> — open an app",
  "clear      — clear screen",
  "pwd        — working directory",
  "uname -a   — system info",
];
