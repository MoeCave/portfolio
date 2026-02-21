import { useEffect, useState } from "react";

/* ── CLOCK ── */
export function Clock() {
  const [t, setT] = useState(new Date());
  useEffect(()=>{const id=setInterval(()=>setT(new Date()),1000);return()=>clearInterval(id);},[]);
  return <span style={{fontFamily:"var(--font-vt)",fontSize:"1.1rem",color:"var(--white)",letterSpacing:2}}>{t.toLocaleTimeString("es-ES",{hour12:false})}</span>;
}

/* ── SCREENSAVER ── */
export function Screensaver({onWake}){
  return(
    <div onClick={onWake} style={{position:"fixed",inset:0,background:"#000",zIndex:5000,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:20}}>
      <div style={{animation:"ssFloat 8s ease-in-out infinite, ssGlow 3s ease-in-out infinite",fontFamily:"var(--font-vt)",fontSize:"clamp(2rem,8vw,5rem)",color:"var(--white)",textAlign:"center"}}>ALEJANDRO<br/>PORTFOLIO<br/>v1.0</div>
      <div style={{color:"var(--white-dim)",fontFamily:"var(--font-mono)",fontSize:".75rem",animation:"blink 1.5s step-end infinite"}}>[ CLICK O PULSA CUALQUIER TECLA ]</div>
    </div>
  );
}

/* ── NOTIFICATION ── */
export function Notification({message,onAction,onDismiss}){
  const [closing,setClosing]=useState(false);
  const dismiss=()=>{setClosing(true);setTimeout(onDismiss,400);};
  return(
    <div style={{position:"fixed",bottom:50,right:20,zIndex:4000,background:"var(--bg2)",border:"1px solid var(--green)",padding:"12px 16px",maxWidth:280,animation:closing?"notifOut .4s ease-in forwards":"notifIn .4s ease-out",boxShadow:"0 0 20px var(--green-glow)"}}>
      <div style={{fontSize:".75rem",color:"var(--white-dim)",marginBottom:4}}>⚡ SYSTEM</div>
      <div style={{fontSize:".85rem",marginBottom:10,color:"var(--white)"}}>{message}</div>
      <div style={{display:"flex",gap:8}}>
        <button onClick={()=>{onAction();dismiss();}} style={{background:"var(--green)",color:"#000",border:"none",padding:"4px 10px",fontFamily:"var(--font-mono)",fontSize:".75rem",fontWeight:"bold"}}>OPEN</button>
        <button onClick={dismiss} style={{background:"transparent",color:"var(--white-dim)",border:"1px solid var(--white-dim)",padding:"4px 10px",fontFamily:"var(--font-mono)",fontSize:".75rem"}}>DISMISS</button>
      </div>
    </div>
  );
}

/* ── PROMPT LABEL ── */
export function PromptLabel() {
  return (
    <span style={{fontFamily:"var(--font-mono)",fontSize:".9rem",lineHeight:1.6,whiteSpace:"nowrap",flexShrink:0}}>
      <span style={{color:"#4caf50",fontWeight:"bold"}}>alejandro</span>
      <span style={{color:"#e8f0e8"}}>@</span>
      <span style={{color:"#4caf50",fontWeight:"bold"}}>portfolio</span>
      <span style={{color:"#e8f0e8"}}>:</span>
      <span style={{color:"#5c9bd6",fontWeight:"bold"}}>~</span>
      <span style={{color:"#e8f0e8",marginRight:7}}>$</span>
    </span>
  );
}

/* ── WINDOW CONTENTS ── */
export function AboutContent(){
  return(
    <div>
      <pre style={{color:"var(--green)",fontSize:".7rem",lineHeight:1.2,marginBottom:16,opacity:.9}}>{`
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
 ╚═╝     ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝`}</pre>
      <p style={{marginBottom:10}}><span style={{color:"var(--green)"}}>$ whoami</span></p>
      <p style={{marginBottom:18,color:"var(--white)",lineHeight:1.8}}>Soy <strong style={{color:"var(--green)"}}>Alejandro</strong>, desarrollador fullstack con pasión por construir productos escalables, APIs robustas y frontends que se sienten vivos.</p>
      <table style={{width:"100%",borderCollapse:"collapse"}}>
        {[["Rol","Fullstack Developer"],["Stack","React · Flask · TypeScript · MongoDB"],["Ubicación","España 🇪🇸"],["Disponible","✅ Freelance / Empleo"],["GitHub","github.com/alejandro"]].map(([k,v])=>(
          <tr key={k} style={{borderBottom:"1px solid var(--border)"}}>
            <td style={{color:"var(--green)",padding:"7px 12px 7px 0",whiteSpace:"nowrap",opacity:.85}}>{k}</td>
            <td style={{color:"var(--white)",padding:"7px 0"}}>{v}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export function SkillsContent(){
  const skills=[
    {label:"React / Next.js",pct:92,cat:"Frontend"},{label:"TypeScript",pct:88,cat:"Frontend"},
    {label:"TailwindCSS / CSS",pct:90,cat:"Frontend"},{label:"Flask / Python",pct:87,cat:"Backend"},
    {label:"MongoDB / Mongoose",pct:82,cat:"Backend"},{label:"PostgreSQL",pct:75,cat:"Backend"},
    {label:"Docker / CI-CD",pct:70,cat:"DevOps"},{label:"REST APIs / GraphQL",pct:85,cat:"Backend"},
  ];
  const cats=[...new Set(skills.map(s=>s.cat))];
  return(
    <div>
      {cats.map(cat=>(
        <div key={cat} style={{marginBottom:20}}>
          <div style={{color:"var(--amber)",marginBottom:10,fontFamily:"var(--font-vt)",fontSize:"1.05rem",letterSpacing:2}}>▸ {cat.toUpperCase()}</div>
          {skills.filter(s=>s.cat===cat).map(s=>(
            <div key={s.label} style={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{color:"var(--white)"}}>{s.label}</span>
                <span style={{color:"var(--green)"}}>{s.pct}%</span>
              </div>
              <div style={{height:5,background:"rgba(30,61,30,.8)"}}>
                <div style={{height:"100%",width:`${s.pct}%`,background:"linear-gradient(90deg,var(--green-dim),var(--green))",boxShadow:"0 0 6px var(--green-glow)",transition:"width 1s ease"}}/>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function ProjectsContent(){
  const [hov,setHov]=useState(null);
  const projects=[
    {id:1,name:"FlaskAPI Pro",desc:"REST API escalable con Flask, JWT auth, MongoDB, y deploy en Docker. Rate limiting, logging estructurado y docs con Swagger.",tags:["Flask","MongoDB","Docker","JWT"],year:2024},
    {id:2,name:"ReactDashboard",desc:"Dashboard analytics en React + TypeScript con gráficas en tiempo real, filtros avanzados y exportación a CSV/PDF.",tags:["React","TypeScript","Recharts"],year:2024},
    {id:3,name:"DevLink",desc:"Red social minimalista para developers: posts con Markdown, comentarios anidados, sistema de follows. Fullstack Flask + React.",tags:["Flask","React","MongoDB","WebSockets"],year:2023},
    {id:4,name:"CLI Tools Kit",desc:"Colección de herramientas CLI en Python para automatización de tareas de desarrollo: scaffolding, git hooks, env manager.",tags:["Python","Click","Shell"],year:2023},
  ];
  return(
    <div style={{display:"grid",gap:10}}>
      {projects.map(p=>(
        <div key={p.id} onMouseEnter={()=>setHov(p.id)} onMouseLeave={()=>setHov(null)}
          style={{border:`1px solid ${hov===p.id?"var(--green)":"var(--border)"}`,padding:14,transition:"all .2s",boxShadow:hov===p.id?"0 0 10px var(--green-glow)":"none",background:hov===p.id?"rgba(57,255,20,.04)":"transparent"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <strong style={{color:"var(--green)",fontFamily:"var(--font-vt)",fontSize:"1.1rem",letterSpacing:1}}>{p.name}</strong>
            <span style={{color:"var(--white-dim)",fontSize:".75rem"}}>{p.year}</span>
          </div>
          <p style={{fontSize:".82rem",marginBottom:10,color:"var(--white)",lineHeight:1.7}}>{p.desc}</p>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {p.tags.map(t=><span key={t} style={{border:"1px solid var(--green-dim)",color:"var(--white-dim)",padding:"2px 8px",fontSize:".7rem"}}>{t}</span>)}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ContactContent(){
  const [form,setForm]=useState({name:"",email:"",msg:""});
  const [sent,setSent]=useState(false);
  if(sent)return<div style={{textAlign:"center",padding:20,color:"var(--green)",fontFamily:"var(--font-vt)",fontSize:"1.5rem"}}>MESSAGE SENT ✓<br/><span style={{fontSize:".9rem",color:"var(--white-dim)"}}>Te responderé pronto.</span></div>;
  return(
    <form onSubmit={e=>{e.preventDefault();setSent(true);}} style={{display:"flex",flexDirection:"column",gap:14}}>
      {[["name","NOMBRE","text"],["email","EMAIL","email"]].map(([field,label,type])=>(
        <div key={field}>
          <label style={{display:"block",fontSize:".7rem",color:"var(--white-dim)",marginBottom:5,letterSpacing:1}}>{label}</label>
          <input type={type} required value={form[field]} onChange={e=>setForm(f=>({...f,[field]:e.target.value}))}
            style={{width:"100%",background:"rgba(57,255,20,.03)",border:"1px solid rgba(255,255,255,.25)",color:"var(--white)",padding:"8px 10px",fontFamily:"var(--font-mono)",fontSize:".85rem",outline:"none"}}/>
        </div>
      ))}
      <div>
        <label style={{display:"block",fontSize:".7rem",color:"var(--white-dim)",marginBottom:5,letterSpacing:1}}>MENSAJE</label>
        <textarea rows={4} required value={form.msg} onChange={e=>setForm(f=>({...f,msg:e.target.value}))}
          style={{width:"100%",background:"rgba(57,255,20,.03)",border:"1px solid rgba(255,255,255,.25)",color:"var(--white)",padding:"8px 10px",fontFamily:"var(--font-mono)",fontSize:".85rem",outline:"none",resize:"vertical"}}/>
      </div>
      <button type="submit" style={{background:"var(--green)",color:"#000",border:"none",padding:10,fontFamily:"var(--font-vt)",fontSize:"1.1rem",letterSpacing:2,fontWeight:"bold"}}>SEND MESSAGE ▶</button>
    </form>
  );
}
