import React from "react";
import logo from "./logo.svg";
import "./App.css";
import phaserGame from "./PhaserGame";
import HelloWorldScene from "./scenes/HelloWorldScene";
import DropDown from "./components/DropDown";
import Form from "./components/Form";

const handleClick = () => {
  const scene = phaserGame.scene.keys.helloworld as HelloWorldScene;
  scene.createEmitter();
};

function App() {
  return (
    <div>
      <Form>
        <DropDown
          label={"Game Mode:"}
          key={"gameMode"}
          items={["classic", "timed", "targeted", "targetTimedHybrid"]}
        />
      </Form>
    </div>
  );
}

export default App;
