import * as Phaser from "phaser";

export default class sceneintro extends Phaser.Scene {
  constructor() {
    super("sceneintro");
  }

  preload() {
    this.load.image("room", "/images/game/room.png");
    this.load.image("girl", "/images/game/girl.png");
  }

  create() {
    this.add.image(450, 300, "room").setScale(0.9);

    this.add.text(150, 90, "این دختر شخصیت اصلی ماست.\nاو می‌خواهد مصرف انرژی را کم کند!", {
      fontSize: "28px",
      color: "#000",
    });

    this.add.sprite(450, 380, "girl").setScale(0.5);

    this.add.text(300, 520, "برای ادامه کلیک کن", {
      fontSize: "24px",
      color: "blue",
    });

    this.input.once("pointerdown", () => {
      this.scene.start("scenefirstroom");
    });
  }
}
