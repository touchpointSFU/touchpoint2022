import { b2MouseJoint, b2MouseJointDef, b2Vec2, b2World } from "@box2d/core";
import { updateDragBoxLogic } from "./DragBox";
import { drawCursor } from "./DrawCursor";
import { drawBox } from "./DrawBox";
import { createPhsyicsObject, PhysicsObject } from "./PhysicsObject";
import {
  Point,
  WorldObjects,
  WorldSizeInfo,
  WORLD_SCALE,
} from "./PhysicsSimulationUtils";
import { loadImages } from "./ImageAssets";

const boxSize = {
  width: 4,
  height: 2,
};

export function updateWallPositions(
  worldObjects: WorldObjects,
  worldSizeInfo: WorldSizeInfo
) {
  // move the walls to the new position
  const { wallLeft, wallRight, wallBottom, wallTop } = worldObjects;
  wallLeft.body.SetTransformXY(
    -worldSizeInfo.scaled.width * 0.5,
    worldSizeInfo.scaled.height / 2,
    0
  );
  wallRight.body.SetTransformXY(
    worldSizeInfo.scaled.width * 0.5,
    worldSizeInfo.scaled.height / 2,
    0
  );
  wallBottom.body.SetTransformXY(0, 0, 0);
  wallTop.body.SetTransformXY(0, worldSizeInfo.scaled.height, 0);
}

const previousWidth = 0;
export function resizeBoxPosition(
  worldObjects: WorldObjects,
  worldSizeInfo: WorldSizeInfo
) {
  // worldObjects.dynamicBox.body.SetTransformXY(worldSizeInfo.scaled.width);
}

export async function initPhysicsSimulation({
  worldSizeInfo,
}: {
  worldSizeInfo: WorldSizeInfo;
}): Promise<[b2World, WorldObjects]> {
  // load images
  const imgs = await loadImages({ landingCover: "landing-card.jpg" });

  // setup here
  const gravity = new b2Vec2(0, -0.5);
  const world = b2World.Create(gravity);
  world.SetAllowSleeping(true);

  const maxStretchingScale = 2;
  const wallThickness = 0;

  const groundBodyObject = createPhsyicsObject(world, {
    x: -worldSizeInfo.scaled.width * 0.5,
    y: 0,
    width: worldSizeInfo.scaled.width,
    height: worldSizeInfo.scaled.height,
    isFixed: true,
    isSensor: true,
    hidden: true,
  });

  const walls = {
    right: createPhsyicsObject(world, {
      x: worldSizeInfo.scaled.width * 0.5,
      y: (worldSizeInfo.scaled.height / 2) * maxStretchingScale,
      width: wallThickness,
      height: worldSizeInfo.scaled.height,
      isFixed: true,
    }),
    left: createPhsyicsObject(world, {
      x: -worldSizeInfo.scaled.width * 0.5,
      y: (worldSizeInfo.scaled.height / 2) * maxStretchingScale,
      width: wallThickness,
      height: worldSizeInfo.scaled.height,
      isFixed: true,
    }),
    top: createPhsyicsObject(world, {
      x: 0,
      y: worldSizeInfo.scaled.height,
      width: worldSizeInfo.scaled.width * maxStretchingScale,
      height: wallThickness,
      isFixed: true,
    }),
    bottom: createPhsyicsObject(world, {
      x: 0,
      y: 0,
      width: worldSizeInfo.scaled.width * maxStretchingScale,
      height: wallThickness,
      isFixed: true,
    }),
  };

  const targetScaleFactor = 2.3;
  const scaleFactor = targetScaleFactor / 100;

  const imageAspectRatio = imgs.landingCover.width / imgs.landingCover.height;
  const boxWdith = scaleFactor * worldSizeInfo.actual.width;
  const boxHeight =
    (scaleFactor / imageAspectRatio) * worldSizeInfo.actual.width;
  console.log(boxWdith);

  const dynamicBox = createPhsyicsObject(
    world,
    {
      x: 0,
      y: worldSizeInfo.scaled.height * 0.6,
      width: boxWdith,
      height: boxHeight,
      angle: 0.1,
      // for fixture
      density: 0.5,
      friction: 0.1,
      restitution: 0.4,
      // mass: 1,
    },
    imgs.landingCover
  );

  // const dynamicBoxBody = dynamicBox.body;
  // dynamicBoxBody.ApplyForceToCenter({ x: 10, y: 0 });

  return [
    world,
    {
      dynamicBox: dynamicBox,
      wallRight: walls.right,
      wallLeft: walls.left,
      wallTop: walls.top,
      wallBottom: walls.bottom,
      groundBody: groundBodyObject,
    },
  ];
}

interface PhysicsSimulationState {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  delta: number;
  mouseWorldPos: { x: number; y: number };
  isMouseDown: boolean;
  worldObjects: WorldObjects;
  world: b2World;
}

export function updatePhysicsSimulation({
  canvas,
  context,
  delta,
  mouseWorldPos,
  isMouseDown,
  worldObjects,
  world,
}: PhysicsSimulationState) {
  // update physics object
  world.Step(delta, {
    velocityIterations: 6, // default 6
    positionIterations: 2,
  });

  updateDragBoxLogic(
    world,
    worldObjects.dynamicBox,
    worldObjects.groundBody,
    mouseWorldPos,
    isMouseDown
  );

  // clean canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.save();
  {
    // center the world scale
    context.translate(canvas.width / 2, canvas.height);
    // flip the word scale up side down for box 2d
    context.scale(WORLD_SCALE, -WORLD_SCALE);

    // draw box
    context.save();
    {
      Object.values(worldObjects).forEach(
        (worldObject) => !worldObject.hidden && drawBox(worldObject, context)
      );
    }
    context.restore();

    drawCursor(isMouseDown, mouseWorldPos, context);
  }
  context.restore();
}
