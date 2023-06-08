import React from "react";
import Board from "../Board/Board";

type Props = {};

const Container = (props: Props) => {
  const [color, setColor] = React.useState<string>("#000000");
  const [stroke, setStroke] = React.useState<number>(1);
  const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };
  const handleChangeStroke = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStroke(parseInt(e.target.value));
  };
  return (
    <div className="container">
      <div className="toolbar">
        <div className="color-picker-container">
          <p>Change color:</p>
          <input type="color" onChange={handleChangeColor} />
        </div>
        <div className="stroke-container">
          <p>Change stroke:</p>
          <input
            type="range"
            min={"0"}
            max={"10"}
            onChange={handleChangeStroke}
          />
        </div>
      </div>

      <div className="board-container">
        <Board color={color} stroke={stroke}></Board>
      </div>
    </div>
  );
};

export default Container;
