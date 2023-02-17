import Phaser from "phaser";
import HigherLowerGameItem from "./HigherLowerGameItem";

export default class HigherLowerGameItems extends Phaser.GameObjects.Group {
  gameItemsOnScreen: HigherLowerGameItem[] = [];
  gameItems: Array<{
    texture: string;
    value: number;
  }>;

  constructor(
    scene: Phaser.Scene,
    gameItems: Array<{
      texture: string;
      value: number;
    }>
  ) {
    super(scene);
    this.gameItems = gameItems;
    this.initiate();
  }

  initiate() {
    this.addGameItems();
    this.initializeGameItems();
    this.generateItemsOnScreen();
  }

  addGameItems() {
    for (const gameItem of this.gameItems) {
      this.add(
        new HigherLowerGameItem(
          this.scene,
          700,
          700,
          gameItem.texture,
          gameItem.value
        )
      );
    }
    // this.addMultiple([
    //   new HigherLowerGameItem(this.scene, 700, 700, "1din", 1),
    //   new HigherLowerGameItem(this.scene, 700, 700, "2din", 2),
    //   new HigherLowerGameItem(this.scene, 700, 700, "5din", 5),
    //   new HigherLowerGameItem(this.scene, 700, 700, "10din", 10),
    //   new HigherLowerGameItem(this.scene, 700, 700, "20din", 20),
    //   new HigherLowerGameItem(this.scene, 700, 700, "10din-paper", 10),
    //   new HigherLowerGameItem(this.scene, 700, 700, "20din-paper", 20),
    //   new HigherLowerGameItem(this.scene, 700, 700, "100din-paper", 100),
    //   new HigherLowerGameItem(this.scene, 700, 700, "200din-paper", 200),
    //   new HigherLowerGameItem(this.scene, 700, 700, "500din-paper", 500),
    // ]);
  }

  initializeGameItems() {
    this.getChildren().forEach((gameItem: Phaser.GameObjects.GameObject) => {
      gameItem as HigherLowerGameItem;
    });
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
