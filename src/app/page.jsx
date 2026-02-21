"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen/index";
import Cli from"@/components/cli/cli_terminal";
import Gui from "@/components/gui/macintosh";


function MainApp({mode}) {
  return (
    <main style={{width:"100vw", height:"100vh", overflow:"hidden"}}>
      {mode === "cli" && <Cli/>}
      {mode === "gui" && <Gui/>}
    </main>
  )
}

export default function Page(){
  const [showLoading, setShowLoading] = useState(true);
  const [mode, setMode] = useState(null);

  if (showLoading) {
    return (
      <LoadingScreen
        onFinished={(selectedMode) =>{
          setMode(selectedMode);
          setShowLoading(false);
        }}
      />
    );
  }

  return <MainApp mode={mode}/>;
}