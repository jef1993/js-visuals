import React, { useRef, useEffect, useState } from "react";
import Whammy from "react-whammy";

const Canvas = ({
  width = 600,
  height = 600,
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
  const [r2Downloading, setR2Downloading] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      setSavedCanvas(canvas);
      const context = canvas.getContext("2d");
      draw(context, canvas);

      if (fullscreen) {
        const handleResize = () => {
          context.canvas.width = window.innerWidth;
          context.canvas.height = window.innerHeight - 100;
          requestAnimationFrame(draw.bind(null, context, canvas));
        };
        handleResize();
        window.onresize = handleResize;
      }

      const animate = () => {
        if (context && animated) {
          draw(context, canvas);
          requestRef.current = requestAnimationFrame(animate);
        }
      };
      if (animated) {
        if (isPlaying) {
          requestRef.current = requestAnimationFrame(animate);
        } else {
          requestRef.current = requestAnimationFrame(
            draw.bind(null, context, canvas)
          );
        }
      }
    }

    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying, draw, animated, fullscreen]);

  const recordVideo = (duration = 3000, fps = 30) => {
    if (savedCanvas) {
      const totalFrames = (duration * fps) / 1000;
      const encoder = new Whammy.Video(fps);
      for (let i = 0; i < totalFrames; i++) {
        setTimeout(() => {
          encoder.add(savedCanvas);
          setRecordedFrames(encoder.frames.length);
        }, (i * 1000) / fps);
      }
      setTimeout(() => {
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

  const recordVideo2 = (duration = 3000, fps = 30) => {
    if (savedCanvas) {
      setR2Downloading(true);
      const videoStream = savedCanvas.captureStream(fps);
      const mediaRecorder = new MediaRecorder(videoStream);
      const chunks = [];
      mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data);
      };
      mediaRecorder.onstop = function (e) {
        const blob = new Blob(chunks, {
          type: "video/mp4",
          videoBitsPerSecond: "300000",
        });
        const videoURL = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = videoURL;
        anchor.download = "video2.mp4";
        anchor.click();
        window.URL.revokeObjectURL(videoURL);
      };
      mediaRecorder.start();
      window.setTimeout(() => {
        mediaRecorder.stop();
        setR2Downloading(false);
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
            onClick={recordVideo.bind(null, 3000, 30)}
            disabled={isDownloading}
            // disabled={r2Downloading}
          >
            {recordedFrames > 0
              ? `${Math.ceil((recordedFrames / (30 * 3)) * 100)}%`
              : isCompiling
              ? "Compiling"
              : "Download Video"}
            {/* {r2Downloading ? "Downloading" : "Download Video"} */}
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
