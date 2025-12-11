import { b2MouseJoint, b2MouseJointDef, b2World } from "@box2d/core";
import { PhysicsObject } from "./PhysicsObject";
import { Point } from "./PhysicsSimulationUtils";

let currentMouseDown = false;
let mouseJoint: b2MouseJoint | undefined;

export function updateDragBoxLogic(
  world: b2World,
  box: PhysicsObject,
  ground: PhysicsObject,
  mouseWorldPos: Point,
  isMouseDown: boolean
) {
  if (isMouseDown && !currentMouseDown) {
    // check if the user is selecting the box
    const isMouseOnBox = box.body.GetFixtureList()?.TestPoint(mouseWorldPos);
    if (!isMouseOnBox) return;

    currentMouseDown = true;
    // handle mouse down
    mouseJoint = createMouseJoint(world, box, ground, mouseWorldPos);
  }

  if (!isMouseDown && currentMouseDown) {
    currentMouseDown = false;
    // handle mouse up
    // destroy the mouse joint after drag
    world.DestroyJoint(mouseJoint as b2MouseJoint);
    mouseJoint = undefined;
  }

  // drag update
  if (mouseJoint) {
    mouseJoint.SetTarget(mouseWorldPos);
  }
}

function createMouseJoint(
  world: b2World,
  box: PhysicsObject,
  ground: PhysicsObject,
  mouseWorldPos: Point
) {
  // collision check
  const mouseJointDef = new b2MouseJointDef();
  mouseJointDef.bodyA = ground.body;
  mouseJointDef.bodyB = box.body;
  mouseJointDef.maxForce = 50000.0;
  mouseJointDef.damping = 1000;
  mouseJointDef.stiffness = 50000;

  // the initial target is the body
  // can be other things too
  //@ts-ignore
  mouseJointDef.target = mouseWorldPos;
  return world.CreateJoint(mouseJointDef);
}
