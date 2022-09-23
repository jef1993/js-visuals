import Canvas from "./Canvas";

const Text = () => {
  const width = 800;
  const height = 800;
  const fontSize = 800;
  const fontFamily = "serif";
  const text = "A";

  const draw = (context) => {
    const metrics = context.measureText(text);
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const x = (width - mw) * 0.5 - mx;
    const y = (height - mh) * 0.5 - my;

    context.save();
    context.fillStyle = "#eee";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";
    context.font = `${fontSize}px ${fontFamily}`;
    // context.textBaseline = "top";
    // context.textAlign = "left";

    context.save();
    context.translate(x, y);
    context.beginPath();
    context.rect(mx, my, mw, mh);
    context.stroke();

    context.fillText(text, 0, 0);
    context.restore();
  };

  return <Canvas classes="text" width={width} height={height} draw={draw} />;
};

export default Text;
