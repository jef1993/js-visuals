import { useRef, useEffect } from "react";

const Canvas = ({
  width = 600,
  height = 600,
  draw,
  classes,
  animated = false,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const animate = () => {
        if (context && animated) {
          draw(context);
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, []);

  return (
    <canvas
      className={`canvas${classes ? " " + classes : ""}`}
      width={width}
      height={height}
      ref={canvasRef}
    ></canvas>
  );
};
export default Canvas;
