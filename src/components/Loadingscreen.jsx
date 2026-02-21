"use client";

import { useState, useEffect, useRef } from "react";

// ─── ASCII art ─────────────────────────────────────────────────────────────────
const ASCII_TITLE = `
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
`.trim();

// ─── Boot messages ─────────────────────────────────────────────────────────────
const MESSAGES = [
  "> Loading UI modules...",
  "> Initializing shaders...",
  "> Fetching projects...",
  "> Wiring dev tools...",
  "> Compiling asset manifest...",
  "> Mounting filesystem...",
  "> Calibrating display matrix...",
  "> Verifying checksums...",
  "> Spawning workers...",
  "> Almost there...",
];

function getVisibleCount(pct) {
  return Math.min(MESSAGES.length, Math.ceil((pct / 100) * MESSAGES.length));
}

// ─── Global CSS ────────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

@keyframes __ls_blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
@keyframes __ls_slideIn {
  from { opacity: 0; transform: translateY(5px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes __ls_fadeOutUp {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(-12px); }
}
@keyframes __ls_fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes __ls_flicker {
  0%,100% { opacity: 1; }
  94% { opacity: 1; }
  95% { opacity: 0.87; }
  96% { opacity: 1; }
  99% { opacity: 0.94; }
}
`;

function injectGlobalStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById("__ls-global__")) return;
  const el = document.createElement("style");
  el.id = "__ls-global__";
  el.textContent = GLOBAL_CSS;
  document.head.appendChild(el);
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function LoadingScreen({ progress, isDone, onFinished }) {
  const isControlled = progress !== undefined;

  const [autoPct, setAutoPct] = useState(0);
  // phase: "loading" | "exiting" | "choose"
  const [phase, setPhase]     = useState("loading");
  const [hovered, setHovered] = useState(null);
  const finishedRef           = useRef(false);

  const rawPct   = isControlled ? (progress ?? 0) : autoPct;
  const barPct   = isControlled && isDone ? 100 : rawPct;
  const showPct  = isControlled && isDone ? 100 : Math.round(rawPct);
  const msgCount = getVisibleCount(barPct);

  useEffect(() => { injectGlobalStyles(); }, []);

  // ── Auto mode timer ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (isControlled) return;
    const DURATION = 3500;
    const TICK_MS  = 40;
    const INC      = (100 / DURATION) * TICK_MS;
    const id = setInterval(() => {
      setAutoPct((prev) => {
        const next = Math.min(prev + INC, 100);
        if (next >= 100) clearInterval(id);
        return next;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [isControlled]);

  // ── Trigger phase transition ─────────────────────────────────────────────────
  function triggerComplete() {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setTimeout(() => {
      setPhase("exiting");            // start fade-out of loading content
      setTimeout(() => setPhase("choose"), 480); // swap to choose screen
    }, 450);
  }

  useEffect(() => {
    if (!isControlled && autoPct >= 100) triggerComplete();
  }, [isControlled, autoPct]);

  useEffect(() => {
    if (isControlled && isDone) triggerComplete();
  }, [isControlled, isDone]);

  // ── User picks a mode ────────────────────────────────────────────────────────
  function handleChoose(mode) {
    onFinished?.(mode);
  }

  const visibleMessages = MESSAGES.slice(0, msgCount);

  // ─── Base styles ─────────────────────────────────────────────────────────────
  const FONT = "'Share Tech Mono', 'Courier New', monospace";

  const S = {
    root: {
      position: "fixed",
      inset: 0,
      background: "#000000",
      fontFamily: FONT,
      color: "#ffffff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "clamp(1rem, 4vw, 3rem)",
      overflow: "hidden",
      zIndex: 9999,
      animation: "__ls_flicker 12s infinite",
    },
    scanlines: {
      position: "absolute", inset: 0, pointerEvents: "none",
      background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.018) 2px,rgba(255,255,255,0.018) 4px)",
    },
    vignette: {
      position: "absolute", inset: 0, pointerEvents: "none",
      background: "radial-gradient(ellipse at center,transparent 50%,rgba(0,0,0,0.8) 100%)",
    },
    inner: {
      position: "relative", zIndex: 2,
      width: "100%", maxWidth: "920px",
      display: "flex", flexDirection: "column",
      gap: "clamp(1rem, 2.5vh, 2rem)",
    },

    // ── Loading ──
    loadingWrap: {
      display: "flex", flexDirection: "column",
      gap: "clamp(1rem, 2.5vh, 2rem)",
      animation: phase === "exiting" ? "__ls_fadeOutUp 0.45s ease-in both" : "none",
    },
    ascii: {
      whiteSpace: "pre",
      fontSize: "clamp(5px, 1.05vw, 10.5px)",
      lineHeight: 1.25, letterSpacing: 0,
      color: "#ffffff", display: "block",
      overflowX: "auto", userSelect: "none",
    },
    subtitle: {
      display: "block", marginTop: "0.4rem",
      fontSize: "clamp(12px, 1.5vw, 15px)",
      color: "rgba(255,255,255,0.45)",
      letterSpacing: "0.3em", textTransform: "uppercase",
    },
    divider: { height: "1px", background: "rgba(255,255,255,0.1)" },
    console: { display: "flex", flexDirection: "column", gap: "2px", minHeight: "200px" },
    msgBase: {
      fontSize: "clamp(11px, 1.3vw, 14px)", lineHeight: 1.75,
      color: "rgba(255,255,255,0.5)",
      animation: "__ls_slideIn 0.2s ease-out both",
    },
    msgLast: { color: "#ffffff" },
    cursor: {
      display: "inline-block", width: "8px", height: "0.9em",
      background: "#ffffff", marginLeft: "3px", verticalAlign: "text-bottom",
      animation: "__ls_blink 0.8s step-end infinite",
    },
    progressWrap: { display: "flex", flexDirection: "column", gap: "7px" },
    progressMeta: {
      display: "flex", justifyContent: "space-between",
      fontSize: "clamp(10px, 1.2vw, 12px)",
      color: "rgba(255,255,255,0.35)",
      letterSpacing: "0.1em", textTransform: "uppercase",
    },
    progressPct: { color: "#ffffff" },
    track: {
      width: "100%", height: "2px",
      background: "rgba(255,255,255,0.12)",
      position: "relative", overflow: "hidden",
    },
    fill: {
      position: "absolute", inset: "0 auto 0 0",
      width: `${barPct}%`, background: "#ffffff",
      transition: "width 0.3s linear",
    },

    // ── Choose ──
    chooseWrap: {
      display: "flex", flexDirection: "column",
      alignItems: "center",
      gap: "clamp(1.5rem, 4vh, 2.5rem)",
      animation: "__ls_fadeInUp 0.5s ease-out both",
    },
    chooseHeader: {
      display: "flex", flexDirection: "column",
      alignItems: "center", gap: "0.6rem", width: "100%",
    },
    choosePrompt: {
      fontSize: "clamp(13px, 1.8vw, 19px)",
      color: "#ffffff",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      marginTop: "0.5rem",
    },
    chooseSub: {
      fontSize: "clamp(10px, 1.2vw, 13px)",
      color: "rgba(255,255,255,0.35)",
      letterSpacing: "0.15em",
    },
    options: {
      display: "flex",
      gap: "clamp(1rem, 4vw, 2.5rem)",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    footer: {
      fontSize: "clamp(9px, 1vw, 11px)",
      color: "rgba(255,255,255,0.2)",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
    },
  };

  function cardStyle(id) {
    const on = hovered === id;
    return {
      cursor: "pointer",
      border: `1px solid ${on ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.18)"}`,
      background: on ? "rgba(255,255,255,0.05)" : "transparent",
      padding: "clamp(1.4rem, 3vw, 2.2rem) clamp(2rem, 5vw, 3.5rem)",
      display: "flex", flexDirection: "column",
      alignItems: "center", gap: "0.9rem",
      minWidth: "clamp(140px, 22vw, 220px)",
      transition: "border-color 0.18s ease, background 0.18s ease",
      userSelect: "none",
    };
  }

  function cardIcon(id) {
    const on = hovered === id;
    return {
      fontSize: "clamp(30px, 4.5vw, 48px)",
      lineHeight: 1,
      opacity: on ? 1 : 0.4,
      transition: "opacity 0.18s ease",
    };
  }

  function cardLabel(id) {
    const on = hovered === id;
    return {
      fontSize: "clamp(13px, 1.6vw, 16px)",
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: on ? "#ffffff" : "rgba(255,255,255,0.45)",
      transition: "color 0.18s ease",
    };
  }

  const cardHint = {
    fontSize: "clamp(9px, 1.05vw, 11px)",
    color: "rgba(255,255,255,0.22)",
    letterSpacing: "0.1em",
    textAlign: "center",
    lineHeight: 1.5,
  };

  // ─── Render ───────────────────────────────────────────────────────────────────
  return (
    <div style={S.root}>
      <div style={S.scanlines} />
      <div style={S.vignette} />

      <div style={S.inner}>

        {/* ══════════ LOADING ══════════ */}
        {(phase === "loading" || phase === "exiting") && (
          <div style={S.loadingWrap}>
            <div>
              <pre style={S.ascii}>{ASCII_TITLE}</pre>
              <span style={S.subtitle}>portfolio&nbsp;v1.0</span>
            </div>

            <div style={S.divider} />

            <div style={S.console}>
              {visibleMessages.map((msg, i) => {
                const isLast = i === visibleMessages.length - 1;
                return (
                  <div key={i} style={{ ...S.msgBase, ...(isLast ? S.msgLast : {}) }}>
                    {msg}
                    {isLast && showPct < 100 && <span style={S.cursor} />}
                  </div>
                );
              })}
            </div>

            <div style={S.progressWrap}>
              <div style={S.progressMeta}>
                <span>System initialization</span>
                <span style={S.progressPct}>{showPct}%</span>
              </div>
              <div style={S.track}>
                <div style={S.fill} />
              </div>
            </div>
          </div>
        )}

        {/* ══════════ CHOOSE ══════════ */}
        {phase === "choose" && (
          <div style={S.chooseWrap}>

            <div style={S.chooseHeader}>
              <pre style={{ ...S.ascii, textAlign: "center" }}>{ASCII_TITLE}</pre>
              <span style={S.subtitle}>portfolio&nbsp;v1.0</span>
              <div style={{ ...S.divider, width: "100%", marginTop: "0.5rem" }} />
              <p style={S.choosePrompt}>
                Select interface
                <span style={{ ...S.cursor, marginLeft: "6px" }} />
              </p>
              <p style={S.chooseSub}>Choose your preferred experience</p>
            </div>

            <div style={S.options}>

              {/* ── Terminal ── */}
              <div
                style={cardStyle("terminal")}
                onMouseEnter={() => setHovered("terminal")}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleChoose("terminal")}
              >
                <span style={cardIcon("terminal")}>⌨</span>
                <span style={cardLabel("terminal")}>Terminal</span>
                <span style={cardHint}>Text-based<br />keyboard driven</span>
              </div>

              {/* ── GUI ── */}
              <div
                style={cardStyle("gui")}
                onMouseEnter={() => setHovered("gui")}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleChoose("gui")}
              >
                <span style={cardIcon("gui")}>⬡</span>
                <span style={cardLabel("gui")}>GUI</span>
                <span style={cardHint}>Visual interface<br />mouse friendly</span>
              </div>

            </div>

            <p style={S.footer}>You can switch anytime</p>

          </div>
        )}

      </div>
    </div>
  );
}