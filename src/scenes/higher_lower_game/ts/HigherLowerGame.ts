import HigherLowerGameItems from "./HigherLowerGameItems";
import HigherLowerGameItem from "./HigherLowerGameItem";

export default class HigherLowerGame extends Phaser.Scene {
  constructor() {
    super("MainGame");
  }

  preload() {
    this.load.image("background", "background.png");
    this.load.image("1din", "assets/1-din.png");
    this.load.image("2din", "assets/2-din.png");
    this.load.image("5din", "assets/5-din.png");
    this.load.image("10din", "assets/10-din.png");
    this.load.image("20din", "assets/20-din.png");
    this.load.image("10din-paper", "assets/10-din-paper.png");
    this.load.image("20din-paper", "assets/20-din-paper.png");
    this.load.image("100din-paper", "assets/100-din-paper.png");
    this.load.image("200din-paper", "assets/200-din-paper.png");
    this.load.image("500din-paper", "assets/500-din-paper.png");
  }

  create() {
    let gameOver = false;
    let score = 0;
    const scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
    });

    const promptText = this.add.text(
      25,
      80,
      "Click on the item you think has bigger value:",
      {
        fontSize: "24px",
      }
    );

    const gameItems = new HigherLowerGameItems(this);
    gameItems.initiate();

    this.input
      .setHitArea(gameItems.getChildren())
      .on(
        "gameobjectup",
        (pointer: Phaser.Input.Pointer, gameObject: HigherLowerGameItem) => {
          if (!gameOver) {
            gameObject.clearTint();
            gameObject.setScale(0.3);
            if (
              gameObject.value > gameItems.gameItemsOnScreen[0].value ||
              gameObject.value > gameItems.gameItemsOnScreen[1].value
            ) {
              score++;
              scoreText.setText("score: " + score);
              gameItems.generateItemsOnScreen();
            } else {
              scoreText.setText("");
              promptText.setText("");
              this.add.text(
                140,
                160,
                "You have failed!\nYour score is: " + score,
                {
                  fontSize: "50px",
                  color: "#f00",
                }
              );
              gameOver = true;
            }
          }
        }
      );

    this.input
      .setHitArea(gameItems.getChildren())
      .on(
        "gameobjectout",
        (pointer: Phaser.Input.Pointer, gameObject: HigherLowerGameItem) => {
          if (!gameOver) {
            gameObject.clearTint();
            gameObject.setScale(0.3);
          }
        }
      );

    this.input
      .setHitArea(gameItems.getChildren())
      .on(
        "gameobjectdown",
        (pointer: Phaser.Input.Pointer, gameObject: HigherLowerGameItem) => {
          if (!gameOver) {
            gameObject.setTint(0xdddddd);
            gameObject.setScale(0.28);
          }
        }
      );

    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      if (gameOver) {
        this.scene.start("MainGame");
      }
    });
  }
}
