import { useRef, useEffect, useState } from "react";

const Canvas = ({ width, height, draw, classes, animated = false }) => {
  const canvasRef = useRef(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  const animate = (context, canvas) => {
    if (context && animated) {
      draw(context, canvas);
      requestAnimationFrame(() => animate(context, canvas));
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      requestAnimationFrame(() => animate(context, canvas));
      const handleResize = (e) => {
        context.canvas.width = window.innerWidth;
        context.canvas.height = window.innerHeight - 100;
      };
      handleResize();
      window.onresize = handleResize;
    }
  }, [animated]);

  return (
    <canvas
      className={`canvas${classes ? " " + classes : ""}`}
      width={width ? width : screenWidth}
      height={height ? height : screenHeight}
      ref={canvasRef}
    ></canvas>
  );
};
export default Canvas;
