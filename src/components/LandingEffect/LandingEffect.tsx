import React, { useEffect, useRef, useContext } from "react";
import { Vec2 } from "curtainsjs";
import * as twgl from "twgl.js";

//@ts-ignore
import CHECKER_FRAG from "./CheckerEffectGL.frag";
//@ts-ignore
import CHECKER_VERT from "./CheckerEffectGL.vert";

import AutoResizeCanvasWebgl from "../AutoResizeCanvas/AutoResizeCanvasWebgl";
import { useReducedMotion } from "framer-motion";

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

const CheckerContext = React.createContext(null);

export const useCheckerContext = () => useContext(CheckerContext);

export function LandingEffect({ children }: { children: React.ReactNode }) {
  const mousePos = useRef(new Vec2(0, 0));
  const noiseOffset = useRef({ x: 0, y: 0 });
  const checkerSize = useRef(10);

  // for accessibility
  const shouldReduceMotion = useReducedMotion();

  // for webgl
  const programInfoRef = useRef<twgl.ProgramInfo>(null);
  const bufferInfoRef = useRef<twgl.BufferInfo>(null);

  const init = async (canvas: HTMLCanvasElement, gl: WebGLRenderingContext) => {
    // init webgl
    const program = twgl.createProgramFromSources(gl, [
      CHECKER_VERT,
      CHECKER_FRAG,
    ]);
    // console.log("program", program);
    programInfoRef.current = twgl.createProgramInfoFromProgram(gl, program);

    const arrays = {
      a_position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
    };
    bufferInfoRef.current = twgl.createBufferInfoFromArrays(gl, arrays);
  };

  const render = (
    canvas: HTMLCanvasElement,
    gl: WebGLRenderingContext,
    delta: number
  ) => {
    if (shouldReduceMotion) {
      // console.log("reduce motion enabled");
      return;
    }
    const noiseXVel = -(mousePos.current.x / canvas.width - 0.5) * 0.05;
    const noiseYVel = (mousePos.current.y / canvas.height - 0.5) * 0.05;
    noiseOffset.current.y += delta * 0.001 + clamp(noiseYVel, -0.7, 0.4);
    noiseOffset.current.x += noiseXVel;

    const uniforms = {
      uResolution: [canvas.width, canvas.height],
      uMouse: [mousePos.current.x, mousePos.current.y],
      uNoiseOffset: [noiseOffset.current.x, noiseOffset.current.y],
      uCheckerSize: checkerSize.current,
    };

    const programInfo = programInfoRef.current;
    const bufferInfo = bufferInfoRef.current;

    if (!programInfo || !bufferInfo) {
      console.log("no programInfo or bufferInfo");
      return;
    }
    gl.useProgram(programInfo.program);
    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
    twgl.setUniforms(programInfo, uniforms);
    twgl.drawBufferInfo(gl, bufferInfo);
    console.log(gl);
  };

  const resize = (width: number, height: number) => {
    const checkSize = width * 0.01;
    const checkSizeClamped = clamp(checkSize, 0, 10); // max size as 10

    checkerSize.current = checkSizeClamped;

    mousePos.current = new Vec2(
      clamp(mousePos.current.x, 0, width),
      clamp(mousePos.current.y, 0, height)
    );
  };

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="w-full h-screen min-h-[16em] text-fluid-medium flex flex-col relative">
      <div className="absolute top-0 left-0 right-0 bottom-0 -z-10">
        <AutoResizeCanvasWebgl
          onRender={render}
          onInit={init}
          onResize={resize}
        />
      </div>
      {children}
    </div>
  );
}
