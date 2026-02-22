import { useState } from "react";
import { globalStyles } from "./styles/globalStyles.js";
import { TerminalCursor, ParticleCanvas } from "./components/Effects.jsx";
import { TerminalCLI, BootScreen } from "@/components/cli/components/TerminalAndBoot.jsx";
import { DesktopLayout } from "@/components/gui/DesktopAndWindows.jsx";

export default function App(){
  const [view,setView]=useState("cli");
  const [exiting,setExiting]=useState(false);
  const startX=()=>{setExiting(true);setTimeout(()=>setView("booting"),800);};
  const bootDone=()=>setView("desktop");
  return(
    <>
      <style dangerouslySetInnerHTML={{__html:globalStyles}}/>
      <div className="scanlines crt-flicker" style={{width:"100vw",height:"100vh",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"}}>
        <div className="crt-vignette" style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:9990}}/>
        <TerminalCursor />
        <ParticleCanvas/>
        {view==="cli"&&(
          <div className={exiting?"boot-fadeout":""} style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",position:"relative",zIndex:2}}>
            <TerminalCLI onStartX={startX}/>
          </div>
        )}
        {view==="booting"&&(
          <div className="desktop-fadein" style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",position:"relative",zIndex:2}}>
            <BootScreen onDone={bootDone}/>
          </div>
        )}
        {view==="desktop"&&(
          <div className="desktop-fadein" style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",position:"relative",zIndex:2}}>
            <DesktopLayout/>
          </div>
        )}
      </div>
    </>
  );
}
