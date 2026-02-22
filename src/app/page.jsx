"use client";

import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen/index";
import Cli from "@/components/cli/Cliterminal.jsx";
import { DesktopLayout } from "@/components/gui/DesktopAndWindows";

function MainApp({ mode }) {
  return (    <main style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      {mode === "cli" && <Cli />}
      {mode === "gui" && <DesktopLayout />}
    </main>
      );
}

export default function Page() {
  const [showLoading, setShowLoading] = useState(true);
  const [mode, setMode] = useState(null);

  if (showLoading) {
    return (
      <LoadingScreen
              onFinished={(selectedMode) => {
          setMode(selectedMode === "terminal" ? "cli" : "gui");
          setShowLoading(false);
        }}
      />
    );
  }
    return <MainApp mode={mode} />;
}