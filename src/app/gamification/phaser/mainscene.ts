import * as Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
  house: Phaser.GameObjects.Sprite | undefined;
  panel: Phaser.GameObjects.Sprite | undefined;
  hud: Phaser.GameObjects.Text | undefined;
  panelPlaced = false;

  energyProduced = 0;
  energyConsumption = 2.5;

  constructor() {
    super("MainScene");
  }

  preload() {
    this.load.image("house", "/images/game/house.png");
    this.load.image("panel", "/images/game/panel.png");
  }

  create() {
    // HUD
    this.hud = this.add.text(20, 20, "loading...", {
      fontSize: "22px",
      color: "#000",
    });

    // House
    this.house = this.add.sprite(400, 300, "house").setScale(0.45);

    // Solar Panel
    this.panel = this.add
      .sprite(200, 500, "panel")
      .setScale(0.1)
      .setInteractive();

    this.input.setDraggable(this.panel);

    // Dragging
    this.input.on("drag", (pointer, obj, x, y) => {
      obj.x = x;
      obj.y = y;
    });

    // When panel is placed
    this.input.on("dragend", () => {
      if (this.panel && this.panel.y < 450) {
        this.panelPlaced = true;
      }
    });

    // Energy update loop
    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => this.updateEnergy(),
    });
  }

  updateEnergy() {
    this.energyProduced = this.panelPlaced ? 3.2 : 0;

    if (this.hud) {
      this.hud.setText(
        `تولید: ${this.energyProduced} kW
مصرف: ${this.energyConsumption} kW
وضعیت: ${
          this.energyProduced >= this.energyConsumption ? "پایدار" : "ناپایدار"
        }`
      );
    }
  }
}
