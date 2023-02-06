import Phaser from "phaser";
import HigherLowerGameItem from "./HigherLowerGameItem";

export default class HigherLowerGameItems extends Phaser.GameObjects.Group {
  gameItemsOnScreen: Array<HigherLowerGameItem>;

  constructor(scene: Phaser.Scene) {
    super(scene);
    this.gameItemsOnScreen = [];
  }

  initiate() {
    this.addMultiple([
      new HigherLowerGameItem(this.scene, 700, 700, "1din", 1),
      new HigherLowerGameItem(this.scene, 700, 700, "2din", 2),
      new HigherLowerGameItem(this.scene, 700, 700, "5din", 5),
      new HigherLowerGameItem(this.scene, 700, 700, "10din", 10),
      new HigherLowerGameItem(this.scene, 700, 700, "20din", 20),
      new HigherLowerGameItem(this.scene, 700, 700, "10din-paper", 10),
      new HigherLowerGameItem(this.scene, 700, 700, "20din-paper", 20),
      new HigherLowerGameItem(this.scene, 700, 700, "100din-paper", 100),
      new HigherLowerGameItem(this.scene, 700, 700, "200din-paper", 200),
      new HigherLowerGameItem(this.scene, 700, 700, "500din-paper", 500),
    ]);

    for (let i = 0; i < this.getChildren().length; i++) {
      let gameitem = this.getChildren()[i] as HigherLowerGameItem;
      gameitem.initiate();
    }

    this.generateItemsOnScreen();
  }

  generateItemsOnScreen() {
    if (!this.gameItemsOnScreen[0]) {
      this.gameItemsOnScreen[0] = this.getChildren().at(
        Phaser.Math.Between(0, this.getChildren().length - 1)
      ) as HigherLowerGameItem;
    } else {
      this.gameItemsOnScreen[0].moveOffScreen();
      this.gameItemsOnScreen[0] = this.gameItemsOnScreen[1];
    }
    while (true) {
      this.gameItemsOnScreen[1] = this.getChildren().at(
        Phaser.Math.Between(0, this.getChildren().length - 1)
      ) as HigherLowerGameItem;
      if (this.gameItemsOnScreen[0].value !== this.gameItemsOnScreen[1].value) {
        break;
      }
    }
    this.gameItemsOnScreen[0].moveToFirstSpot();
    this.gameItemsOnScreen[1].moveToSecondSpot();
  }
}
