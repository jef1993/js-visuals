import { useState, useEffect } from "react";
import Canvas from "./Canvas";
import { random, math } from "canvas-sketch-util";
import { useTweaks } from "use-tweaks";

const Grid = () => {
  const { cols, rows, scaleMin, scaleMax } = useTweaks("Grid", {
    cols: { value: 10, min: 2, max: 50, step: 1 },
    rows: { value: 10, min: 2, max: 50, step: 1 },
    scaleMin: { value: 1, min: 1, max: 100, step: 1 },
    scaleMax: { value: 30, min: 1, max: 100, step: 1 },
  });
  const { freq, amp, twoDim, frameRate } = useTweaks("Noise", {
    freq: { value: 0.001, min: -0.01, max: 0.01, step: 0.0005 },
    amp: { value: 0.5, min: 0, max: 1, step: 0.01 },
    twoDim: false,
    frameRate: { value: 3, min: 0, max: 10, step: 0.25 },
  });
  const { lineCap } = useTweaks("Theme", {
    lineCap: { value: 1, min: 1, max: 3, step: 1 },
  });

  useEffect(() => {
    const tweakPanel = document.querySelector(".tp-dfwv");
    if (tweakPanel) tweakPanel.style.transform = "translate(-5px, 60px)";
  });

  const width = 800;
  const height = 600;
  const numCells = cols * rows;
  const gridw = width * 0.8;
  const gridh = height * 0.8;
  const cellw = gridw / cols;
  const cellh = gridh / rows;
  const marginX = (width - gridw) * 0.5;
  const marginY = (height - gridh) * 0.5;

  let frame = 0;
  const randomH = random.range(0, random.range(120, 720));

  const draw = (context) => {
    context.save();
    context.fillStyle = "#fff";
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cellw;
      const y = row * cellh;
      const w = cellw * 0.8;
      const h = cellh * 0.8;

      const n = twoDim
        ? random.noise2D(x + frame * frameRate, y, freq)
        : random.noise3D(x, y, frame * frameRate, freq);
      const angle = n * Math.PI * amp;
      const scale = math.mapRange(n, -1, 1, scaleMin, scaleMax);
      const zeroTo100 = math.mapRange(n, -1, 1, 0, 100);
      const randomS = math.mapRange(n, -1, 1, 50, 100);
      //   console.log(lightness);

      context.save();
      context.strokeStyle = `hsl(${
        zeroTo100 * 3.6 + randomH
      }, ${randomS}%, ${zeroTo100}%)`;
      context.lineWidth = scale;
      context.lineCap =
        lineCap === 1 ? "butt" : lineCap === 2 ? "round" : "sqaure";
      context.translate(x, y);
      context.translate(cellw / 2 + marginX, marginY + cellh / 2);
      context.rotate(angle);

      context.beginPath();
      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);
      context.stroke();
      context.restore();
    }
    frame += 1;
  };

  return (
    <>
      {/* <input
        value={cols}
        onChange={(e) => {
          setCols(e.target.value);
        }}
        step={1}
        min={1}
        max={50}
        type="range"
      ></input>
      <input
        value={rows}
        onChange={(e) => {
          setRows(e.target.value);
        }}
        step={1}
        min={1}
        max={50}
        type="range"
      ></input> */}
      <Canvas height={height} width={width} draw={draw} animated={true} />
    </>
  );
};

export default Grid;
