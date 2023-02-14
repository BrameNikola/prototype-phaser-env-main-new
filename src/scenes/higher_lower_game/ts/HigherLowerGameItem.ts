import Phaser from "phaser";

export default class HigherLowerGameItem extends Phaser.GameObjects.Sprite {
  value: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    value: number
  ) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    this.value = value;
    this.setScale(0.3);
    this.moveOffScreen();
  }

  moveToSpot(x: number, y: number) {
    this.setPosition(x, y);
    this.setActive(true);
    this.setVisible(true);
  }

  moveToFirstSpot() {
    this.moveToSpot(200, 220);
  }

  moveToSecondSpot() {
    this.moveToSpot(600, 220);
  }

  moveOffScreen() {
    this.setPosition(700, 700);
    this.setActive(false);
    this.setVisible(false);
  }
}
