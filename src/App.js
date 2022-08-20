import React, { useState } from "react";
import Menu from "./components/Menu/Menu";
import canvasData from "./canvasData";
function App() {
  const [currentCanvas, setCurrentCanvas] = useState(canvasData[0].name);
  const [showMenu, setShowMenu] = useState(false);

  const menuHandler = () => {
    setShowMenu((prev) => !prev);
  };

  const canvasSelectHandler = (name) => {
    setShowMenu(false);
    setCurrentCanvas(name);
  };
  return (
    <div className="App">
      <button
        onClick={menuHandler}
        className={`menu__btn${showMenu ? " active" : ""}`}
      >
        <div className="menu__line"></div>
      </button>
      <Menu onSelect={canvasSelectHandler} isActive={showMenu} />
      <div className="canvas-ctn">
        {canvasData.map(
          (item, i) =>
            item.name === currentCanvas && (
              <div className="ctn" key={item.name}>
                <h1>{item.name}</h1>
                {item.component}
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default App;
