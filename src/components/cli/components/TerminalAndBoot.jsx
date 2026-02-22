import { useEffect, useRef, useState } from "react";
import { PromptLabel } from "@/components/gui/UIAndContent";

/* ── COMMANDS ── */
export const COMMANDS = {
  help: ()=>`AVAILABLE COMMANDS:
  about      → Información sobre mí
  skills     → Stack técnico
  projects   → Proyectos destacados
  contact    → Contactar conmigo
  startx     → Lanzar interfaz de escritorio
  clear      → Limpiar terminal
  whoami     → Identidad del sistema
  date       → Fecha y hora actual
  ls         → Listar directorio`,
  about: ()=>"Moisés — Fullstack Developer. Especializado en React, TypeScript, Flask y MongoDB.\nApasionado por el código limpio y las UIs memorables.",
  skills: ()=>"Frontend: React, TypeScript, TailwindCSS, GSAP\nBackend: Flask, Python, REST APIs\nDB: MongoDB, PostgreSQL\nDevOps: Docker, CI/CD, Git",
  projects: ()=>"1. FlaskAPI Pro — REST API escalable con Flask + MongoDB\n2. ReactDashboard — Analytics en tiempo real\n3. DevLink — Red social para developers\n4. CLI Tools Kit — Herramientas de automatización",
  contact: ()=>"Email: moises@dev.io\nGitHub: github.com/moises\nLinkedIn: linkedin.com/in/moises",
  whoami: ()=>"moises — uid=1000(moises) gid=1000(moises) groups=1000(moises),27(sudo),4(adm)",
  date: ()=>new Date().toLocaleString("es-ES"),
  ls: ()=>"about.md  skills.json  projects/  contact.html  README.md",
  startx: ()=>"__STARTX__",
  launch: ()=>"__STARTX__",
  clear: ()=>"__CLEAR__",
};

/* ── TERMINAL CLI ── */
export function TerminalCLI({ onStartX }) {
  const [entries, setEntries] = useState([]);
  const [input, setInput] = useState("");
  const [cmdHist, setCmdHist] = useState([]);
  const [cmdIdx, setCmdIdx] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries, input]);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const typeOutput = (id, text, onDone) => {
    let i = 0, acc = "";
    const iv = setInterval(() => {
      if (i < text.length) {
        acc += text[i++];
        setEntries(es => es.map(e => e.id === id ? { ...e, output: acc, typing: true } : e));
      } else {
        clearInterval(iv);
        setEntries(es => es.map(e => e.id === id ? { ...e, output: acc, typing: false } : e));
        onDone?.();
      }
    }, 13);
    return () => clearInterval(iv);
  };

  const submit = (e) => {
    e?.preventDefault();
    const raw = input.trim();
    if (!raw || isTyping) return;

    const cmd = raw.toLowerCase();
    setCmdHist(h => [raw, ...h]);
    setCmdIdx(-1);
    setInput("");

    if (cmd === "clear") { setEntries([]); return; }
    if (cmd === "startx" || cmd === "launch") { onStartX(); return; }

    const fn = COMMANDS[cmd];
    const out = fn ? fn() : `bash: ${cmd}: command not found. Type 'help' for commands.`;
    const id = Date.now();

    setEntries(es => [...es, { id, cmd: raw, output: "", typing: false }]);
    setIsTyping(true);

    setTimeout(() => {
      typeOutput(id, out, () => {
        setIsTyping(false);
        setTimeout(() => inputRef.current?.focus(), 50);
      });
    }, 40);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = Math.min(cmdIdx + 1, cmdHist.length - 1);
      setCmdIdx(idx); setInput(cmdHist[idx] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = Math.max(cmdIdx - 1, -1);
      setCmdIdx(idx); setInput(idx === -1 ? "" : cmdHist[idx] || "");
    }
  };

  return (
    <div
      className="terminal-bg"
      style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", padding:"28px 28px 20px", overflow:"hidden" }}
      onClick={() => inputRef.current?.focus()}
    >
      <pre className="ascii-header" style={{fontSize:"clamp(.4rem,1.2vw,.7rem)",lineHeight:1.15,marginBottom:20,flexShrink:0}}>{`
 ██████╗ ██╗      ██████╗ ██╗    ██╗██╗███╗   ██╗ ██████╗
 ██╔══██╗██║     ██╔═══██╗██║    ██║██║████╗  ██║██╔════╝
 ██████╔╝██║     ██║   ██║██║ █╗ ██║██║██╔██╗ ██║██║  ███╗
 ██╔══██╗██║     ██║   ██║██║███╗██║██║██║╚██╗██║██║   ██║
 ██████╔╝███████╗╚██████╔╝╚███╔███╔╝██║██║ ╚████║╚██████╔╝
 ╚═════╝ ╚══════╝ ╚═════╝  ╚══╝╚══╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝

 ███████╗███████╗██╗   ██╗███████╗██████╗
 ██╔════╝██╔════╝██║   ██║██╔════╝██╔══██╗
 █████╗  █████╗  ██║   ██║█████╗  ██████╔╝
 ██╔══╝  ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██╔══██╗
 ██║     ███████╗ ╚████╔╝ ███████╗██║  ██║
 ╚═╝     ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝
                                     v1.0.0`}</pre>

      <div style={{color:"var(--white-dim)",fontSize:".83rem",marginBottom:18,flexShrink:0,lineHeight:1.6}}>
        Bienvenido al portfolio de <span style={{color:"var(--green)"}}>Moisés</span>. Escribe <span style={{color:"var(--amber)"}}>help</span> para ver los comandos disponibles.
      </div>

      <div
        ref={scrollRef}
        style={{ flex:1, overflowY:"auto", display:"flex", flexDirection:"column" }}
      >
        {entries.map((entry) => (
          <div key={entry.id} style={{marginBottom:2}}>
            <div style={{display:"flex",alignItems:"baseline",flexWrap:"wrap",fontFamily:"var(--font-mono)",fontSize:".9rem",lineHeight:1.65}}>
              <PromptLabel />
              <span style={{color:"#e8f0e8",wordBreak:"break-all"}}>{entry.cmd}</span>
            </div>
            {entry.output !== undefined && (
              <div className="cmd-output">
                {entry.output}
                {entry.typing && (
                  <span style={{animation:"blink .5s step-end infinite",color:"var(--green)"}}>█</span>
                )}
              </div>
            )}
          </div>
        ))}

        <form
          onSubmit={submit}
          style={{display:"flex",alignItems:"baseline",flexWrap:"wrap",fontFamily:"var(--font-mono)",fontSize:".9rem",lineHeight:1.65,marginTop:2}}
        >
          <PromptLabel />
          <input
            ref={inputRef}
            className="inline-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={isTyping}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
          />
        </form>

        <div style={{height:12,flexShrink:0}}/>
      </div>
    </div>
  );
}

/* ── BOOT SCREEN ── */
export function BootScreen({ onDone }) {
  const [lines, setLines] = useState([]);
  const bl = [
    "[ OK ] Starting Moisés OS kernel...",
    "[ OK ] Loading /dev/portfolio...",
    "[ OK ] Mounting filesystem...",
    "[ OK ] Initializing React runtime...",
    "[ OK ] Loading TailwindCSS skin...",
    "[ OK ] Applying phosphor green theme...",
    "[ OK ] Desktop environment ready.",
    "[ BOOT ] Launching GUI..."
  ];
  
  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      if (i < bl.length) {
        setLines(l => [...l, bl[i]]);
        i++;
      } else {
        clearInterval(iv);
        setTimeout(() => onDone?.(), 400);
      }
    }, 200);
    
    return () => clearInterval(iv);
  }, []);
  
  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: 40
    }}>
      {lines.map((l, i) => (
        <div 
          key={i}
          className="boot-line"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: ".9rem",
            color: (typeof l === 'string' && l.includes("OK")) ? "var(--white)" : "var(--amber)",
            marginBottom: 8,
            lineHeight: 1.7
          }}
        >
          {l}
        </div>
      ))}
    </div>
  );
}