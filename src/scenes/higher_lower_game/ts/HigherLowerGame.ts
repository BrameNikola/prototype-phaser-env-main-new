import HigherLowerGameItems from "./HigherLowerGameItems";
import HigherLowerGameItem from "./HigherLowerGameItem";
import fetchedJson from "./dummy_json_items/dummy_items.json";
import GameMode from "./HigherLowerGameEnum";
import { fakeJson } from "../../../App";

export default class HigherLowerGame extends Phaser.Scene {
  gameOver!: boolean;
  score!: number;
  scoreText!: Phaser.GameObjects.Text;
  promptText!: Phaser.GameObjects.Text;
  gameItems!: HigherLowerGameItems;
  timer!: number;
  secondaryText!: Phaser.GameObjects.Text;
  timerInterval!: NodeJS.Timer;
  gameMode = GameMode.classic;
  targetAmount!: number;
  targetText!: Phaser.GameObjects.Text;

  constructor() {
    super("MainGame");
  }

  preload() {
    for (const gameObj of fetchedJson.gameObjects) {
      this.load.image(gameObj.texture, `assets/${gameObj.texture}.png`);
    }
  }

  create() {
    clearInterval(this.timerInterval);
    this.gameMode = JSON.parse(fakeJson).gameMode as GameMode;
    this.gameOver = false;
    this.score = 0;

    this.scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
    });

    this.promptText = this.add.text(
      25,
      80,
      "Click on the item you think has bigger value:",
      {
        fontSize: "24px",
      }
    );

    this.gameItems = new HigherLowerGameItems(this, fetchedJson.gameObjects);
    this.gameItems.initiate();

    this.input.setHitArea(this.gameItems.getChildren());
    this.input.on("gameobjectup", this.handleMouseUp, this);
    this.input.on("gameobjectout", this.handleMouseOut, this);
    this.input.on("gameobjectdown", this.handleMouseDown, this);
    this.input.on("pointerdown", this.restartGame, this);

    switch (this.gameMode) {
      case GameMode.timed:
        this.timer = 10;
        this.secondaryText = this.add.text(
          200,
          16,
          "time remaining: " + this.timer,
          {
            fontSize: "32px",
          }
        );
        this.timerInterval = setInterval(() => this.timerCountdown(), 1000);
        break;

      case GameMode.targeted:
        this.targetAmount = 2;
        this.secondaryText = this.add.text(
          200,
          16,
          "target: " + this.targetAmount,
          {
            fontSize: "32px",
          }
        );
        break;

      case GameMode.targetTimedHybrid:
        this.timer = 10;
        this.secondaryText = this.add.text(
          200,
          16,
          "time remaining: " + this.timer,
          {
            fontSize: "32px",
          }
        );
        this.targetAmount = 2;
        this.timerInterval = setInterval(() => this.timerCountdown(), 1000);
        break;
    }
  }

  handleMouseUp(
    pointer: Phaser.Input.Pointer,
    gameObject: HigherLowerGameItem
  ) {
    if (!this.gameOver) {
      gameObject.clearTint();
      gameObject.setScale(0.3);
      if (
        gameObject.value > this.gameItems.gameItemsOnScreen[0].value ||
        gameObject.value > this.gameItems.gameItemsOnScreen[1].value
      ) {
        this.score++;
        this.scoreText.setText("score: " + this.score);
        this.gameItems.generateItemsOnScreen();
        if (
          this.gameMode === GameMode.targeted ||
          this.gameMode === GameMode.targetTimedHybrid
        ) {
          if (this.score >= this.targetAmount) {
            this.handleVictory();
          }
        }
      } else {
        if (this.gameMode === GameMode.timed) {
          this.score--;
          this.scoreText.setText("score: " + this.score);
          this.gameItems.generateItemsOnScreen();
        } else {
          this.handleGameOver();
        }
      }
    }
  }

  handleGameOver() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.scoreText.setText("");
    this.promptText.setText("");
    this.add.text(140, 160, "Game Over!\nYour score is: " + this.score, {
      fontSize: "50px",
      color: "#f00",
    });
    this.gameOver = true;
  }

  handleVictory() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.scoreText.setText("");
    this.promptText.setText("");
    this.add.text(140, 160, "Good Job! You Win!!!", {
      fontSize: "50px",
      color: "#0f0",
    });
    this.secondaryText.setText("");
    this.gameOver = true;
  }

  handleMouseDown(
    pointer: Phaser.Input.Pointer,
    gameObject: HigherLowerGameItem
  ) {
    if (!this.gameOver) {
      gameObject.setTint(0xdddddd);
      gameObject.setScale(0.28);
    }
  }

  handleMouseOut(
    pointer: Phaser.Input.Pointer,
    gameObject: HigherLowerGameItem
  ) {
    if (!this.gameOver) {
      gameObject.clearTint();
      gameObject.setScale(0.3);
    }
  }

  restartGame() {
    if (this.gameOver) {
      this.scene.start("MainGame");
    }
  }

  timerCountdown = () => {
    if (this.timer > 0) {
      this.timer--;
      this.secondaryText.setText("time remaining: " + this.timer);
    } else {
      this.handleGameOver();
    }
  };
}
