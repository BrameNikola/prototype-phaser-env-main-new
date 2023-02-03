import React from "react";
import logo from "./logo.svg";
import "./App.css";
import phaserGame from "./PhaserGame";
import HelloWorldScene from "./scenes/HelloWorldScene";

const handleClick = () => {
  const scene = phaserGame.scene.keys.helloworld as HelloWorldScene;
  scene.createEmitter();
};

function App() {
  return <div></div>;
}

export default App;
