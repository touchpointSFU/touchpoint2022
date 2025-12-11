import React, { MutableRefObject, useEffect, useRef, useState } from "react";

type Props = {
  onRender?: (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    delta: number
  ) => void;
  onInit?: (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) => Promise<any>;
  onResize?: (width: number, height: number) => void;
};

function AutoResizeCanvas({ onRender, onInit, onResize }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 300, height: 300 });
  const context = useRef<CanvasRenderingContext2D>(null);
  const [hasInit, setHasInit] = useState(false);

  // context and loop
  useEffect(() => {
    // setup canvas
    if (!canvasRef.current) {
      console.log("no canvas");
      return;
    }
    context.current = canvasRef.current.getContext(
      "2d"
    ) as CanvasRenderingContext2D;

    async function init() {
      // init
      console.log("init");
      if (!canvasRef.current || !context.current) {
        console.log("no canvas or context");
        return;
      }
      onInit && (await onInit(canvasRef.current, context.current));
      setHasInit(true);

      let previousFrameTime = 0;
      function updateFrame(currentFrameTime: number) {
        const delta = (currentFrameTime - previousFrameTime) / 1000;
        previousFrameTime = currentFrameTime;
        canvasRef.current &&
          context.current &&
          onRender &&
          onRender(canvasRef.current, context.current, delta);
        requestAnimationFrame(updateFrame);
      }
      requestAnimationFrame(updateFrame);
    }
    init();
  }, []);

  useEffect(() => {
    if (!hasInit) return;

    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // handle window resize
      setCanvasSize({
        width: width,
        height: height,
      });

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
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
    />
  );
}

export default AutoResizeCanvas;
