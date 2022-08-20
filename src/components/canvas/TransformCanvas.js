import { useRef, useEffect } from "react";

const TransformCanvas = ({ width = 600, height = 600 }) => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");
  }, []);

  return (
    <canvas
      className="canvas transform"
      width={width}
      height={height}
      ref={ref}
    ></canvas>
  );
};
export default TransformCanvas;
