import { useCallback, useEffect, useRef, useState } from "react";
import { AboutContent, ContactContent, ProjectsContent, SkillsContent, Clock, Notification, Screensaver } from "./UIAndContent.jsx";

/* ── DRAG HOOK ── */
function useDrag(ip){
  const [pos,setPos]=useState(ip);
  const dr=useRef(false),off=useRef({x:0,y:0});
  const start=useCallback(e=>{
    dr.current=true; off.current={x:e.clientX-pos.x,y:e.clientY-pos.y};
    const mv=e=>{if(dr.current)setPos({x:e.clientX-off.current.x,y:e.clientY-off.current.y});};
    const up=()=>{dr.current=false;window.removeEventListener("mousemove",mv);window.removeEventListener("mouseup",up);};
    window.addEventListener("mousemove",mv); window.addEventListener("mouseup",up);
  },[pos]);
  return [pos,start];
}

/* ── WINDOW ── */
function Window({title,children,onClose,onMinimize,initialPos,zIndex,onClick,isMinimized}){
  const [pos,drag]=useDrag(initialPos||{x:80,y:80});
  const [closing,setClosing]=useState(false);
  const mobile=window.innerWidth<=768;
  const handleClose=()=>{setClosing(true);setTimeout(onClose,150);};
  if(isMinimized)return null;
  return(
    <div className={`window-draggable ${closing?"window-close":"window-open"}`} onClick={onClick}
      style={{position:mobile?"relative":"absolute",top:mobile?"auto":pos.y,left:mobile?"auto":pos.x,width:mobile?"100%":"clamp(320px,40vw,600px)",background:"rgba(10,16,10,.97)",border:"1px solid var(--green)",boxShadow:"0 0 16px var(--green-glow)",zIndex,userSelect:"none"}}>
      <div onMouseDown={mobile?undefined:drag} style={{background:"linear-gradient(90deg,rgba(26,122,7,.8),rgba(13,46,13,.9))",padding:"6px 10px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid var(--green)"}}>
        <span style={{fontFamily:"var(--font-vt)",fontSize:"1.1rem",letterSpacing:2,color:"var(--white)"}}>▌ {title.toUpperCase()}</span>
        <div style={{display:"flex",gap:6}}>
          {[["_",onMinimize],["□",null],["✕",handleClose]].map(([s,fn],i)=>(
            <button key={i} onClick={e=>{e.stopPropagation();fn&&fn();}} style={{width:18,height:18,background:"transparent",border:"1px solid var(--green)",color:"var(--white)",fontFamily:"var(--font-mono)",fontSize:".6rem",display:"flex",alignItems:"center",justifyContent:"center",opacity:fn?1:.3}}>{s}</button>
          ))}
        </div>
      </div>
      <div style={{padding:16,overflowY:"auto",maxHeight:"60vh",fontSize:".875rem",lineHeight:1.8,color:"var(--white)"}}>{children}</div>
    </div>
  );
}

/* ── WINDOWS CONFIG ── */
const WINDOWS_CONFIG = [
  {id:"about",    title:"About.exe",    component:<AboutContent/>,    pos:{x:60,y:80}},
  {id:"skills",   title:"Skills.exe",   component:<SkillsContent/>,   pos:{x:120,y:100}},
  {id:"projects", title:"Projects.exe", component:<ProjectsContent/>, pos:{x:180,y:120}},
  {id:"contact",  title:"Contact.exe",  component:<ContactContent/>,  pos:{x:240,y:140}},
];

/* ── DESKTOP ── */
export function DesktopLayout(){
  const [openW,setOpenW]=useState(["about"]);
  const [min,setMin]=useState({});
  const [z,setZ]=useState({about:10,skills:9,projects:8,contact:7});
  const [muted,setMuted]=useState(false);
  const [notif,setNotif]=useState(false);
  const [ss,setSs]=useState(false);
  const idle=useRef(null);

  useEffect(()=>{const t=setTimeout(()=>{if(!openW.includes("contact"))setNotif(true);},5000);return()=>clearTimeout(t);},[]);

  const resetIdle=useCallback(()=>{
    clearTimeout(idle.current);
    if(ss)setSs(false);
    idle.current=setTimeout(()=>setSs(true),30000);
  },[ss]);

  useEffect(()=>{
    resetIdle();
    window.addEventListener("mousemove",resetIdle);
    window.addEventListener("keydown",resetIdle);
    return()=>{window.removeEventListener("mousemove",resetIdle);window.removeEventListener("keydown",resetIdle);};
  },[resetIdle]);

  useEffect(()=>{
    const h=e=>{
      if(e.ctrlKey){const m={"1":"about","2":"skills","3":"projects","4":"contact"};const id=m[e.key];if(id){e.preventDefault();openWindow(id);}}
    };
    window.addEventListener("keydown",h);return()=>window.removeEventListener("keydown",h);
  },[openW]);

  const openWindow=id=>{
    setOpenW(w=>w.includes(id)?w:[...w,id]);
    setMin(m=>({...m,[id]:false}));
    const mx=Math.max(...Object.values(z));
    setZ(z=>({...z,[id]:mx+1}));
  };
  const closeWindow=id=>setOpenW(w=>w.filter(x=>x!==id));
  const focusW=id=>{const mx=Math.max(...Object.values(z));setZ(z=>({...z,[id]:mx+1}));};
  const mobile=window.innerWidth<=768;

  return(
    <div style={{width:"100%",height:"100%",position:"relative",overflow:"hidden"}}>
      {ss&&<Screensaver onWake={()=>setSs(false)}/>}
      <div style={{height:32,background:"linear-gradient(90deg,#080f08,#0b180b)",borderBottom:"1px solid rgba(57,255,20,.4)",display:"flex",alignItems:"center",padding:"0 12px",gap:20,zIndex:100,position:"relative",flexShrink:0}}>
        <span style={{fontFamily:"var(--font-vt)",fontSize:"1.1rem",color:"var(--white)",marginRight:12}}>⣿ ALEJANDRO OS</span>
        <div className="taskbar-full" style={{display:"flex",gap:16}}>
          {["File","Edit","View","Help"].map(m=><span key={m} style={{color:"var(--white-dim)",fontSize:".8rem"}}>{m}</span>)}
          <span style={{color:"var(--border)"}}>│</span>
          {WINDOWS_CONFIG.map(w=>(
            <span key={w.id} onClick={()=>openWindow(w.id)} style={{color:openW.includes(w.id)?"var(--white)":"var(--white-dim)",fontSize:".8rem",borderBottom:openW.includes(w.id)?"1px solid var(--green)":"none"}}>
              {w.id.charAt(0).toUpperCase()+w.id.slice(1)}
            </span>
          ))}
        </div>
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:16}}>
          <span onClick={()=>setMuted(m=>!m)} style={{color:"var(--white-dim)",fontSize:".8rem"}}>{muted?"🔇":"🔊"}</span>
          <Clock/>
        </div>
      </div>
      {!mobile&&(
        <div style={{position:"absolute",top:48,left:16,display:"flex",flexDirection:"column",gap:20,zIndex:50}}>
          {WINDOWS_CONFIG.map(w=>(
            <div key={w.id} onDoubleClick={()=>openWindow(w.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,width:64}}>
              <div style={{width:40,height:40,border:"1px solid var(--green-dim)",background:"rgba(57,255,20,.06)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem"}}>
                {{"about":"👤","skills":"⚙","projects":"📁","contact":"✉"}[w.id]}
              </div>
              <span style={{fontSize:".65rem",color:"var(--white-dim)",textAlign:"center",fontFamily:"var(--font-mono)"}}>{w.title}</span>
            </div>
          ))}
        </div>
      )}
      <div className="desktop-area" style={{position:mobile?"relative":"absolute",inset:mobile?"auto":0,top:mobile?0:32,bottom:mobile?"auto":32,left:0,right:0,overflow:mobile?"auto":"hidden"}}>
        {WINDOWS_CONFIG.filter(w=>openW.includes(w.id)).map(w=>(
          <Window key={w.id} title={w.title} initialPos={w.pos} zIndex={z[w.id]||10} isMinimized={min[w.id]}
            onClose={()=>closeWindow(w.id)} onMinimize={()=>setMin(m=>({...m,[w.id]:true}))} onClick={()=>focusW(w.id)}>
            {w.component}
          </Window>
        ))}
      </div>
      {mobile&&(
        <div className="taskbar-mobile" style={{display:"none",position:"fixed",bottom:0,left:0,right:0,background:"var(--bg2)",borderTop:"1px solid var(--green)",height:44,alignItems:"center",justifyContent:"space-around",zIndex:200}}>
          {WINDOWS_CONFIG.map(w=><button key={w.id} onClick={()=>openWindow(w.id)} style={{background:"transparent",border:"none",color:"var(--white)",fontFamily:"var(--font-vt)",fontSize:".9rem"}}>{w.id.charAt(0).toUpperCase()+w.id.slice(1)}</button>)}
        </div>
      )}
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:32,background:"linear-gradient(90deg,#080f08,#0b180b)",borderTop:"1px solid rgba(30,61,30,.6)",display:"flex",alignItems:"center",padding:"0 12px",gap:8,zIndex:100}}>
        {openW.map(id=>{const w=WINDOWS_CONFIG.find(x=>x.id===id);return w&&(
          <button key={id} onClick={()=>{min[id]?setMin(m=>({...m,[id]:false})):setMin(m=>({...m,[id]:true}));}}
            style={{background:min[id]?"transparent":"rgba(57,255,20,.08)",border:"1px solid var(--green-dim)",color:"var(--white)",padding:"2px 10px",fontFamily:"var(--font-mono)",fontSize:".7rem"}}>
            {w.title}
          </button>
        );})}
        <span style={{marginLeft:"auto",color:"var(--white-dim)",fontSize:".7rem"}}>Ctrl+1-4 para ventanas</span>
      </div>
      {notif&&<Notification message="New message: ¿Quieres abrir la ventana de contacto?" onAction={()=>openWindow("contact")} onDismiss={()=>setNotif(false)}/>}
    </div>
  );
}