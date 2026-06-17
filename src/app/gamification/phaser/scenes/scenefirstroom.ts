import * as Phaser from "phaser";

export default class scenefirstroom extends Phaser.Scene {
  girl!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  textBox!: Phaser.GameObjects.Text;

  tv!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  lamp!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  door!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor() {
    super("scenefirstroom");
  }

  preload() {
    this.load.image("room1", "/images/game/room1.png");
    this.load.image("girl", "/images/game/girl.png");

    this.load.image("tv", "/images/game/tv.png");
    this.load.image("lamp", "/images/game/lamp.png");
    this.load.image("door", "/images/game/door.png");
  }

  create() {
    this.add.image(450, 300, "room1").setScale(0.9);

    this.tv = this.physics.add.sprite(240, 430, "tv").setScale(0.6);
    this.lamp = this.physics.add.sprite(430, 430, "lamp").setScale(0.6);
    this.door = this.physics.add.sprite(700, 430, "door").setScale(0.8);

    this.girl = this.physics.add.sprite(100, 430, "girl").setScale(0.5);

    // ✅ اصلاح TypeScript
    this.cursors = this.input.keyboard!.createCursorKeys();

    this.textBox = this.add.text(40, 40, "", {
      fontSize: "24px",
      color: "#000",
    });

    this.physics.add.overlap(this.girl, this.tv, () => {
      this.textBox.setText("تلویزیون زیاد مصرف می‌کند.\nوقتی لازم نیست خاموشش کن.");
    });

    this.physics.add.overlap(this.girl, this.lamp, () => {
      this.textBox.setText("چراغ‌ها را فقط وقتی لازم داری روشن کن.");
    });

    this.physics.add.overlap(this.girl, this.door, () => {
      this.textBox.setText("آفرین! مرحله بعد باز می‌شود.");
      this.time.delayedCall(800, () => {
        this.scene.start("scenestart");
      });
    });
  }

  update() {
    if (!this.girl || !this.cursors) return;

    this.girl.setVelocityX(0);

    if (this.cursors.left.isDown) {
      this.girl.setVelocityX(-180);
    } else if (this.cursors.right.isDown) {
      this.girl.setVelocityX(180);
    }
  }
}
