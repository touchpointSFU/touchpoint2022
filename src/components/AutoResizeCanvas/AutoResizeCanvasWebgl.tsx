import React, { MutableRefObject, useEffect, useRef, useState } from "react";

type Props = {
  onRender?: (
    canvas: HTMLCanvasElement,
    gl: WebGLRenderingContext,
    delta: number
  ) => void;
  onInit?: (
    canvas: HTMLCanvasElement,
    gl: WebGLRenderingContext
  ) => Promise<any>;
  onResize?: (width: number, height: number) => void;
};

function AutoResizeCanvasWebgl({ onRender, onInit, onResize }: Props) {
  const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>;
  const [canvasSize, setCanvasSize] = useState({ width: 300, height: 300 });
  const gl = useRef() as MutableRefObject<WebGLRenderingContext>;
  const [hasInit, setHasInit] = useState(false);

  // context and loop
  useEffect(() => {
    // setup canvas
    gl.current = canvasRef.current.getContext("webgl") as WebGLRenderingContext;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const width = canvasRect.width;
    const height = canvasRect.height;
    gl.current.viewport(0, 0, width, height);

    let currentAnimationFrameNumber = 0;
    let isRendering = true;

    async function init() {
      // init
      onInit && (await onInit(canvasRef.current, gl.current));
      setHasInit(true);

      let lastFrameTime = 0;
      function updateFrame(currentFrameTime: number) {
        const delta = currentFrameTime - lastFrameTime;
        lastFrameTime = currentFrameTime;

        canvasRef.current &&
          gl.current &&
          onRender &&
          onRender(canvasRef.current, gl.current, delta);

        currentAnimationFrameNumber = requestAnimationFrame(updateFrame);
      }
      currentAnimationFrameNumber = requestAnimationFrame(updateFrame);
    }
    init();

    // clean up
    return () => {
      cancelAnimationFrame(currentAnimationFrameNumber);
    };
  }, []);

  useEffect(() => {
    if (!hasInit) return;

    function handleResize() {
      // instead of window size, use the canvas size to drive the value
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const width = canvasRect.width;
      const height = canvasRect.height;

      // handle window resize
      setCanvasSize({
        width: width,
        height: height,
      });

      gl.current.viewport(0, 0, width, height);

      onResize && onResize(width, height);
    }
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [hasInit]);

  return (
    <canvas
      className="w-full h-full"
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
    />
  );
}

export default AutoResizeCanvasWebgl;
