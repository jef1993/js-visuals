import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import canvasData from "./canvasData";

function App() {
  const [showMenu, setShowMenu] = useState(false);

  const menuHandler = () => {
    setShowMenu((prev) => !prev);
  };

  const canvasSelectHandler = () => {
    setShowMenu(false);
  };
  return (
    <BrowserRouter>
      <div className={`App`}>
        <button
          onClick={menuHandler}
          className={`menu__btn${showMenu ? " active" : ""}`}
        >
          &nbsp;<div className="menu__line"></div>
        </button>
        <Menu onSelect={canvasSelectHandler} isActive={showMenu} />
        <Routes>
          {canvasData.map((item, i) => (
            <Route
              path={`/${item.name.toLowerCase()}`}
              element={
                <div className="ctn" key={item.name}>
                  <h1>{item.name}</h1>
                  {item.component}
                </div>
              }
            />
          ))}
          <Route
            path="/*"
            element={<Navigate to={canvasData[0].name.toLowerCase()} />}
          />
        </Routes>
        {/* 
        {canvasData.map(
          (item, i) =>
            i === currentCanvasID && (
              <div className="ctn" key={item.name}>
                <h1>{item.name}</h1>
                {item.component}
              </div>
            )
        )} */}
      </div>
    </BrowserRouter>
  );
}

export default App;
