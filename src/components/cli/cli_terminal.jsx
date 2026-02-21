import { useState, useEffect, useRef, useCallback } from "react";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=VT323&family=Share+Tech+Mono&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --green: #39ff14;
    --green-dim: #1a7a07;
    --green-glow: #39ff1466;
    --amber: #ffb000;
    --white: #f0f0f0;
    --white-dim: #aaaaaa;
    --bg: #0a0e0a;
    --bg2: #0d120d;
    --border: #1e3d1e;
    --scanline: rgba(0,0,0,0.35);
    --font-mono: 'Share Tech Mono', monospace;
    --font-vt: 'VT323', monospace;
  }

  html, body, #root { height: 100%; width: 100%; overflow: hidden; }
  body { background: var(--bg); color: var(--white); font-family: var(--font-mono); cursor: none; }

  /* Hide all cursors everywhere */
  *, *::before, *::after { cursor: none !important; }

  /* Scanlines overlay */
  .scanlines::after {
    content: '';
    position: fixed; inset: 0;
    background: repeating-linear-gradient(0deg, transparent, transparent 2px, var(--scanline) 2px, var(--scanline) 4px);
    pointer-events: none; z-index: 9999;
    animation: scanroll 6s linear infinite;
  }
  @keyframes scanroll {
    0% { background-position: 0 0; }
    100% { background-position: 0 100px; }
  }

  /* CRT flicker — more dynamic, irregular */
  .crt-flicker { animation: flicker 0.1s infinite alternate; }
  @keyframes flicker {
    0%   { opacity: 1; filter: brightness(1); }
    85%  { opacity: 1; filter: brightness(1); }
    90%  { opacity: 0.94; filter: brightness(0.92) contrast(1.05); }
    92%  { opacity: 1; filter: brightness(1.04); }
    95%  { opacity: 0.97; filter: brightness(0.97); }
    100% { opacity: 1; filter: brightness(1); }
  }

  /* Horizontal interference line sweep */
  .crt-flicker::before {
    content: '';
    position: fixed; inset: 0;
    background: linear-gradient(transparent 0%, rgba(255,255,255,0.015) 50%, transparent 100%);
    background-size: 100% 8px;
    pointer-events: none;
    z-index: 9998;
    animation: hline 3s linear infinite;
  }
  @keyframes hline {
    0%   { background-position: 0 -100vh; }
    100% { background-position: 0 200vh; }
  }

  /* RGB shift animation for ASCII header */
  @keyframes rgbShift {
    0%,100% { text-shadow: -1px 0 rgba(255,0,0,0.3), 1px 0 rgba(0,255,255,0.3); }
    25% { text-shadow: 1px 0 rgba(255,0,0,0.5), -1px 0 rgba(0,255,255,0.5); }
    50% { text-shadow: -2px 0 rgba(255,0,100,0.3), 2px 0 rgba(0,200,255,0.3); }
    75% { text-shadow: 0 0 rgba(255,0,0,0), 0 0 rgba(0,255,255,0); }
  }

  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

  /* Boot animation */
  @keyframes bootFade { 0%{opacity:1} 100%{opacity:0} }
  @keyframes desktopIn { 0%{opacity:0;filter:brightness(0)} 100%{opacity:1;filter:brightness(1)} }
  .boot-fadeout { animation: bootFade 1.2s ease-in-out forwards; }
  .desktop-fadein { animation: desktopIn 1.5s ease-out forwards; }

  /* Window animations */
  @keyframes windowOpen { 0%{opacity:0;transform:scale(0.85) translateY(10px)} 100%{opacity:1;transform:scale(1) translateY(0)} }
  @keyframes windowClose { 0%{opacity:1;transform:scale(1)} 100%{opacity:0;transform:scale(0.85) translateY(10px)} }
  .window-open { animation: windowOpen 0.2s ease-out forwards; }
  .window-close { animation: windowClose 0.15s ease-in forwards; }

  /* Screensaver */
  @keyframes ssFloat {
    0%   { transform: translate(0px, 0px); }
    25%  { transform: translate(80px, -40px); }
    50%  { transform: translate(-30px, 60px); }
    75%  { transform: translate(50px, 30px); }
    100% { transform: translate(0px, 0px); }
  }
  @keyframes ssGlow {
    0%,100% { text-shadow: 0 0 20px var(--white), 0 0 40px var(--white); }
    50% { text-shadow: 0 0 40px var(--amber), 0 0 80px var(--amber); color: var(--amber); }
  }

  /* Notification */
  @keyframes notifIn { 0%{transform:translateY(100px);opacity:0} 100%{transform:translateY(0);opacity:1} }
  @keyframes notifOut { 0%{transform:translateY(0);opacity:1} 100%{transform:translateY(100px);opacity:0} }

  /* Boot line slide in */
  @keyframes lineSlideIn {
    0% { opacity: 0; transform: translateX(-8px); }
    100% { opacity: 1; transform: translateX(0); }
  }
  .boot-line { animation: lineSlideIn 0.15s ease-out forwards; }

  /* ASCII header */
  .ascii-header {
    animation: rgbShift 4s ease-in-out infinite;
    color: var(--white) !important;
  }

  /* Particle canvas */
  .particle-canvas {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    opacity: 0.35;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--green-dim); border-radius: 0; }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .window-draggable { position: relative !important; top: auto !important; left: auto !important; width: 100% !important; margin-bottom: 8px; }
    .desktop-area { display: flex; flex-direction: column; overflow-y: auto; padding: 8px; }
    .taskbar-full { display: none; }
    .taskbar-mobile { display: flex !important; }
  }
`;
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let raf;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4 - 0.15,
      life: Math.random(),
      size: Math.random() * 1.5 + 0.5,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 0.003;
        if (p.life > 1 || p.y < 0 || p.x < 0 || p.x > W) {
          p.x = Math.random() * W;
          p.y = H + 10;
          p.vx = (Math.random() - 0.5) * 0.4;
          p.vy = (Math.random() - 0.5) * 0.4 - 0.2;
          p.life = 0;
        }
        const alpha = Math.sin(p.life * Math.PI) * 0.8;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = Math.random() > 0.85 ? "#ffb000" : "#39ff14";
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}

// ─── CLOCK ──────────────────────────────────────────────────────────────────
function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span style={{ fontFamily:"var(--font-vt)", fontSize:"1.1rem", color:"var(--white)", letterSpacing:2 }}>
      {time.toLocaleTimeString("es-ES", { hour12: false })}
    </span>
  );
}

// ─── SCREENSAVER ─────────────────────────────────────────────────────────────
function Screensaver({ onWake }) {
  return (
    <div
      onClick={onWake}
      style={{ position:"fixed", inset:0, background:"#000", zIndex:5000, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:20 }}
    >
      <div style={{ animation:"ssFloat 8s ease-in-out infinite, ssGlow 3s ease-in-out infinite", fontFamily:"var(--font-vt)", fontSize:"clamp(2rem,8vw,5rem)", color:"var(--white)", textAlign:"center" }}>
        ALEJANDRO<br />PORTFOLIO<br />v1.0
      </div>
      <div style={{ color:"var(--white-dim)", fontFamily:"var(--font-mono)", fontSize:"0.75rem", animation:"blink 1.5s step-end infinite" }}>
        [ CLICK O PULSA CUALQUIER TECLA ]
      </div>
    </div>
  );
}

// ─── NOTIFICATION ────────────────────────────────────────────────────────────
function Notification({ message, onAction, onDismiss }) {
  const [closing, setClosing] = useState(false);
  const dismiss = () => { setClosing(true); setTimeout(onDismiss, 400); };
  return (
    <div style={{
      position:"fixed", bottom:50, right:20, zIndex:4000,
      background:"var(--bg2)", border:"1px solid var(--green)",
      padding:"12px 16px", maxWidth:280,
      animation: closing ? "notifOut 0.4s ease-in forwards" : "notifIn 0.4s ease-out",
      boxShadow:"0 0 20px var(--green-glow)"
    }}>
      <div style={{ fontSize:"0.75rem", color:"var(--white-dim)", marginBottom:4 }}>⚡ SYSTEM</div>
      <div style={{ fontSize:"0.85rem", marginBottom:10, color:"var(--white)" }}>{message}</div>
      <div style={{ display:"flex", gap:8 }}>
        <button onClick={() => { onAction(); dismiss(); }} style={{ background:"var(--green)", color:"#000", border:"none", padding:"4px 10px", fontFamily:"var(--font-mono)", fontSize:"0.75rem", fontWeight:"bold" }}>OPEN</button>
        <button onClick={dismiss} style={{ background:"transparent", color:"var(--white-dim)", border:"1px solid var(--white-dim)", padding:"4px 10px", fontFamily:"var(--font-mono)", fontSize:"0.75rem" }}>DISMISS</button>
      </div>
    </div>
  );
}

// ─── DRAGGABLE WINDOW ────────────────────────────────────────────────────────
function useDrag(initialPos) {
  const [pos, setPos] = useState(initialPos);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const onMouseDown = useCallback((e) => {
    dragging.current = true;
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    const onMouseMove = (e) => {
      if (!dragging.current) return;
      setPos({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y });
    };
    const onMouseUp = () => { dragging.current = false; window.removeEventListener("mousemove", onMouseMove); window.removeEventListener("mouseup", onMouseUp); };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }, [pos]);

  return [pos, onMouseDown];
}

function Window({ title, children, onClose, onMinimize, initialPos, zIndex, onClick, isMinimized }) {
  const [pos, onDragStart] = useDrag(initialPos || { x: 80, y: 80 });
  const [closing, setClosing] = useState(false);
  const isMobile = window.innerWidth <= 768;

  const handleClose = () => { setClosing(true); setTimeout(onClose, 150); };
  if (isMinimized) return null;

  return (
    <div
      className={`window-draggable ${closing ? "window-close" : "window-open"}`}
      onClick={onClick}
      style={{
        position: isMobile ? "relative" : "absolute",
        top: isMobile ? "auto" : pos.y,
        left: isMobile ? "auto" : pos.x,
        width: isMobile ? "100%" : "clamp(320px, 40vw, 600px)",
        background: "var(--bg2)",
        border: "1px solid var(--green)",
        boxShadow: "0 0 20px var(--green-glow), inset 0 0 10px rgba(57,255,20,0.03)",
        zIndex,
        userSelect: "none",
      }}
    >
      <div
        onMouseDown={isMobile ? undefined : onDragStart}
        style={{
          background: "linear-gradient(90deg, var(--green-dim), #0d2e0d)",
          padding: "6px 10px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderBottom: "1px solid var(--green)",
        }}
      >
        <span style={{ fontFamily:"var(--font-vt)", fontSize:"1.1rem", letterSpacing:2, color:"var(--white)" }}>
          ▌ {title.toUpperCase()}
        </span>
        <div style={{ display:"flex", gap:6 }}>
          {[["_", onMinimize], ["□", null], ["✕", handleClose]].map(([sym, fn], i) => (
            <button key={i} onClick={(e) => { e.stopPropagation(); fn && fn(); }} style={{
              width:18, height:18, background:"transparent", border:"1px solid var(--green)", color:"var(--white)",
              fontFamily:"var(--font-mono)", fontSize:"0.6rem", display:"flex", alignItems:"center", justifyContent:"center",
              opacity: fn ? 1 : 0.3,
            }}>{sym}</button>
          ))}
        </div>
      </div>
      <div style={{ padding: "16px", overflowY: "auto", maxHeight: "60vh", fontSize:"0.85rem", lineHeight:1.7, color:"var(--white)" }}>
        {children}
      </div>
    </div>
  );
}

// ─── WINDOW CONTENTS ─────────────────────────────────────────────────────────
function AboutContent() {
  return (
    <div>
      <pre style={{ color:"var(--green)", fontSize:"0.7rem", lineHeight:1.2, marginBottom:12 }}>{`
 █████╗ ██╗     ███████╗
██╔══██╗██║     ██╔════╝
███████║██║     █████╗  
██╔══██║██║     ██╔══╝  
██║  ██║███████╗███████╗
╚═╝  ╚═╝╚══════╝╚══════╝`}</pre>
      <p style={{ marginBottom:8 }}><span style={{ color:"var(--green)" }}>$ whoami</span></p>
      <p style={{ marginBottom:16, color:"var(--white)" }}>Soy <strong style={{ color:"var(--green)" }}>Alejandro</strong>, desarrollador fullstack con pasión por construir productos escalables, APIs robustas y frontends que se sienten vivos.</p>
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        {[["Rol", "Fullstack Developer"],["Stack", "React · Flask · TypeScript · MongoDB"],["Ubicación", "España 🇪🇸"],["Disponible", "✅ Freelance / Empleo"],["GitHub", "github.com/alejandro"]].map(([k,v]) => (
          <tr key={k} style={{ borderBottom:"1px solid var(--border)" }}>
            <td style={{ color:"var(--green-dim)", padding:"5px 10px 5px 0", whiteSpace:"nowrap" }}>{k}</td>
            <td style={{ color:"var(--white)", padding:"5px 0" }}>{v}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

function SkillsContent() {
  const skills = [
    { label: "React / Next.js", pct: 92, cat: "Frontend" },
    { label: "TypeScript", pct: 88, cat: "Frontend" },
    { label: "TailwindCSS / CSS", pct: 90, cat: "Frontend" },
    { label: "Flask / Python", pct: 87, cat: "Backend" },
    { label: "MongoDB / Mongoose", pct: 82, cat: "Backend" },
    { label: "PostgreSQL", pct: 75, cat: "Backend" },
    { label: "Docker / CI-CD", pct: 70, cat: "DevOps" },
    { label: "REST APIs / GraphQL", pct: 85, cat: "Backend" },
  ];
  const cats = [...new Set(skills.map(s => s.cat))];
  return (
    <div>
      {cats.map(cat => (
        <div key={cat} style={{ marginBottom:16 }}>
          <div style={{ color:"var(--amber)", marginBottom:8, fontFamily:"var(--font-vt)", fontSize:"1rem", letterSpacing:2 }}>▸ {cat.toUpperCase()}</div>
          {skills.filter(s => s.cat === cat).map(s => (
            <div key={s.label} style={{ marginBottom:8 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                <span style={{ color:"var(--white)" }}>{s.label}</span><span style={{ color:"var(--green)" }}>{s.pct}%</span>
              </div>
              <div style={{ height:6, background:"var(--border)", position:"relative" }}>
                <div style={{ height:"100%", width:`${s.pct}%`, background:`linear-gradient(90deg, var(--green-dim), var(--green))`, boxShadow:"0 0 8px var(--green-glow)", transition:"width 1s ease" }} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function ProjectsContent() {
  const [hovered, setHovered] = useState(null);
  const projects = [
    { id:1, name:"FlaskAPI Pro", desc:"REST API escalable con Flask, JWT auth, MongoDB, y deploy en Docker. Rate limiting, logging estructurado y docs con Swagger.", tags:["Flask","MongoDB","Docker","JWT"], year:2024 },
    { id:2, name:"ReactDashboard", desc:"Dashboard analytics en React + TypeScript con gráficas en tiempo real, filtros avanzados y exportación a CSV/PDF.", tags:["React","TypeScript","Recharts"], year:2024 },
    { id:3, name:"DevLink", desc:"Red social minimalista para developers: posts con Markdown, comentarios anidados, sistema de follows. Fullstack Flask + React.", tags:["Flask","React","MongoDB","WebSockets"], year:2023 },
    { id:4, name:"CLI Tools Kit", desc:"Colección de herramientas CLI en Python para automatización de tareas de desarrollo: scaffolding, git hooks, env manager.", tags:["Python","Click","Shell"], year:2023 },
  ];
  return (
    <div style={{ display:"grid", gap:10 }}>
      {projects.map(p => (
        <div key={p.id} onMouseEnter={() => setHovered(p.id)} onMouseLeave={() => setHovered(null)} style={{
          border:`1px solid ${hovered === p.id ? "var(--green)" : "var(--border)"}`,
          padding:12, transition:"all 0.2s",
          boxShadow: hovered === p.id ? "0 0 12px var(--green-glow)" : "none",
          background: hovered === p.id ? "rgba(57,255,20,0.03)" : "transparent",
        }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
            <strong style={{ color:"var(--green)", fontFamily:"var(--font-vt)", fontSize:"1.05rem", letterSpacing:1 }}>{p.name}</strong>
            <span style={{ color:"var(--white-dim)", fontSize:"0.75rem" }}>{p.year}</span>
          </div>
          <p style={{ fontSize:"0.8rem", marginBottom:8, color:"var(--white)" }}>{p.desc}</p>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {p.tags.map(t => (
              <span key={t} style={{ border:"1px solid var(--green-dim)", color:"var(--white-dim)", padding:"1px 7px", fontSize:"0.7rem" }}>{t}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactContent() {
  const [form, setForm] = useState({ name:"", email:"", msg:"" });
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };
  if (sent) return <div style={{ textAlign:"center", padding:20, color:"var(--green)", fontFamily:"var(--font-vt)", fontSize:"1.5rem" }}>MESSAGE SENT ✓<br/><span style={{ fontSize:"0.9rem", color:"var(--white-dim)" }}>Te responderé pronto.</span></div>;
  return (
    <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:12 }}>
      {[["name","NOMBRE","text"],["email","EMAIL","email"]].map(([field, label, type]) => (
        <div key={field}>
          <label style={{ display:"block", fontSize:"0.7rem", color:"var(--white-dim)", marginBottom:4 }}>{label}</label>
          <input type={type} required value={form[field]} onChange={e => setForm(f => ({...f,[field]:e.target.value}))}
            style={{ width:"100%", background:"transparent", border:"1px solid var(--white-dim)", color:"var(--white)", padding:"7px 10px", fontFamily:"var(--font-mono)", fontSize:"0.85rem", outline:"none" }} />
        </div>
      ))}
      <div>
        <label style={{ display:"block", fontSize:"0.7rem", color:"var(--white-dim)", marginBottom:4 }}>MENSAJE</label>
        <textarea rows={4} required value={form.msg} onChange={e => setForm(f => ({...f,msg:e.target.value}))}
          style={{ width:"100%", background:"transparent", border:"1px solid var(--white-dim)", color:"var(--white)", padding:"7px 10px", fontFamily:"var(--font-mono)", fontSize:"0.85rem", outline:"none", resize:"vertical" }} />
      </div>
      <button type="submit" style={{ background:"var(--green)", color:"#000", border:"none", padding:"10px", fontFamily:"var(--font-vt)", fontSize:"1.1rem", letterSpacing:2, fontWeight:"bold" }}>
        SEND MESSAGE ▶
      </button>
    </form>
  );
}

// ─── TERMINAL CLI ─────────────────────────────────────────────────────────────
const COMMANDS = {
  help: () => `AVAILABLE COMMANDS:
  about      → Información sobre mí
  skills     → Stack técnico
  projects   → Proyectos destacados
  contact    → Contactar conmigo
  startx     → Lanzar interfaz de escritorio
  clear      → Limpiar terminal
  whoami     → Identidad del sistema
  date       → Fecha y hora actual
  ls         → Listar directorio`,
  about: () => "Alejandro — Fullstack Developer. Especializado en React, TypeScript, Flask y MongoDB. Apasionado por el código limpio y las UIs memorables.",
  skills: () => "Frontend: React, TypeScript, TailwindCSS, GSAP\nBackend: Flask, Python, REST APIs\nDB: MongoDB, PostgreSQL\nDevOps: Docker, CI/CD, Git",
  projects: () => "1. FlaskAPI Pro — REST API escalable con Flask + MongoDB\n2. ReactDashboard — Analytics en tiempo real\n3. DevLink — Red social para developers\n4. CLI Tools Kit — Herramientas de automatización",
  contact: () => "Email: alejandro@dev.io\nGitHub: github.com/alejandro\nLinkedIn: linkedin.com/in/alejandro",
  whoami: () => "alejandro — uid=1000(alejandro) gid=1000(alejandro) groups=1000(alejandro),27(sudo),4(adm)",
  date: () => new Date().toLocaleString("es-ES"),
  ls: () => "about.md  skills.json  projects/  contact.html  README.md",
  startx: () => "__STARTX__",
  launch: () => "__STARTX__",
  clear: () => "__CLEAR__",
};

function typewriterEffect(text, onChar, onDone) {
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) { onChar(text[i]); i++; }
    else { clearInterval(interval); onDone && onDone(); }
  }, 16);
  return () => clearInterval(interval);
}

function TerminalCLI({ onStartX }) {
  const [history, setHistory] = useState([{ type:"output", text:"ALEJANDRO OS v1.0.0 — Fullstack Developer Portfolio\nType `help` to see available commands.\n" }]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [cmdIdx, setCmdIdx] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [history]);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const addOutput = (text) => {
    if (text === "__STARTX__") { onStartX(); return; }
    if (text === "__CLEAR__") { setHistory([]); return; }
    setIsTyping(true);
    let accumulated = "";
    typewriterEffect(text, (char) => {
      accumulated += char;
      setHistory(h => {
        const copy = [...h];
        if (copy[copy.length - 1]?.type === "typing") {
          copy[copy.length - 1] = { type:"typing", text: accumulated };
        } else {
          copy.push({ type:"typing", text: accumulated });
        }
        return copy;
      });
    }, () => {
      setHistory(h => {
        const copy = [...h];
        if (copy[copy.length - 1]?.type === "typing") {
          copy[copy.length - 1] = { type:"output", text: accumulated };
        }
        return copy;
      });
      setIsTyping(false);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    const cmd = input.trim().toLowerCase();
    setHistory(h => [...h, { type:"input", text:`alejandro@portfolio:~$ ${input}` }]);
    setCmdHistory(h => [input, ...h]);
    setCmdIdx(-1);
    setInput("");
    const fn = COMMANDS[cmd];
    addOutput(fn ? fn() : `bash: ${cmd}: command not found. Type 'help' for commands.`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = Math.min(cmdIdx + 1, cmdHistory.length - 1);
      setCmdIdx(idx);
      setInput(cmdHistory[idx] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = Math.max(cmdIdx - 1, -1);
      setCmdIdx(idx);
      setInput(idx === -1 ? "" : cmdHistory[idx] || "");
    }
  };

  return (
    <div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", padding:24, overflow:"hidden" }} onClick={() => inputRef.current?.focus()}>
      <pre className="ascii-header" style={{ fontSize:"clamp(0.4rem,1.2vw,0.7rem)", lineHeight:1.1, marginBottom:24, flexShrink:0 }}>{`
  █████╗ ██╗     ███████╗     ██████╗ ███████╗
 ██╔══██╗██║     ██╔════╝    ██╔═══██╗██╔════╝
 ███████║██║     █████╗      ██║   ██║███████╗
 ██╔══██║██║     ██╔══╝      ██║   ██║╚════██║
 ██║  ██║███████╗███████╗    ╚██████╔╝███████║
 ╚═╝  ╚═╝╚══════╝╚══════╝    ╚═════╝ ╚══════╝
                                     v1.0.0`}</pre>

      <div style={{ flex:1, overflowY:"auto", marginBottom:12 }}>
        {history.map((line, i) => (
          <div key={i} style={{
            color: line.type === "input" ? "var(--amber)" : "var(--white)",
            fontFamily:"var(--font-mono)",
            fontSize:"0.85rem",
            whiteSpace:"pre-wrap",
            marginBottom: line.type === "input" ? 4 : 10,
            lineHeight:1.6,
          }}>
            {line.text}
            {line.type === "typing" && i === history.length - 1 && <span style={{ animation:"blink 0.5s step-end infinite", color:"var(--white)" }}>█</span>}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} style={{ display:"flex", alignItems:"center", gap:8, borderTop:"1px solid var(--border)", paddingTop:12, flexShrink:0 }}>
        <span style={{ color:"var(--amber)", fontFamily:"var(--font-mono)", fontSize:"0.85rem", whiteSpace:"nowrap" }}>alejandro@portfolio:~$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isTyping}
          autoFocus
          style={{ flex:1, background:"transparent", border:"none", outline:"none", color:"var(--white)", fontFamily:"var(--font-mono)", fontSize:"0.85rem", caretColor:"var(--white)" }}
        />
      </form>
    </div>
  );
}

// ─── DESKTOP LAYOUT ───────────────────────────────────────────────────────────
const WINDOWS_CONFIG = [
  { id:"about",    title:"About.exe",    component: <AboutContent />,    pos:{x:60,y:80} },
  { id:"skills",   title:"Skills.exe",   component: <SkillsContent />,   pos:{x:120,y:100} },
  { id:"projects", title:"Projects.exe", component: <ProjectsContent />, pos:{x:180,y:120} },
  { id:"contact",  title:"Contact.exe",  component: <ContactContent />,  pos:{x:240,y:140} },
];

function DesktopLayout() {
  const [openWindows, setOpenWindows] = useState(["about"]);
  const [minimized, setMinimized] = useState({});
  const [zOrder, setZOrder] = useState({ about:10, skills:9, projects:8, contact:7 });
  const [muted, setMuted] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [screensaver, setScreensaver] = useState(false);
  const idleTimer = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => { if (!openWindows.includes("contact")) setShowNotif(true); }, 5000);
    return () => clearTimeout(t);
  }, []);

  const resetIdle = useCallback(() => {
    clearTimeout(idleTimer.current);
    if (screensaver) setScreensaver(false);
    idleTimer.current = setTimeout(() => setScreensaver(true), 30000);
  }, [screensaver]);

  useEffect(() => {
    resetIdle();
    window.addEventListener("mousemove", resetIdle);
    window.addEventListener("keydown", resetIdle);
    return () => { window.removeEventListener("mousemove", resetIdle); window.removeEventListener("keydown", resetIdle); };
  }, [resetIdle]);

  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey) {
        const map = { "1":"about", "2":"skills", "3":"projects", "4":"contact" };
        const id = map[e.key];
        if (id) { e.preventDefault(); openWindow(id); }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [openWindows]);

  const openWindow = (id) => {
    setOpenWindows(w => w.includes(id) ? w : [...w, id]);
    setMinimized(m => ({ ...m, [id]: false }));
    const maxZ = Math.max(...Object.values(zOrder));
    setZOrder(z => ({ ...z, [id]: maxZ + 1 }));
  };
  const closeWindow = (id) => setOpenWindows(w => w.filter(x => x !== id));
  const focusWindow = (id) => {
    const maxZ = Math.max(...Object.values(zOrder));
    setZOrder(z => ({ ...z, [id]: maxZ + 1 }));
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <div style={{ width:"100%", height:"100%", position:"relative", overflow:"hidden" }}>
      {screensaver && <Screensaver onWake={() => setScreensaver(false)} />}

      <div style={{ height:32, background:"linear-gradient(90deg, #0a1a0a, #0d200d)", borderBottom:"1px solid var(--green)", display:"flex", alignItems:"center", padding:"0 12px", gap:20, zIndex:100, position:"relative", flexShrink:0 }}>
        <span style={{ fontFamily:"var(--font-vt)", fontSize:"1.1rem", color:"var(--white)", marginRight:12 }}>⣿ ALEJANDRO OS</span>
        <div className="taskbar-full" style={{ display:"flex", gap:16 }}>
          {["File","Edit","View","Help"].map(m => (
            <span key={m} style={{ color:"var(--white-dim)", fontSize:"0.8rem" }}>{m}</span>
          ))}
          <span style={{ color:"var(--border)" }}>│</span>
          {WINDOWS_CONFIG.map(w => (
            <span key={w.id} onClick={() => openWindow(w.id)} style={{ color: openWindows.includes(w.id) ? "var(--white)" : "var(--white-dim)", fontSize:"0.8rem", borderBottom: openWindows.includes(w.id) ? "1px solid var(--green)" : "none" }}>
              {w.id.charAt(0).toUpperCase() + w.id.slice(1)}
            </span>
          ))}
        </div>
        <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:16 }}>
          <span onClick={() => setMuted(m => !m)} style={{ color:"var(--white-dim)", fontSize:"0.8rem" }}>{muted ? "🔇" : "🔊"}</span>
          <Clock />
        </div>
      </div>

      {!isMobile && (
        <div style={{ position:"absolute", top:48, left:16, display:"flex", flexDirection:"column", gap:20, zIndex:50 }}>
          {WINDOWS_CONFIG.map(w => (
            <div key={w.id} onDoubleClick={() => openWindow(w.id)} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, width:64 }}>
              <div style={{ width:40, height:40, border:"1px solid var(--green-dim)", background:"rgba(57,255,20,0.05)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.2rem", transition:"all 0.2s" }}>
                {{"about":"👤","skills":"⚙","projects":"📁","contact":"✉"}[w.id]}
              </div>
              <span style={{ fontSize:"0.65rem", color:"var(--white-dim)", textAlign:"center", fontFamily:"var(--font-mono)" }}>{w.title}</span>
            </div>
          ))}
        </div>
      )}

      <div className="desktop-area" style={{ position: isMobile ? "relative" : "absolute", inset: isMobile ? "auto" : 0, top: isMobile ? 0 : 32, bottom: isMobile ? "auto" : 32, left:0, right:0, overflow: isMobile ? "auto" : "hidden" }}>
        {WINDOWS_CONFIG.filter(w => openWindows.includes(w.id)).map(w => (
          <Window
            key={w.id}
            title={w.title}
            initialPos={w.pos}
            zIndex={zOrder[w.id] || 10}
            isMinimized={minimized[w.id]}
            onClose={() => closeWindow(w.id)}
            onMinimize={() => setMinimized(m => ({ ...m, [w.id]: true }))}
            onClick={() => focusWindow(w.id)}
          >
            {w.component}
          </Window>
        ))}
      </div>

      {isMobile && (
        <div className="taskbar-mobile" style={{ display:"none", position:"fixed", bottom:0, left:0, right:0, background:"var(--bg2)", borderTop:"1px solid var(--green)", height:44, alignItems:"center", justifyContent:"space-around", zIndex:200 }}>
          {WINDOWS_CONFIG.map(w => (
            <button key={w.id} onClick={() => openWindow(w.id)} style={{ background:"transparent", border:"none", color:"var(--white)", fontFamily:"var(--font-vt)", fontSize:"0.9rem" }}>
              {w.id.charAt(0).toUpperCase() + w.id.slice(1)}
            </button>
          ))}
        </div>
      )}

      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:32, background:"linear-gradient(90deg, #0a1a0a, #0d200d)", borderTop:"1px solid var(--border)", display:"flex", alignItems:"center", padding:"0 12px", gap:8, zIndex:100 }}>
        {openWindows.map(id => {
          const w = WINDOWS_CONFIG.find(x => x.id === id);
          return w && (
            <button key={id} onClick={() => { minimized[id] ? setMinimized(m=>({...m,[id]:false})) : setMinimized(m=>({...m,[id]:true})); }} style={{
              background: minimized[id] ? "transparent" : "rgba(57,255,20,0.1)",
              border:"1px solid var(--green-dim)", color:"var(--white)", padding:"2px 10px",
              fontFamily:"var(--font-mono)", fontSize:"0.7rem",
            }}>
              {w.title}
            </button>
          );
        })}
        <span style={{ marginLeft:"auto", color:"var(--white-dim)", fontSize:"0.7rem" }}>Ctrl+1-4 para ventanas</span>
      </div>

      {showNotif && (
        <Notification
          message="New message: ¿Quieres abrir la ventana de contacto?"
          onAction={() => openWindow("contact")}
          onDismiss={() => setShowNotif(false)}
        />
      )}
    </div>
  );
}

// ─── BOOT SCREEN ──────────────────────────────────────────────────────────────
function BootScreen({ onDone }) {
  const [lines, setLines] = useState([]);
  const bootLines = [
    "[ OK ] Starting Alejandro OS kernel...",
    "[ OK ] Loading /dev/portfolio...",
    "[ OK ] Mounting filesystem...",
    "[ OK ] Initializing React runtime...",
    "[ OK ] Loading TailwindCSS skin...",
    "[ OK ] Applying phosphor green theme...",
    "[ OK ] Desktop environment ready.",
    "[ BOOT ] Launching GUI...",
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootLines.length) { setLines(l => [...l, bootLines[i]]); i++; }
      else { clearInterval(interval); setTimeout(onDone, 400); }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", justifyContent:"center", padding:40 }}>
      {lines.map((l, i) => (
        <div key={i} className="boot-line" style={{ fontFamily:"var(--font-mono)", fontSize:"0.85rem", color: l.includes("OK") ? "var(--white)" : "var(--amber)", marginBottom:6 }}>{l}</div>
      ))}
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("cli");
  const [cliExiting, setCliExiting] = useState(false);

  const handleStartX = () => { setCliExiting(true); setTimeout(() => setView("booting"), 800); };
  const handleBootDone = () => { setView("desktop"); };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <div className="scanlines crt-flicker" style={{ width:"100vw", height:"100vh", display:"flex", flexDirection:"column", overflow:"hidden", position:"relative" }}>
        {/* CRT vignette */}
        <div style={{ position:"fixed", inset:0, background:"radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.7) 100%)", pointerEvents:"none", zIndex:9990 }} />

        {/* Particle background */}
        <ParticleCanvas />

        {view === "cli" && (
          <div className={cliExiting ? "boot-fadeout" : ""} style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", position:"relative", zIndex:2 }}>
            <TerminalCLI onStartX={handleStartX} />
          </div>
        )}
        {view === "booting" && (
          <div className="desktop-fadein" style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", position:"relative", zIndex:2 }}>
            <BootScreen onDone={handleBootDone} />
          </div>
        )}
        {view === "desktop" && (
          <div className="desktop-fadein" style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", position:"relative", zIndex:2 }}>
            <DesktopLayout />
          </div>
        )}
      </div>
    </>
  );
}