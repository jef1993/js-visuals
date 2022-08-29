import Canvas from "./Canvas";
import { range } from "canvas-sketch-util/random";

class Point {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
}

class Agent extends Point {
  constructor(x, y, radius) {
    super(x, y);
    this.radius = radius;
  }
  drawDot(context) {
    context.save();
    context.fillStyle = "black";
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }
}

const Dots = () => {
  const width = 800;
  const height = 600;
  const count = 40;

  const draw = (context) => {
    context.save();
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const size = range(5, 20);
        new Agent(
          range(size, width - size),
          range(size, height - size),
          size
        ).drawDot(context);
      }, i * 25);
    }
  };

  return <Canvas draw={draw} classes="objects" width={width} height={height} />;
};

export default Dots;
