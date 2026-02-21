import { useState, useEffect, useRef } from "react";
import { getVisibleCount } from "./constants";

export function useLoadingLogic({ progress, isDone, onFinished }) {
  const isControlled = progress !== undefined;

  const [autoPct, setAutoPct] = useState(0);
  const [phase, setPhase]     = useState("loading");
  const [hovered, setHovered] = useState(null);
  const finishedRef           = useRef(false);

  const rawPct   = isControlled ? (progress ?? 0) : autoPct;
  const barPct   = isControlled && isDone ? 100 : rawPct;
  const showPct  = isControlled && isDone ? 100 : Math.round(rawPct);
  const msgCount = getVisibleCount(barPct);

  // ── Auto mode timer ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (isControlled) return;
    const DURATION = 3500;
    const TICK_MS  = 40;
    const INC      = (100 / DURATION) * TICK_MS;
    const id = setInterval(() => {
      setAutoPct((prev) => {
        const next = Math.min(prev + INC, 100);
        if (next >= 100) clearInterval(id);
        return next;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [isControlled]);

  // ── Trigger phase transition ─────────────────────────────────────────────────
  function triggerComplete() {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setTimeout(() => {
      setPhase("exiting");
      setTimeout(() => setPhase("choose"), 480);
    }, 450);
  }

  useEffect(() => {
    if (!isControlled && autoPct >= 100) triggerComplete();
  }, [isControlled, autoPct]);

  useEffect(() => {
    if (isControlled && isDone) triggerComplete();
  }, [isControlled, isDone]);

  function handleChoose(mode) {
    onFinished?.(mode);
  }

  return { phase, hovered, setHovered, barPct, showPct, msgCount, handleChoose };
}