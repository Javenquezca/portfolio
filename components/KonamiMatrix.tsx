"use client";
import { useCallback } from "react";
import { useMatrixRain, useKonamiCode } from "./MatrixRain";

export default function KonamiMatrix() {
  const { trigger, node } = useMatrixRain();
  useKonamiCode(useCallback(() => trigger(), [trigger]));

  return (
    <>
      {node}
      <div style={{ position: "fixed", top: "16px", right: "16px", zIndex: 9998, pointerEvents: "none" }}>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          letterSpacing: "0.15em",
          color: "rgba(0, 150, 255, 0.45)",
        }}>
          ↑↑↓↓←→←→JV
        </span>
      </div>
    </>
  );
}