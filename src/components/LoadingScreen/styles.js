const FONT = "'Share Tech Mono', 'Courier New', monospace";

export function buildStyles(phase, barPct) {
  return {
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
}

export function cardStyle(hovered, id) {
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

export function cardIcon(hovered, id) {
  const on = hovered === id;
  return {
    fontSize: "clamp(30px, 4.5vw, 48px)",
    lineHeight: 1,
    opacity: on ? 1 : 0.4,
    transition: "opacity 0.18s ease",
  };
}

export function cardLabel(hovered, id) {
  const on = hovered === id;
  return {
    fontSize: "clamp(13px, 1.6vw, 16px)",
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: on ? "#ffffff" : "rgba(255,255,255,0.45)",
    transition: "color 0.18s ease",
  };
}

export const cardHint = {
  fontSize: "clamp(9px, 1.05vw, 11px)",
  color: "rgba(255,255,255,0.22)",
  letterSpacing: "0.1em",
  textAlign: "center",
  lineHeight: 1.5,
};