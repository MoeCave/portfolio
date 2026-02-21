"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "@/components/Loadingscreen";

function MainApp(){
  return(
    <main>
      Blowing Fever - Welcome
    </main>
  )
}

export default function Page(){
  const [showLoading, setShowLoading] = useState(true);

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