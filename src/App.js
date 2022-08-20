import React, { useState, useEffect } from "react";
import Menu from "./components/Menu/Menu";
import canvasData from "./canvasData";
function App() {
  const [currentCanvasID, setCurrentCanvasID] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const menuHandler = () => {
    setShowMenu((prev) => !prev);
  };

  const canvasSelectHandler = (id) => {
    setShowMenu(false);
    setCurrentCanvasID(id);
  };
  return (
    <div className={`App`}>
      <button
        onClick={menuHandler}
        className={`menu__btn${showMenu ? " active" : ""}`}
      >
        &nbsp;<div className="menu__line"></div>
      </button>
      <Menu onSelect={canvasSelectHandler} isActive={showMenu} />

      {canvasData.map(
        (item, i) =>
          i === currentCanvasID && (
            <div className="ctn" key={item.name}>
              <h1>{item.name}</h1>
              {item.component}
            </div>
          )
      )}
    </div>
  );
}

export default App;
