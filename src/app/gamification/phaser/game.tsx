"use client";

import { useEffect, useRef } from "react";
import * as Phaser from "phaser";

import scenestart from "./scenes/scenestart";
import sceneintro from "./scenes/sceneintro";
import scenefirstroom from "./scenes/scenefirstroom";

export default function game() {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gameRef.current) return;

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      width: 900,
      height: 600,
      backgroundColor: "#dff3ff",
      physics: {
        default: "arcade",
        arcade: { debug: false },
      },
      parent: gameRef.current,
      scene: [scenestart, sceneintro, scenefirstroom],
    });

    return () => game.destroy(true);
  }, []);

  return (
    <div
      ref={gameRef}
      style={{ width: "100%", height: "100%", touchAction: "none" }}
    />
  );
}
