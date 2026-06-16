import * as Phaser from "phaser";

export default class scenestart extends Phaser.Scene {
  constructor() {
    super("scenestart");
  }

  create() {
    this.add.text(200, 150, "نام بازی: خانه انرژی سبز", {
      fontSize: "40px",
      color: "#000",
    });

    this.add.text(150, 250, "در این بازی یاد می‌گیری چگونه مصرف انرژی را مدیریت کنی.", {
      fontSize: "22px",
      color: "#000",
    });

    this.add.text(250, 450, "برای شروع کلیک کن", {
      fontSize: "28px",
      color: "blue",
    });

    this.input.once("pointerdown", () => {
      this.scene.start("sceneintro");
    });
  }
}
