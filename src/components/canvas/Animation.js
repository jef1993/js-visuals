import Canvas from "./Canvas";
import { range } from "canvas-sketch-util/random";

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Agent extends Vector {
  constructor(
    x,
    y,
    radius = range(5, 20),
    velocity = new Vector(range(-1.5, 1.5), range(-0.5, 0.5))
  ) {
    super(x, y);
    this.velocity = velocity;
    this.radius = radius;
  }
  draw(context) {
    context.save();
    context.translate(this.x, this.y);
    context.lineWidth = 5;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();
    context.restore();
  }
  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

const Animation = () => {
  const width = window.innerWidth;
  const height = window.innerHeight - 100;
  const count = 100;
  const xRange = () => range(0, width);
  const yRange = () => range(0, height);

  const agents = Array(count)
    .fill("")
    .map((el) => new Agent(xRange(), yRange()));

  const draw = (context) => {
    context.save();
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    agents.forEach((agent) => {
      agent.update();
      agent.draw(context);
    });
  };

  return (
    <Canvas
      draw={draw}
      classes="animation"
      width={width}
      height={height}
      animated={true}
    />
  );
};

export default Animation;
