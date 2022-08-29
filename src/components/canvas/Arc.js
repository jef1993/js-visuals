import Canvas from "./Canvas";
import { degToRad } from "canvas-sketch-util/math";
import { range } from "canvas-sketch-util/random";

const Arc = () => {
  const width = 800;
  const height = (width * 3) / 4;

  const draw = (context) => {
    context.save();
    context.fillStyle = "#fff";
    context.fillRect(0, 0, width, height);

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.15;
    const radius = width * 0.15;

    const count = 20;

    for (let i = 0; i < count; i++) {
      const slice = degToRad(360 / count);
      const angle = slice * i;
      const x = cx + radius * Math.sin(angle);
      const y = cy + radius * Math.cos(angle);
      const scale = 0.2 + (0.8 / count) * i;

      setTimeout(() => {
        context.save();
        context.translate(x, y);
        context.rotate(-angle);
        context.scale(range(0.3, 1.5), range(0.2, 0.4));

        context.beginPath();
        context.fillStyle = "#000";
        context.fillRect(-w * 0.5, -w * 0.5, w, h * range(0.5, 3));
        context.restore();
      }, (count - i) * 50);

      setTimeout(() => {
        context.save();
        context.translate(cx, cy);
        context.rotate(-angle);
        context.arc(
          0,
          0,
          radius * range(1.2, 2),
          slice * range(1, -4),
          slice * range(1, 6)
        );
        context.lineWidth = range(1, 15);
        context.stroke();
        context.beginPath();

        context.restore();
      }, i * 50);
    }
  };
  return <Canvas classes="angles" width={width} height={height} draw={draw} />;
};

export default Arc;
