import { useEffect, useRef } from "react";

/* ── PARTICLES ── */
export function ParticleCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext("2d");
    let W = c.width = window.innerWidth, H = c.height = window.innerHeight, raf;
    const ps = Array.from({length:40}, () => ({
      x:Math.random()*W, y:Math.random()*H,
      vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3-.1,
      life:Math.random(), size:Math.random()*1.2+.4
    }));
    const tick = () => {
      ctx.clearRect(0,0,W,H);
      ps.forEach(p => {
        p.x+=p.vx; p.y+=p.vy; p.life+=.002;
        if(p.life>1||p.y<0||p.x<0||p.x>W){p.x=Math.random()*W;p.y=H+10;p.vx=(Math.random()-.5)*.3;p.vy=(Math.random()-.5)*.3-.15;p.life=0;}
        ctx.globalAlpha=Math.sin(p.life*Math.PI)*.6;
        ctx.fillStyle=Math.random()>.85?"#ffb000":"#39ff14";
        ctx.fillRect(p.x,p.y,p.size,p.size);
      });
      raf=requestAnimationFrame(tick);
    };
    tick();
    const r=()=>{W=c.width=window.innerWidth;H=c.height=window.innerHeight;};
    window.addEventListener("resize",r);
    return ()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",r);};
  },[]);
  return <canvas ref={ref} className="particle-canvas"/>;
}

/* ── TERMINAL CURSOR ── */
export function TerminalCursor() {
  const ref = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const raf = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!raf.current) {
        raf.current = requestAnimationFrame(() => {
          el.style.left = pos.current.x + "px";
          el.style.top  = pos.current.y + "px";
          raf.current = null;
        });
      }
    };
    const down = () => el.classList.add("clicking");
    const up   = () => el.classList.remove("clicking");
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup",   up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup",   up);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div id="terminal-cursor" ref={ref}>
      <div className="cur-dot" />
    </div>
  );
}
