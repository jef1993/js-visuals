import Canvas from "./Canvas";

const Transform = () => {
  const width = 1080;
  const height = 1080;

  const draw = (context) => {
    // save current state e.g. transform
    context.save();
    context.fillStyle = "#eee";
    context.fillRect(0, 0, width, height);

    const x = width * 0.5;
    const y = height * 0.5;
    const w = width * 0.3;
    const h = height * 0.3;

    context.translate(x, y);
    context.rotate(0.5);

    context.fillStyle = "black";
    context.beginPath();
    context.rect(-w / 2, -h / 2, w, h);
    context.fill();
    // reset to previous state
    context.restore();

    context.translate(100, 400);
    context.beginPath();
    context.arc(0, 0, 50, 0, Math.PI * 2);
    context.fill();
  };

  return (
    <Canvas classes="transform" width={width} height={height} draw={draw} />
  );
};
export default Transform;
