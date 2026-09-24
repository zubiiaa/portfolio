import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  BrainCircuit,
  ChevronDown,
  Code2,
  ExternalLink,
  Github,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  MousePointer2,
  Orbit,
  Sparkles,
  Terminal,
  Workflow,
} from "lucide-react";

type StickerProps = {
  label: string;
  tone: "mint" | "coral" | "lilac" | "blue" | "cream";
  initialRotation: number;
  detail?: string;
};

function Sticker({ label, tone, initialRotation, detail = "skill" }: StickerProps) {
  const stickerRef = useRef<HTMLButtonElement>(null);
  const rotation = useRef(initialRotation);
  const previousAngle = useRef(0);
  const velocity = useRef(0);
  const dragging = useRef(false);
  const frame = useRef<number | null>(null);
  const [angle, setAngle] = useState(initialRotation);

  useEffect(() => {
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  const getAngle = (event: PointerEvent | React.PointerEvent) => {
    const rect = stickerRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    return (Math.atan2(event.clientY - (rect.top + rect.height / 2), event.clientX - (rect.left + rect.width / 2)) * 180) / Math.PI;
  };

  const stopSpin = () => {
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = null;
  };

  const spin = () => {
    velocity.current *= 0.94;
    rotation.current += velocity.current;
    setAngle(rotation.current);
    if (Math.abs(velocity.current) > 0.08) {
      frame.current = requestAnimationFrame(spin);
    } else {
      frame.current = null;
    }
  };

  const onPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    stopSpin();
    dragging.current = true;
    previousAngle.current = getAngle(event);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragging.current) return;
    const nextAngle = getAngle(event);
    let delta = nextAngle - previousAngle.current;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    rotation.current += delta;
    velocity.current = delta;
    previousAngle.current = nextAngle;
    setAngle(rotation.current);
  };

  const onPointerUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    if (Math.abs(velocity.current) > 0.8) frame.current = requestAnimationFrame(spin);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      rotation.current -= 12;
      setAngle(rotation.current);
    }
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      rotation.current += 12;
      setAngle(rotation.current);
    }
  };

  return (
    <button
      ref={stickerRef}
      type="button"
      className={`skill-sticker sticker-${tone}`}
      style={{ transform: `rotate(${angle}deg)` }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={onKeyDown}
      aria-label={`${label}. Drag to rotate, or use arrow keys.`}
    >
      <span className="sticker-tape" aria-hidden="true" />
      <span className="sticker-name">{label}</span>
      <span className="sticker-detail">{detail} / 0{(label.length % 7) + 1}</span>
    </button>
  );
}

const secondarySkills = [
  "HTML / CSS", "Git", "Figma", "Python", "PyTorch", "PostgreSQL", "Docker", "FCM", "WebSockets", "Azure",
  "shadcn/ui", "Recharts", "SQL", "Claude", "Cursor", "Vercel V0", "Lovable", "GitHub Copilot", "Google Gemini API",
  "JWT Authentication", "Third-Party API Integrations", "Auth.js", "Bitbucket", "Jira", "AWS", "SendGrid", "Vercel Blob", "CI/CD", "Postman",
];

const work = [
  {
    number: "01",
    title: "TalentForge",
    description: "A professional networking and job portal with role-based access, social feed, recruitment workflows, and resume generation.",
    stack: ["Next.js", "MongoDB", "Auth.js"],
    href: "https://web-talentforge.vercel.app/",
    preview: ["/project-previews/talentforge.webp", "/project-previews/talentforge-jobs.webp", "/project-previews/talentforge-jobs-lower.webp", "/project-previews/talentforge-resume.webp"],
    accent: "mint",
  },
  {
    number: "02",
    title: "This Portfolio",
    description: "A handcrafted portfolio system designed around a retro-computing interface, live product storytelling, and a playful but performance-minded frontend.",
    stack: ["React", "TypeScript", "CSS 3D"],
    href: "",
    preview: ["/project-previews/portfolio.png"],
    accent: "blue",
  },
  {
    number: "03",
    title: "Ledger",
    description: "A personal finance command center with visual analytics, debt tracking, spreadsheet imports, and AI receipt review.",
    stack: ["React", "Recharts", "Gemini API"],
    href: "https://trackledger.vercel.app/dashboard",
    preview: ["/project-previews/ledger-charts.webp", "/project-previews/ledger-months.webp"],
    accent: "coral",
  },
  {
    number: "04",
    title: "VITAJIT",
    description: "A polished marketing site for a client property, built from their provided design with fast load times, flexible content, and a crisp responsive experience across devices.",
    stack: ["Next.js", "Tailwind CSS", "SSG"],
    href: "https://www.vitajit.co.uk/",
    preview: ["/project-previews/vitajit.webp", "/project-previews/vitajit-product.webp"],
    accent: "lilac",
  },
  {
    number: "05",
    title: "Artificial Neural Vision",
    description: "A final-year smart glasses project translating real-time computer vision into audio descriptions for visually impaired users.",
    stack: ["Python", "PyTorch", "CNN + LSTM"],
    href: "",
    preview: [],
    accent: "blue",
  },
];

const skills = [
  ["React", "mint",  -8, "frontend"],
  ["Angular", "coral",  7, "frontend"],
  ["React Native", "blue", -5, "mobile"],
  ["Next.js", "lilac", -12, "frontend"],
  ["TypeScript", "cream",  5, "language"],
  ["JavaScript", "coral", -6, "language"],
  ["Three.js", "mint",  10, "3d / webgl"],
  ["Node.js", "coral", -7, "backend"],
  [".NET Core", "lilac",  9, "backend"],
  ["MongoDB", "cream", -4, "data"],
  ["REST APIs", "blue",  6, "systems"],
  ["Tailwind CSS", "mint",  -9, "interface"],
  ["AI tooling", "coral",  4, "workflow"],
] as const;

function Monitor({ progress }: { progress: number }) {
  const [pakistanTime, setPakistanTime] = useState("");
  const safeProgress = Number.isFinite(progress) ? Math.min(1, Math.max(0, progress)) : 0;
  const drift = safeProgress * 82;
  const tilt = safeProgress * -7;
  const scale = 1 - safeProgress * 0.12;
  useEffect(() => {
    const updateTime = () => setPakistanTime(new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Karachi", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()));
    updateTime();
    const timer = window.setInterval(updateTime, 30000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <div className="monitor-scene" style={{ opacity: 1 - safeProgress * 0.7 }}>
      <div
        className="monitor"
        style={{ transform: `translate3d(-50%, calc(-50% + ${drift}px), 0) rotateX(${6 + tilt}deg) rotateY(${-5 + safeProgress * 7}deg) scale(${scale})` }}
      >
        <div className="monitor-topline"><span>PORTABLE COMPUTING SYSTEM</span><span>MODEL SZ-86</span></div>
        <div className="monitor-bezel">
          <div className="screen-glow" />
          <div className="screen">
            <div className="scanlines" />
            <div className="screen-toolbar"><span><span className="live-dot" /> LIVE PORTFOLIO</span><span>{pakistanTime || "--:--"} PKT</span></div>
            <div className="screen-main">
              <div className="screen-kicker">BOOT SEQUENCE / 01</div>
              <h1>Hi, I&apos;m <em>Zobia</em><span className="cursor-block">_</span></h1>
              <p className="screen-role">Software engineer <span>+</span> full-stack developer</p>
              <p className="screen-copy">I build thoughtful products at the intersection of reliable systems, expressive interfaces, and just enough magic.</p>
              <div className="screen-actions"><a href="#work">view selected work <ArrowUpRight size={14} /></a><a className="resume-action" href="/Zobia%20-%20Resume.pdf" download="Zobia - Resume.pdf" type="application/pdf">download resume <ArrowDown size={13} /></a><span>scroll to explore <ChevronDown size={13} /></span></div>
            </div>
            <div className="screen-footer"><span>Karachi, Pakistan</span><span>React / Node / .NET / AI</span></div>
          </div>
          <div className="bezel-controls" aria-hidden="true"><span className="led led-green" /><span className="led led-amber" /><span className="bezel-slot" /></div>
        </div>
        <div className="monitor-bottom"><div className="speaker-grid">{Array.from({ length: 30 }).map((_, index) => <i key={index} />)}</div><div className="monitor-brand">ZOBIA<span>®</span></div><div className="power-button"><span /></div></div>
      </div>
      <div className="monitor-shadow" />
    </div>
  );
}

export default function Home() {
  const [heroProgress, setHeroProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const viewportHeight = window.innerHeight;
      const rawProgress = viewportHeight > 0 ? window.scrollY / (viewportHeight * 1.55) : 0;
      setHeroProgress(Number.isFinite(rawProgress) ? Math.min(1, Math.max(0, rawProgress)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="portfolio-shell">
      <header className="site-nav">
        <a className="brand-mark" href="#top" aria-label="Zobia Ashraf home"><span>SZ</span><small>/ 26</small></a>
        <nav><a href="#about">about</a><a href="#work">work</a><a href="#skills">toolbox</a><a href="#contact">contact</a></nav>
        <a className="nav-status" href="mailto:zobiaaashraf@gmail.com" aria-label="Available for freelance, contract, and full-time work"><span className="status-dot" /><span className="nav-status-copy"><strong>open to work</strong><small>freelance · contract · full-time</small></span></a>
      </header>

      <main>
        <section id="top" className="hero-stage">
          <div className="hero-sticky">
            <div className="hero-grid" aria-hidden="true" />
            <div className="hero-orb orb-one" aria-hidden="true" />
            <div className="hero-orb orb-two" aria-hidden="true" />
            <div className="hero-label hero-label-left"><span>01 — INTRO</span><span>SCROLL TO EXPLORE</span></div>
            <div className="hero-label hero-label-right"><span>FULL STACK / CREATIVE SYSTEMS</span><span>© 2026</span></div>
            <Monitor progress={heroProgress} />
            <div className="hero-scroll"><span className="scroll-line" /><span>scroll</span><ChevronDown size={15} /></div>
          </div>
        </section>

        <section id="about" className="about-section section-pad">
          <div className="section-index">02 / ABOUT</div>
          <div className="about-layout">
            <div className="about-intro"><p className="eyebrow"><Sparkles size={15} /> the human behind the stack</p><h2>Building the <span>useful</span> kind of impressive.</h2></div>
            <div className="about-copy"><p>I&apos;m Syeda Zobia Ashraf, a software engineer from Karachi who loves turning complex product ideas into interfaces people actually enjoy using.</p><p>In about three years, I&apos;ve shipped live 3PL and logistics products used by real clients and their testers — including driver apps, admin dashboards, live maps for trucks and trailers, onboarding questionnaires, audits, contracts, and signing workflows.</p><p>I&apos;ve also built a resort management system with calendar booking, invitations, approvals, payment decisions, and a payment area, plus reusable boilerplates that help future products get moving faster.</p><div className="about-meta"><span><MapPin size={15} /> Karachi, Pakistan</span><span><Code2 size={15} /> 3 years shipping</span></div></div>
          </div>
          <div className="stats-row"><div><strong>06<span>+</span></strong><small>saas products shipped</small></div><div><strong>20<span>–30%</span></strong><small>frontend performance lift</small></div><div><strong>∞</strong><small>curiosity for new systems</small></div></div>
        </section>

        <section id="work" className="work-section section-pad">
          <div className="section-heading"><div><div className="section-index">03 / SELECTED WORK</div><h2>Things I&apos;ve <span>made real.</span></h2></div><p>A small selection of products I&apos;ve built, plus one client property brought to life from supplied design.</p></div>
          <div className="work-list">{work.map((item) => { const content = <>{item.preview.length ? <div className="work-preview" aria-hidden="true"><div className="preview-slides">{item.preview.map((src, index) => <img className="work-preview-image" src={src} alt="" style={{ "--slide-index": index, "--slide-count": item.preview.length } as React.CSSProperties} key={src} />)}</div><small>live preview / {item.title} · hover to roll</small></div> : null}<div className="work-card-top"><span className="work-number">{item.number}</span><span className="work-arrow">{item.href ? <ArrowUpRight size={21} /> : <span className="work-lock">—</span>}</span></div><div className="work-card-body"><h3>{item.title}</h3><p>{item.description}</p><div className="work-stack">{item.stack.map((tag) => <span key={tag}>{tag}</span>)}</div></div><div className="work-card-line" /></>; return item.href ? <a className={`work-card work-${item.accent}`} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined} key={item.number}>{content}</a> : <div className={`work-card work-${item.accent} work-card-static`} key={item.number}>{content}</div>; })}</div>
        </section>

        <section id="skills" className="skills-section section-pad">
          <div className="section-index">04 / TOOLBOX</div>
          <div className="skills-heading"><h2>My favorite <span>building blocks.</span></h2><p><MousePointer2 size={15} /> Grab a sticker and give it a spin.</p></div>
          <div className="sticker-field">{skills.map(([label, tone, initialRotation, detail]) => <Sticker key={label} label={label} tone={tone} initialRotation={initialRotation} detail={detail} />)}</div>
          <div className="skill-bottom-note"><span><Terminal size={15} /> frontend led</span><span><Workflow size={15} /> backend connected</span><span><BrainCircuit size={15} /> AI curious</span><span><Orbit size={15} /> motion friendly</span></div><div className="skill-constellation"><span>also in the toolbox</span>{secondarySkills.map((skill) => <b key={skill}>{skill}</b>)}</div>
        </section>

        <section className="experience-section section-pad">
          <div className="section-heading"><div><div className="section-index">05 / EXPERIENCE</div><h2>Where the work <span>happened.</span></h2></div><p>Collaborative by default. Detail-oriented on purpose. Comfortable moving from product conversation to production code.</p></div>
          <div className="experience-list"><article><div className="experience-date">MAY 2026 — NOW</div><div><h3>Freelance <span>/</span> Full Stack Developer</h3><p>Building mobile application features with React Native and FCM, contributing to .NET applications, and translating client requirements into production-ready releases.</p></div><span className="experience-type">remote</span></article><article><div className="experience-date">JAN 2024 — DEC 2025</div><div><h3>Shispare <span>/</span> Associate Software Engineer</h3><p>Developed 6+ scalable SaaS-style products spanning logistics, CRM, ERP, onboarding, warehouse operations, real-time tracking, and document workflows.</p></div><span className="experience-type">karachi</span></article><article><div className="experience-date">FEB 2023 — JUN 2023</div><div><h3>CaterpillHERs <span>/</span> Frontend Developer Intern</h3><p>Built responsive Angular interfaces, onboarding flows, profile management, and API-connected experiences inside an agile product team.</p></div><span className="experience-type">remote</span></article></div>
        </section>

        <section id="contact" className="contact-section section-pad"><div className="contact-card"><div className="contact-art" aria-hidden="true"><div className="contact-orbit orbit-a" /><div className="contact-orbit orbit-b" /><div className="contact-cursor">↗</div></div><div className="section-index">06 / CONTACT</div><h2>Let&apos;s build something<br /><span>worth shipping.</span></h2><p>Available for thoughtful freelance and contract work, and always open to the right recruiter conversation. Tell me what you&apos;re building, what&apos;s stuck, or where a strong product engineer could help.</p><a className="contact-link" href="mailto:zobiaaashraf@gmail.com?subject=Portfolio%20inquiry" aria-label="Start a conversation by email">start a conversation <ArrowUpRight size={20} /></a><div className="contact-links"><a href="https://www.linkedin.com/in/zubia-ashraf/" target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a><a href="https://github.com/zubiiaa" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a><a href="mailto:zobiaaashraf@gmail.com?subject=Portfolio%20inquiry" aria-label="Email Zobia Ashraf"><Mail size={16} /> Email me</a></div></div></section>
      </main>

      <footer className="site-footer"><span>DESIGNED + BUILT BY ZOBIA ASHRAF</span><span>MONITOR CONCEPT INSPIRED BY ED HINRICHSEN&apos;S PORTFOLIO</span><span>REACT / TYPESCRIPT / A LITTLE 3D</span><a href="#top">BACK TO TOP <ChevronDown size={14} /></a></footer>
    </div>
  );
}
