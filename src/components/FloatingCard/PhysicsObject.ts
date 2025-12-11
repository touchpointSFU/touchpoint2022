import {
  b2Body,
  b2BodyType,
  b2MassData,
  b2PolygonShape,
  b2World,
} from "@box2d/core";

interface PhsyicsObjectConfig {
  isFixed?: boolean;
  // for box
  width: number;
  height: number;
  x: number;
  y: number;
  angle?: number;
  // for fixture
  friction?: number;
  restitution?: number;
  density?: number;
  isSensor?: boolean;
  // for mass
  mass?: number;

  hidden?: boolean;
}

export interface PhysicsObject {
  readonly width: number;
  readonly height: number;
  readonly body: b2Body;
  readonly shape: b2PolygonShape;
  readonly hidden: boolean;
}

export interface PhysicsImage extends PhysicsObject {
  readonly image: HTMLImageElement;
}

export function createPhsyicsObject(
  world: b2World,
  config: PhsyicsObjectConfig,
  image?: HTMLImageElement
): PhysicsObject | PhysicsImage {
  const body = world.CreateBody({
    position: {
      x: config.x,
      y: config.y,
    },
    angle: config.angle,
    type: config.isFixed ? b2BodyType.b2_staticBody : b2BodyType.b2_dynamicBody,
  });

  if (typeof config.mass === "number") {
    const dynamicBoxBodyMassData = new b2MassData();
    dynamicBoxBodyMassData.mass = config.mass;
    body.SetMassData(dynamicBoxBodyMassData);
  }

  // create ground box
  const shape = new b2PolygonShape();
  shape.SetAsBox(config.width, config.height);
  body.CreateFixture({
    isSensor: config.isSensor,
    shape: shape,
    friction: config.friction,
    restitution: config.restitution,
    density: config.density,
  });

  return {
    width: config.width,
    height: config.height,
    hidden: config.hidden ? true : false,
    body: body,
    image: image,
    shape: shape,
  };
}
