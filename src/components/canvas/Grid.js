import Canvas from "./Canvas";
import { random, math } from "canvas-sketch-util";

const Grid = () => {
  const width = 800;
  const height = 600;
  const cols = 10;
  const rows = 8;
  const numCells = cols * rows;
  const gridw = width * 0.8;
  const gridh = height * 0.8;
  const cellw = gridw / cols;
  const cellh = gridh / rows;
  const marginX = (width - gridw) * 0.5;
  const marginY = (height - gridh) * 0.5;

  let frame = 0;
  const randomH = random.range(0, random.range(120, 720));
  console.log(randomH);

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

      const n = random.noise2D(x + frame * 4, y, 0.001);
      const angle = n * Math.PI * 0.2;
      const scale = math.mapRange(n, -1, 1, 1, 50);
      const zeroTo100 = math.mapRange(n, -1, 1, 0, 100);
      const randomS = math.mapRange(n, -1, 1, 50, 100);
      //   console.log(lightness);

      context.save();
      context.strokeStyle = `hsl(${
        zeroTo100 * 3.6 + randomH
      }, ${randomS}%, ${zeroTo100}%)`;
      context.lineWidth = scale;
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

  return <Canvas height={height} width={width} draw={draw} animated={true} />;
};

export default Grid;
