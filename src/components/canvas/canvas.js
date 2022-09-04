import { useRef, useEffect, useState } from "react";
import Whammy from "react-whammy";

const Canvas = ({
  width,
  height,
  draw,
  classes,
  animated = false,
  fullscreen = false,
}) => {
  const canvasRef = useRef(null);
  const requestRef = useRef();
  const [savedCanvas, setSavedCanvas] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isCompiling, setIsCompiling] = useState(false);
  const [recordedFrames, setRecordedFrames] = useState(null);
  const isDownloading = isCompiling || recordedFrames;

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      setSavedCanvas(canvas);
      const context = canvas.getContext("2d");
      draw(context, canvas);
      const animate = () => {
        if (context && animated) {
          draw(context, canvas);
          requestRef.current = requestAnimationFrame(animate);
        }
      };

      if (animated) {
        if (isPlaying) {
          requestRef.current = requestAnimationFrame(animate);
          if (fullscreen) {
            const handleResize = () => {
              context.canvas.width = window.innerWidth;
              context.canvas.height = window.innerHeight - 100;
              requestAnimationFrame(draw.bind(null, context, canvas));
            };
            handleResize();
            window.onresize = handleResize;
          }
        } else {
          requestRef.current = requestAnimationFrame(
            draw.bind(null, context, canvas)
          );
        }
      }
    }

    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying]);

  const recordVideo = async (duration = 3000, fps = 24) => {
    if (savedCanvas) {
      const totalFrames = (duration * fps) / 1000;
      const encoder = new Whammy.Video(fps);
      // const addFrame = setInterval(() => {
      //   encoder.add(savedCanvas);
      //   console.log(encoder);
      //   setRecordedFrames(encoder.frames.length);
      // }, 1000 / fps);

      for (let i = 0; i < totalFrames; i++) {
        setTimeout(() => {
          encoder.add(savedCanvas);
          console.log(encoder);
          setRecordedFrames(encoder.frames.length);
        }, (i * 1000) / fps);
      }
      setTimeout(() => {
        // clearInterval(addFrame);
        setRecordedFrames(0);
        setIsCompiling(true);
        encoder.compile(false, (output) => {
          setIsCompiling(false);
          const url = URL.createObjectURL(output);
          const anchor = document.createElement("a");
          anchor.href = url;
          anchor.download = "video.mp4";
          anchor.click();
          window.URL.revokeObjectURL(url);
        });
      }, duration);
    }
  };

  const playAnimationHandler = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <>
      <canvas
        className={`canvas${classes ? " " + classes : ""}`}
        width={width}
        height={height}
        ref={canvasRef}
      ></canvas>
      {animated && (
        <>
          <button
            className={`btn--download`}
            type="button"
            onClick={recordVideo.bind(null, 3000, 24)}
            disabled={isDownloading}
          >
            {recordedFrames > 0
              ? `${Math.ceil((recordedFrames / (24 * 3)) * 100)}%`
              : isCompiling
              ? "Compiling"
              : "Download Video"}
          </button>
          <button className="btn--play" onClick={playAnimationHandler}>
            {isPlaying ? "Pause" : "Play"}
          </button>
        </>
      )}
    </>
  );
};
export default Canvas;
