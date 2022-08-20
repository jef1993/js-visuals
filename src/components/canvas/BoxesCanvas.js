import { useRef, useEffect } from "react";

const BoxesCanvas = ({
  padding = 50,
  gap = 20,
  borderWidth = 4,
  width = 600,
  height = 600,
  rowBoxCount = 10,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");

    const boxSize = (width - padding) / rowBoxCount - gap;
    const canvasXCount = rowBoxCount;
    const canvasYCount = Math.floor((rowBoxCount * height) / width);
    let counter = 0;
    const randomXNum = () => Math.floor(Math.random() * canvasXCount);
    const randomYNum = () => Math.floor(Math.random() * canvasYCount);

    const fill = context.createLinearGradient(0, 0, width, height);
    fill.addColorStop(0, `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`);
    fill.addColorStop(1, `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`);

    for (let i = 0; i < canvasYCount; i++) {
      for (let j = 0; j < canvasXCount; j++) {
        setTimeout(() => {
          context.beginPath();
          context.lineWidth = borderWidth;
          context.rect(
            (boxSize + gap) * j + padding,
            (boxSize + gap) * i + padding,
            boxSize,
            boxSize
          );
          context.stroke();
        }, (2 / (canvasXCount * canvasYCount)) * 1000 * (i + j));
        (j === randomXNum() || i === randomYNum()) &&
          setTimeout(() => {
            context.fillStyle = `hsl(${Math.floor(
              Math.random() * 360
            )}, 100%, 70%)`;
            context.fillRect(
              (boxSize + gap) * j + padding + 10,
              (boxSize + gap) * i + padding + 10,
              boxSize - 20,
              boxSize - 20
            );

            context.beginPath();
            context.lineWidth = borderWidth / 2;
            context.rect(
              (boxSize + gap) * j + padding + 10,
              (boxSize + gap) * i + padding + 10,
              boxSize - 20,
              boxSize - 20
            );

            context.stroke();
          }, (1 / (canvasXCount * canvasYCount)) * 1000 * counter + 500);

        counter++;
      }
    }

    return context.clearRect(0, 0, canvas.width, canvas.height);
  }, [padding, gap, borderWidth, height, width, rowBoxCount]);

  return (
    <canvas className="canvas" width={width} height={height} ref={ref}></canvas>
  );
};
export default BoxesCanvas;
