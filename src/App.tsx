import React from "react";
import "./App.css";
import DropDown from "./components/DropDown";
import Form from "./components/Form";
import { useState } from "react";
import GameMode from "./scenes/higher_lower_game/ts/HigherLowerGameEnum";

export let fakeJson = JSON.stringify({
  gameObjects: [
    { texture: "1din", value: 1 },
    { texture: "2din", value: 2 },
    { texture: "5din", value: 5 },
    { texture: "10din", value: 10 },
    { texture: "20din", value: 20 },
    { texture: "10din-paper", value: 10 },
    { texture: "20din-paper", value: 20 },
    { texture: "100din-paper", value: 100 },
    { texture: "200din-paper", value: 200 },
    { texture: "500din-paper", value: 500 },
  ],
  gameMode: GameMode.classic,
});

const App = (props: any) => {
  const [gameMode, setGameMode] = useState("classic");

  const handleSelect = (event: React.FormEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    console.log(newValue);
    setGameMode(newValue);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newJson = JSON.stringify({
      gameObjects: [
        { texture: "1din", value: 1 },
        { texture: "2din", value: 2 },
        { texture: "5din", value: 5 },
        { texture: "10din", value: 10 },
        { texture: "20din", value: 20 },
        { texture: "10din-paper", value: 10 },
        { texture: "20din-paper", value: 20 },
        { texture: "100din-paper", value: 100 },
        { texture: "200din-paper", value: 200 },
        { texture: "500din-paper", value: 500 },
      ],
      gameMode: gameMode,
    });
    console.log(newJson);
    console.log(props.game);
    fakeJson = newJson;
    props.game.scene.start("MainGame");
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <DropDown
          handleChange={handleSelect}
          label={"Game Mode:"}
          key={"gameMode"}
          items={["classic", "timed", "targeted", "targetTimedHybrid"]}
        />
      </Form>
    </div>
  );
};

export default App;
