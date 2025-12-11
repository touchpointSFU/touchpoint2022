import { b2World } from "@box2d/core";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import AutoResizeCanvas from "./AutoResizeCanvas";
import {
  initPhysicsSimulation,
  updatePhysicsSimulation,
  updateWallPositions,
} from "./PhysicsSimulation";
import { getWorldSizeInfo, WorldSizeInfo } from "./PhysicsSimulationUtils";

type Props = {};

const PermissionText = {
  ASK_PERMISSION: "Tap to enable gravity.",
  ASK_AGAIN: "Please allow permission to enable gravity.",
  NONE: "",
};

function FloatingCard({}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<b2World>(null);
  const worldObjectsRef = useRef<any>(null);
  const isTouch = useRef<Boolean>(false);

  const [permissionText, setPermissionText] = useState(
    PermissionText.ASK_PERMISSION
  );

  const mouseInputPos = useRef({ x: 0, y: 0 });
  const isMouseDown = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    isMouseDown.current = true;
    isTouch.current = true;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    isMouseDown.current = false;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    mouseInputPos.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isTouch.current) {
      isMouseDown.current = false;
    }
  };
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isTouch.current) {
      isMouseDown.current = true;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isTouch.current) {
      mouseInputPos.current = {
        x: e.clientX,
        y: e.clientY,
      };
    }
  };

  const screenToWorldPos = (wordSizeInfo: WorldSizeInfo, { x = 0, y = 0 }) => {
    if (!containerRef.current) {
      return { x: 0, y: 0 };
    }
    const bounds = containerRef.current.getBoundingClientRect();
    const xRatio = (x - bounds.left + window.scrollX) / bounds.width;
    const yRatio = (y - bounds.top + window.scrollY) / bounds.height;

    const scaledWorldSize = wordSizeInfo.scaled;

    return {
      x: (xRatio - 0.5) * scaledWorldSize.width,
      y: (yRatio - 1) * -scaledWorldSize.height, // remember y is flipped
    };
  };

  const onInit = async (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) => {
    const initialWorldSizeInfo = getWorldSizeInfo(
      window.innerWidth,
      window.innerHeight
    );
    const [word, worldObjects] = await initPhysicsSimulation({
      worldSizeInfo: initialWorldSizeInfo,
    });
    worldObjectsRef.current = worldObjects;
    worldRef.current = word;
  };

  const onRender = (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    delta: number
  ) => {
    const worldSizeInfo = getWorldSizeInfo(canvas.width, canvas.height);
    const mouseWorldPos = screenToWorldPos(
      worldSizeInfo,
      mouseInputPos.current
    );
    if (!worldRef.current || !worldObjectsRef.current) {
      return;
    }
    updatePhysicsSimulation({
      canvas: canvas,
      context: context,
      delta: delta,
      mouseWorldPos: mouseWorldPos,
      isMouseDown: isMouseDown.current,
      world: worldRef.current,
      worldObjects: worldObjectsRef.current,
    });
  };

  const onResize = (width: number, height: number) => {
    updateWallPositions(
      worldObjectsRef.current,
      getWorldSizeInfo(width, height)
    );
  };

  // add accelerometer
  useEffect(() => {
    function handleOrientation(event: DeviceOrientationEvent) {
      // alert("orientation change");

      var beta = event.beta; // In degree in the range [-180,180)
      var gamma = event.gamma; // In degree in the range [-90,90)

      // Because we don't want to have the device upside down
      // We constrain the x value to the range [-90,90]
      if (beta != null && beta > 90) {
        beta = 90;
      }
      if (beta != null && beta < -90) {
        beta = -90;
      }

      const maxGravityX = 200;
      const maxGravityY = 200;

      if (!worldRef.current || !gamma || !beta) return;
      worldRef.current.SetGravity({
        x: (gamma / 90) * maxGravityX,
        y: -(beta / 90) * maxGravityY,
      });
    }

    document.addEventListener("click", () => {
      //@ts-ignore
      if (typeof DeviceOrientationEvent.requestPermission === "function") {
        //@ts-ignore
        DeviceOrientationEvent.requestPermission()
          .then((permissionState: PermissionState) => {
            setPermissionText(PermissionText.NONE);

            if (permissionState === "granted") {
              // window.addEventListener("devicemotion", () => {});
              window.addEventListener(
                "deviceorientation",
                handleOrientation,
                true
              );
            } else {
              setPermissionText(PermissionText.ASK_AGAIN);
            }
          })
          .catch((err: any) => {
            alert("yes");
          });
      } else {
        // handle regular non iOS 13+ devices
      }
    });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="ml-4 mt-2 absolute top-0 left-0">{permissionText}</div>
      <AutoResizeCanvas
        onRender={onRender}
        onInit={onInit}
        onResize={onResize}
      />
    </div>
  );
}

export default FloatingCard;
