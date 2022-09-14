import React, { useState, useEffect } from "react";

const Panel = () => {
  const [showPanel, setShowPanel] = useState(false);

  const showPanelHandler = () => {
    setShowPanel((prev) => !prev);
  };

  useEffect(() => {
    const tweakPanel = document.querySelector(".tp-dfwv");
    if (tweakPanel) tweakPanel.style.display = showPanel ? "initial" : "none";
  }, [showPanel]);

  return (
    <>
      <button
        className={`panel__btn${showPanel ? " active" : ""}`}
        onClick={showPanelHandler}
      >
        Panel
      </button>
      <div id="panel" className="panel__panel"></div>
    </>
  );
};

export default Panel;
