import React, { useState, useEffect } from "react";
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
}

class Agent extends Vector {
  constructor(
    x,
    y,
    radius = range(5, 20),
    velocity = new Vector(range(-2, 2), range(-2, 2))
  ) {
    super(x, y);
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
      this.translateCoor(this.x, width),
      this.translateCoor(this.y, height)
    );
    context.lineWidth = this.lineWidth;
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
  bounce(width, height) {
    const calcBounce = (coor, maxValue) => {
      const totalRadius = this.radius + this.lineWidth;
      if (
        this[coor] <= 0 + totalRadius ||
        this[coor] >= maxValue - totalRadius
      ) {
        this.velocity[coor] *= -1;
      }
      if (Math.abs(this.velocity[coor]) < 0.3)
        this.velocity[coor] = limiter(this.velocity[coor]);
    };

    calcBounce("x", width);
    calcBounce("y", height);
  }
}

const Animation = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight - 100);
  const [animated, setAnimated] = useState(true);

  window.onresize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight - 100);
  };

  const count = 100;
  const xRange = () => range(0, width);
  const yRange = () => range(0, height);
  const agents = Array(count)
    .fill("")
    .map((el) => new Agent(xRange(), yRange()));

  const draw = (context, canvas) => {
    context.save();
    context.fillStyle = "#ccc";
    context.fillRect(0, 0, canvas.width, canvas.height);

    agents.forEach((agent) => {
      agent.update();
      agent.bounce(canvas.width, canvas.height);
      agent.draw(context, canvas.width, canvas.height);
    });
  };

  return <Canvas draw={draw} classes="animation" animated={animated} />;
};

export default Animation;
