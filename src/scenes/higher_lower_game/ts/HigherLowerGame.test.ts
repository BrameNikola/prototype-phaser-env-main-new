import Phaser from "phaser";
import HigherLowerGame from "./HigherLowerGame";
import HigherLowerGameItem from "./HigherLowerGameItem";

describe("HigherLowerGame", () => {
  let game: HigherLowerGame;

  beforeEach(() => {
    game = new HigherLowerGame();
    game.create();
  });

  test("handleMouseUp increases score if selected item has greater value", () => {
    const gameObject = new HigherLowerGameItem(game, 0, 0, "10din", 10);
    gameObject.value = 20;
    game.gameItems.gameItemsOnScreen = [gameObject];
    game.handleMouseUp({} as Phaser.Input.Pointer, gameObject);
    expect(game.score).toBe(1);
  });

  test("handleMouseUp does not increase score if selected item has lower value", () => {
    const gameObject = new HigherLowerGameItem(game, 0, 0, "10din", 10);
    gameObject.value = 5;
    game.gameItems.gameItemsOnScreen = [gameObject];
    game.handleMouseUp({} as Phaser.Input.Pointer, gameObject);
    expect(game.score).toBe(0);
  });

  test("handleMouseDown sets tint and scale of gameObject", () => {
    const gameObject = new HigherLowerGameItem(game, 0, 0, "10din", 10);
    game.handleMouseDown({} as Phaser.Input.Pointer, gameObject);
    expect(gameObject.tintTopLeft).toBe(0xdddddd);
    expect(gameObject.scaleX).toBe(0.28);
    expect(gameObject.scaleY).toBe(0.28);
  });

  test("handleMouseOut clears tint and resets scale of gameObject", () => {
    const gameObject = new HigherLowerGameItem(game, 0, 0, "10din", 10);
    gameObject.setTint(0xdddddd);
    gameObject.setScale(0.28);
    game.handleMouseOut({} as Phaser.Input.Pointer, gameObject);
    expect(gameObject.tintTopLeft).toBe(0xffffff);
    expect(gameObject.scaleX).toBe(0.3);
    expect(gameObject.scaleY).toBe(0.3);
  });

  test("restartGame restarts the game when game is over", () => {
    game.gameOver = true;
    game.restartGame();
    expect(game.gameOver).toBe(false);
  });
});
