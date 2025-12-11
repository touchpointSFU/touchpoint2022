import React, { useEffect, useRef } from "react";
import * as twgl from "twgl.js";
//@ts-ignore
import OVERLAY_FRAG from "./Overlay.frag";
//@ts-ignore
import OVERLAY_VERT from "./Overlay.vert";

interface Props {
  children?: React.ReactNode;
}

import { m3 } from "./m3";

export const EffectOverlay = ({ children }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  const pixelRatio = React.useMemo(() => {
    if (typeof window !== "undefined")
      return Math.min(1.5, window.devicePixelRatio);
    return 1;
  }, []);

  // update logic and draw
  useEffect(() => {
    // setup the canvas here
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const gl = canvas.getContext("webgl") as WebGLRenderingContext;
    const program = twgl.createProgramFromSources(gl, [
      OVERLAY_VERT,
      OVERLAY_FRAG,
    ]);
    const programInfo = twgl.createProgramInfoFromProgram(gl, program);

    const arrays = {
      a_position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
    };

    const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

    function update(time: number) {
      // update the logic here
    }

    function render(time: number) {
      twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

      const uniforms = {
        u_time: time * 0.001,
        u_resolution: [gl.canvas.width, gl.canvas.height],
        u_mouse: [mousePos.current.x, mousePos.current.y],
        u_scroll: window.scrollY,
      };

      gl.useProgram(programInfo.program);
      twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
      twgl.setUniforms(programInfo, uniforms);
      twgl.drawBufferInfo(gl, bufferInfo);
    }

    function nextFrame(time: number) {
      update(time);
      render(time);
      requestAnimationFrame(nextFrame);
    }
    requestAnimationFrame(nextFrame);
  }, []);

  // update mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="fixed h-full w-full" />
      {children}
    </>
  );
};
