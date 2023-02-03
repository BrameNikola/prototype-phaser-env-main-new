import Phaser from "phaser";

import HelloWorldScene from "./scenes/HelloWorldScene";
import HigherLowerGame from "./scenes/higher_lower_game/ts/HigherLowerGame";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "phaser-container",
  backgroundColor: "#282c34",
  scale: {
    mode: Phaser.Scale.ScaleModes.RESIZE,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  // physics: {
  //   default: "arcade",
  //   arcade: {
  //     gravity: { y: 200 },
  //   },
  // },
  scene: [HigherLowerGame, HelloWorldScene],
};

export default new Phaser.Game(config);
