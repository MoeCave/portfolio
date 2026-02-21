"use client";

import { useEffect } from "react";
import { injectGlobalStyles } from "./globalStyles";
import { buildStyles } from "./styles";
import { useLoadingLogic } from "./useLoadingLogic";
import LoadingPhase from "./components/LoadingPhase";
import ChoosePhase from "./components/ChoosePhase";

export default function LoadingScreen({ progress, isDone, onFinished }) {
  const {
    phase,
    hovered,
    setHovered,
    barPct,
    showPct,
    msgCount,
    handleChoose,
  } = useLoadingLogic({ progress, isDone, onFinished });

  const S = buildStyles(phase, barPct);

  useEffect(() => { injectGlobalStyles(); }, []);

  return (
    <div style={S.root}>
      <div style={S.scanlines} />
      <div style={S.vignette} />

      <div style={S.inner}>

        {(phase === "loading" || phase === "exiting") && (
          <LoadingPhase S={S} showPct={showPct} msgCount={msgCount} />
        )}

        {phase === "choose" && (
          <ChoosePhase
            S={S}
            hovered={hovered}
            setHovered={setHovered}
            handleChoose={handleChoose}
          />
        )}

      </div>
    </div>
  );
}