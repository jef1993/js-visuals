import React, { useState, useEffect } from "react";
import Canvas from "./Canvas";
import { useTweaks } from "use-tweaks";

const Text = () => {
  const { cell, style } = useTweaks("Text", {
    cell: { value: 20, min: 1, max: 50, step: 1 },
    style: { value: 1, min: 1, max: 2, step: 1 },
  });

  const width = 800;
  const height = 800;
  const fontFamily = "serif";
  const [text, setText] = useState("A");
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numofCells = cols * rows;
  const fontSize = cols;

  document.onkeyup = (e) => {
    setText(e.key);
  };

  const typeCanvas = document.createElement("canvas");
  const typeContext = typeCanvas.getContext("2d");

  typeContext.width = cols;
  typeContext.height = rows;

  useEffect(() => {
    const tweakPanel = document.querySelector(".tp-dfwv");
    if (tweakPanel) tweakPanel.style.transform = "translate(-5px, 60px)";
  });

  const draw = (context) => {
    context.clearRect(0, 0, width, height);
    typeContext.save();
    typeContext.fillStyle = "#000";
    typeContext.fillRect(0, 0, cols, rows);

    typeContext.fillStyle = "white";
    typeContext.font = `${fontSize}px ${fontFamily}`;
    typeContext.textBaseline = "top";
    // typeContext.textAlign = "left";

    const metrics = typeContext.measureText(text);
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const tx = (cols - mw) * 0.5 - mx;
    const ty = (rows - mh) * 0.5 - my;

    // context.save();
    // context.fillStyle = "#eee";
    // context.fillRect(0, 0, width, height);
    // context.restore();

    typeContext.save();
    typeContext.translate(tx, ty);

    typeContext.beginPath();
    typeContext.rect(mx, my, mw, mh);
    typeContext.stroke();

    typeContext.fillText(text, 0, 0);
    typeContext.restore();

    // const newImg = () => {
    //   const img = new Image();
    //   img.src = imgSrc;
    //   return img;
    // };

    // const loadMeImg = (url) => {
    //   return new Promise((rs, rj) => {
    //     const img = new Image();
    //     img.onload = () => rs(img);
    //     img.onerror = () => rj();
    //     img.src = url;
    //   });
    // };

    // const start = async () => {
    //   const img = await loadMeImg(imgSrc);
    //   console.log("image width", img.width);
    //   console.log("this line");
    // };

    // console.log(newImg().width);

    const typeData = typeContext.getImageData(0, 0, cols, rows).data;

    for (let i = 0; i < numofCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cell;
      const y = row * cell;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];

      context.fillStyle = `rgba(${r}, ${g}, ${b})`;

      context.save();
      context.translate(x, y);
      context.beginPath();

      if (style === 1) {
        context.rect(0, 0, cell, cell);
      } else {
        context.translate(cell / 2, cell / 2);
        context.arc(0, 0, cell / 2, 0, 2 * Math.PI);
      }
      context.fill();

      context.restore();
    }
  };

  return <Canvas classes="text" width={width} height={height} draw={draw} />;
};

export default Text;
