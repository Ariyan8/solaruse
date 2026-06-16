"use client";

import dynamic from "next/dynamic";

const Game = dynamic(() => import("./phaser/game"), {
  ssr: false,
});

export default function GamificationPage() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Game />
    </div>
  );
}
