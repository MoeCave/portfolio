export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=VT323&family=Share+Tech+Mono&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --green: #39ff14;
    --green-dim: #1a7a07;
    --green-glow: #39ff1440;
    --amber: #ffb000;
    --white: #e8f0e8;
    --white-dim: #99aa99;
    --bg: #060c06;
    --bg2: #0a100a;
    --border: #1a341a;
    --scanline: rgba(0,0,0,0.12);
    --font-mono: 'Share Tech Mono', monospace;
    --font-vt: 'VT323', monospace;
  }

  html, body, #root { height: 100%; width: 100%; overflow: hidden; }
  body { background: var(--bg); color: var(--white); font-family: var(--font-mono); cursor: none; }
  *, *::before, *::after { cursor: none !important; }

  /* ── Custom cursor — white dot ── */
  #terminal-cursor {
    position: fixed;
    top: 0; left: 0;
    pointer-events: none;
    z-index: 99999;
    transform: translate(-50%, -50%);
    user-select: none;
  }

  #terminal-cursor .cur-dot {
    width: 6px;
    height: 6px;
    background: rgba(255,255,255,0.92);
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(255,255,255,0.35);
    transition: transform 0.1s ease, opacity 0.1s ease;
  }

  #terminal-cursor.clicking .cur-dot {
    transform: scale(0.6);
    opacity: 0.5;
  }

  .scanlines::after {
    content: '';
    position: fixed; inset: 0;
    background: repeating-linear-gradient(0deg, transparent, transparent 3px, var(--scanline) 3px, var(--scanline) 4px);
    pointer-events: none; z-index: 9999;
    animation: scanroll 10s linear infinite;
  }
  @keyframes scanroll { 0%{background-position:0 0} 100%{background-position:0 200px} }

  .crt-flicker { animation: flicker 8s infinite alternate; }
  @keyframes flicker {
    0%,92%{ opacity:1; filter:brightness(1); }
    93%{ opacity:.97; filter:brightness(.95); }
    94%{ opacity:1; filter:brightness(1.02); }
    96%{ opacity:.99; filter:brightness(.99); }
    100%{ opacity:1; filter:brightness(1); }
  }
  .crt-flicker::before {
    content:''; position:fixed; inset:0;
    background:linear-gradient(transparent 0%,rgba(255,255,255,0.008) 50%,transparent 100%);
    background-size:100% 12px; pointer-events:none; z-index:9998;
    animation:hline 8s linear infinite;
  }
  @keyframes hline { 0%{background-position:0 -100vh} 100%{background-position:0 200vh} }

  @keyframes rgbShift {
    0%,100%{ text-shadow:-1px 0 rgba(255,0,0,.15),1px 0 rgba(0,255,255,.15); }
    50%{ text-shadow:1px 0 rgba(255,0,0,.2),-1px 0 rgba(0,255,255,.2); }
  }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes bootFade { 0%{opacity:1} 100%{opacity:0} }
  @keyframes desktopIn { 0%{opacity:0;filter:brightness(0)} 100%{opacity:1;filter:brightness(1)} }
  .boot-fadeout { animation:bootFade 1.2s ease-in-out forwards; }
  .desktop-fadein { animation:desktopIn 1.5s ease-out forwards; }

  @keyframes windowOpen { 0%{opacity:0;transform:scale(.9) translateY(8px)} 100%{opacity:1;transform:scale(1) translateY(0)} }
  @keyframes windowClose { 0%{opacity:1} 100%{opacity:0;transform:scale(.9) translateY(8px)} }
  .window-open { animation:windowOpen .2s ease-out forwards; }
  .window-close { animation:windowClose .15s ease-in forwards; }

  @keyframes ssFloat {
    0%{transform:translate(0,0)} 25%{transform:translate(80px,-40px)}
    50%{transform:translate(-30px,60px)} 75%{transform:translate(50px,30px)} 100%{transform:translate(0,0)}
  }
  @keyframes ssGlow {
    0%,100%{text-shadow:0 0 20px var(--white),0 0 40px var(--white);}
    50%{text-shadow:0 0 40px var(--amber),0 0 80px var(--amber);color:var(--amber);}
  }
  @keyframes notifIn { 0%{transform:translateY(100px);opacity:0} 100%{transform:translateY(0);opacity:1} }
  @keyframes notifOut { 0%{transform:translateY(0);opacity:1} 100%{transform:translateY(100px);opacity:0} }
  @keyframes lineSlideIn { 0%{opacity:0;transform:translateX(-8px)} 100%{opacity:1;transform:translateX(0)} }
  .boot-line { animation:lineSlideIn .15s ease-out forwards; }

  .ascii-header {
    animation:rgbShift 7s ease-in-out infinite;
    color:var(--white) !important;
    text-shadow:0 0 8px rgba(57,255,20,.3);
  }
  .terminal-bg {
    background: linear-gradient(180deg,rgba(57,255,20,.012) 0%,transparent 100%), var(--bg);
  }
  .particle-canvas { position:fixed; inset:0; pointer-events:none; z-index:1; opacity:.18; }
  .crt-vignette { background:radial-gradient(ellipse at center,transparent 55%,rgba(0,0,0,.55) 100%); }

  ::-webkit-scrollbar { width:6px; }
  ::-webkit-scrollbar-track { background:var(--bg); }
  ::-webkit-scrollbar-thumb { background:var(--green-dim); }

  /* ── Prompt inline styling (Ubuntu-accurate) ── */
  .prompt-line {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    font-family: var(--font-mono);
    font-size: .9rem;
    line-height: 1.6;
    white-space: pre-wrap;
    word-break: break-all;
  }
  .p-user  { color: #4caf50; font-weight: bold; }
  .p-sep   { color: #e8f0e8; }
  .p-path  { color: #5c9bd6; font-weight: bold; }
  .p-dollar{ color: #e8f0e8; margin-right: 7px; }
  .p-cmd   { color: #e8f0e8; }

  .inline-input {
    flex: 1;
    min-width: 2px;
    background: transparent;
    border: none;
    outline: none;
    color: #e8f0e8;
    font-family: var(--font-mono);
    font-size: .9rem;
    line-height: 1.6;
    caret-color: #39ff14;
    word-break: break-all;
  }

  .cmd-output {
    color: var(--white);
    font-size: .88rem;
    line-height: 1.75;
    white-space: pre-wrap;
    word-break: break-word;
    text-shadow: 0 0 3px rgba(232,240,232,.1);
    margin-top: 1px;
    margin-bottom: 4px;
  }

  @media (max-width:768px) {
    .window-draggable { position:relative !important; top:auto !important; left:auto !important; width:100% !important; margin-bottom:8px; }
    .desktop-area { display:flex; flex-direction:column; overflow-y:auto; padding:8px; }
    .taskbar-full { display:none; }
    .taskbar-mobile { display:flex !important; }
  }
`;
