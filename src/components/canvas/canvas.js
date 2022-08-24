import { useRef, useEffect } from "react";

const Canvas = ({ width = 600, height = 600, draw, classes }) => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");
    draw(context);
  });

  return (
    <canvas
      className={`canvas${classes ? " " + classes : ""}`}
      width={width}
      height={height}
      ref={ref}
    ></canvas>
  );
};
export default Canvas;
