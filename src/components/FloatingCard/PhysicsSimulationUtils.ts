import { PhysicsObject } from "./PhysicsObject";

export const INITIAL_WORLD_SIZE = {
  actual: {
    width: 0,
    height: 0,
  },
  scaled: {
    width: 0,
    height: 0,
  },
  aspectRatio: 0,
};

export interface WorldSizeInfo {
  actual: {
    width: number;
    height: number;
  };
  scaled: {
    width: number;
    height: number;
  };
  aspectRatio: number;
}

export type Point = {
  x: number;
  y: number;
};

export interface WorldObjects {
  [key: string]: PhysicsObject;
}

export const WORLD_SCALE = 20;

export const getWorldSizeInfo = (width: number, height: number) => {
  const aspectRatio = width / height;

  return {
    actual: {
      width: width,
      height: height,
    },
    scaled: {
      width: width / WORLD_SCALE,
      height: height / WORLD_SCALE,
    },
    aspectRatio: aspectRatio,
  };
};
