import React, { useState } from "react";
import Canvas from "./Canvas";
import { range } from "canvas-sketch-util/random";

const limiter = (value, min = 0.3) => {
  return Math.abs(value) < min ? (value < 0 ? -min : min) : value;
};
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  getDistance(x, y) {
    const dx = this.x - x;
    const dy = this.y - y;
    return Math.sqrt(dx ** 2 + dy ** 2);
  }
}

class Agent {
  constructor(
    x,
    y,
    radius = range(5, 20),
    velocity = new Vector(range(-1.5, 1.5), range(-1.5, 1.5))
  ) {
    this.pos = new Vector(x, y);
    this.velocity = limiter(velocity);
    this.radius = radius;
    this.lineWidth = 5;
  }

  translateCoor(coor, max) {
    const totalRadius = this.radius + this.lineWidth;
    if (coor <= totalRadius) return totalRadius;
    if (coor >= max - totalRadius) return max - totalRadius;
    return coor;
  }
  draw(context, width, height) {
    context.save();
    context.translate(
      this.translateCoor(this.pos.x, width),
      this.translateCoor(this.pos.y, height)
    );
    context.lineWidth = this.lineWidth;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();
    context.restore();
  }
  update() {
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
  }
  bounce(width, height) {
    const calcBounce = (coor, maxValue) => {
      const totalRadius = this.radius + this.lineWidth;
      if (this.pos[coor] <= 0 + totalRadius) {
        this.velocity[coor] = Math.abs(this.velocity[coor]);
        return;
      }
      if (this.pos[coor] > maxValue - totalRadius) {
        this.velocity[coor] = -Math.abs(this.velocity[coor]);
        return;
      }

      if (Math.abs(this.velocity[coor]) < 0.15)
        this.velocity[coor] = limiter(this.velocity[coor]);
    };

    calcBounce("x", width);
    calcBounce("y", height);
  }
}

const AnimatedLines = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight - 100);

  window.onresize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight - 100);
  };

  const count = 50;
  const xRange = () => range(0, width);
  const yRange = () => range(0, height);
  const agents = Array(count)
    .fill("")
    .map((el) => new Agent(xRange(), yRange()));

  const draw = (context, canvas) => {
    context.save();
    context.fillStyle = "#fff";
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];

      // const nextAgent = i < agents.length - 1 ? agents[i + 1] : agents[0];
      // context.beginPath();
      // context.moveTo(agent.x, agent.y);
      // context.lineTo(nextAgent.x, nextAgent.y);
      // context.stroke();

      for (let j = i + 1; j < agents.length; j++) {
        const others = agents[j];

        const dist = agent.pos.getDistance(others.pos.x, others.pos.y);
        const maxDist = 300;
        console.log();

        if (dist < maxDist) {
          context.beginPath();
          context.lineWidth = maxDist / 50 - dist / 50;
          context.moveTo(agent.pos.x, agent.pos.y);
          context.lineTo(others.pos.x, others.pos.y);
          context.stroke();
        }
      }
    }

    agents.forEach((agent) => {
      agent.update();
      agent.bounce(canvas.width, canvas.height);
      agent.draw(context, canvas.width, canvas.height);
    });
  };

  return (
    <Canvas draw={draw} classes="animation" animated={true} fullscreen={true} />
  );
};

export default AnimatedLines;
