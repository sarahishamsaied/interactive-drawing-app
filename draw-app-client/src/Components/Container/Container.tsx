import React from "react";
import Board from "../Board/Board";

type Props = {};

const Container = (props: Props) => {
  const [color, setColor] = React.useState<string>("#000000");
  const [stroke, setStroke] = React.useState<number>(1);
  const [activeCursor, setActiveCursor] =
    React.useState<string>("pencil-cursor");
  const [strokeMenuClicked, setStrokeMenuClicked] =
    React.useState<boolean>(false);
  const [clearClicked, setClearClicked] = React.useState<boolean>(false);
  const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };
  const handleChangeStroke = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStroke(parseInt(e.target.value));
  };
  const handleStrokeMenuClick = () => {
    setStrokeMenuClicked(!strokeMenuClicked);
  };
  const handleAddText = () => {
    setActiveCursor("text-cursor");
  };

  return (
    <div className="container">
      <div className="appbar">
        <img src="pencils.png" alt="logo" className="logo" />
        <h3 className="title">Draw App</h3>
      </div>
      <div className="toolbar">
        <h3>Toolbar</h3>
        <div className="color-picker-container">
          <input type="color" onChange={handleChangeColor} />
        </div>
        <div className="pencil-icon icon">
          <img
            src="pencil.png"
            alt="pencil"
            onClick={() => setActiveCursor("pencil-cursor")}
          />
        </div>
        <div className="stroke-container icon" onClick={handleStrokeMenuClick}>
          <img src="stroke.png" alt="stroke" className="strokeIcon" />
        </div>
        <div onClick={() => setClearClicked(!clearClicked)}>
          <img src="closed.png" alt="clear" className="clearIcon icon" />
        </div>
        <div className="eraser-container icon">
          <img
            src="eraser.png"
            alt=""
            className="eraserIcon"
            onClick={() => setActiveCursor("eraser-cursor")}
          />
        </div>
        <div className="eraser-container icon">
          <img
            src="font.png"
            alt=""
            className="eraserIcon"
            onClick={() => setActiveCursor("text-cursor")}
          />
        </div>
        {strokeMenuClicked && (
          <div className="stroke-menu">
            <input
              type="range"
              min="1"
              max="70"
              value={stroke}
              onChange={handleChangeStroke}
            />
          </div>
        )}
      </div>

      <div className="board-container">
        <Board
          color={color}
          stroke={stroke}
          clear={clearClicked}
          setClearClicked={setClearClicked}
          activeCursor={activeCursor}
        ></Board>
      </div>
    </div>
  );
};

export default Container;
