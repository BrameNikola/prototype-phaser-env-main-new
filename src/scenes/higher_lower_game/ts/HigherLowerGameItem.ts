import Phaser from "phaser";

export default class HigherLowerGameItem extends Phaser.GameObjects.Sprite {
  value: number;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    image: string,
    value: number
  ) {
    super(scene, x, y, image);

    scene.add.existing(this);

    this.value = value;
  }

  initiate() {
    this.setScale(0.3);
    this.moveOffScreen();
  }

  moveToFirstSpot() {
    this.setPosition(200, 220);
    this.setActive(true);
    this.setVisible(true);
  }

  moveToSecondSpot() {
    this.setPosition(600, 220);
    this.setActive(true);
    this.setVisible(true);
  }

  moveOffScreen() {
    this.setPosition(700, 700);
    this.setActive(false);
    this.setVisible(false);
  }
}
