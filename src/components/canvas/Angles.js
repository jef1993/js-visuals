import Canvas from "./Canvas";
import { degToRad } from "canvas-sketch-util/math";
import { range } from "canvas-sketch-util/random";

const Angles = () => {
  const width = 1080;
  const height = (width * 9) / 16;

  const deg = (degree) => {
    return (degree / 180) * Math.PI;
  };

  const draw = (context) => {
    context.save();
    context.fillStyle = "#fff";
    context.fillRect(0, 0, width, height);

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.15;
    const radius = width * 0.15;

    const count = 12;

    for (let i = 0; i < count; i++) {
      const angle = degToRad(360 / count) * i;
      const x = cx + radius * Math.sin(angle);
      const y = cy + radius * Math.cos(angle);
      const scale = 0.2 + (0.8 / count) * i;

      setTimeout(() => {
        context.save();
        context.translate(x, y);
        context.rotate(-angle);
        context.scale(range(5, 10) / 10, scale);

        context.beginPath();
        context.fillStyle = "#000";
        context.fillRect(-w * 0.5, -w * 0.5, w, h);
        context.restore();
      }, (count - i) * 100);

      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      context.beginPath();

      context.restore();
    }
  };
  return <Canvas classes="angles" width={width} height={height} draw={draw} />;
};

export default Angles;
