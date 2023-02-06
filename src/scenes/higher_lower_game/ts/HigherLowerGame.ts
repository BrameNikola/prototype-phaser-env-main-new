import HigherLowerGameItems from "./HigherLowerGameItems";
import HigherLowerGameItem from "./HigherLowerGameItem";

enum GameMode {
  classic,
  timed,
  specific,
}

export default class HigherLowerGame extends Phaser.Scene {
  gameOver!: boolean;
  score!: number;
  scoreText!: Phaser.GameObjects.Text;
  promptText!: Phaser.GameObjects.Text;
  gameItems!: HigherLowerGameItems;
  timer!: number;
  timerText!: Phaser.GameObjects.Text;
  timerInterval!: NodeJS.Timer;
  gameMode = GameMode.timed;

  constructor() {
    super("MainGame");
  }

  preload() {
    const images = [
      "background",
      "1din",
      "2din",
      "5din",
      "10din",
      "20din",
      "10din-paper",
      "20din-paper",
      "100din-paper",
      "200din-paper",
      "500din-paper",
    ];

    for (const image of images) {
      this.load.image(image, `assets/${image}.png`);
    }
  }

  create() {
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

    this.gameItems = new HigherLowerGameItems(this);
    this.gameItems.initiate();

    this.input.setHitArea(this.gameItems.getChildren());
    this.input.on("gameobjectup", this.handleMouseUp, this);
    this.input.on("gameobjectout", this.handleMouseOut, this);
    this.input.on("gameobjectdown", this.handleMouseDown, this);
    this.input.on("pointerdown", this.restartGame, this);

    if (this.gameMode === GameMode.timed) {
      this.timer = 10;
      this.timerText = this.add.text(200, 16, "time remaining: " + this.timer, {
        fontSize: "32px",
      });
      this.timerInterval = setInterval(this.timerCountdown, 1000);
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
      color: "#fff",
    });
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
      this.timerText.setText("time remaining: " + this.timer);
    } else {
      this.handleGameOver();
    }
  };
}
