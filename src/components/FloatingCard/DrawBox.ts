import { PhysicsImage, PhysicsObject } from "./PhysicsObject";

export function drawBox(
  object: PhysicsImage | PhysicsObject,
  context: CanvasRenderingContext2D
) {
  const dyanmicBody = object.body;
  const dynamicPos = dyanmicBody.GetPosition();

  // console.log(dynamicPos.y);
  context.save();
  {
    context.translate(dynamicPos.x, dynamicPos.y);
    context.rotate(dyanmicBody.GetAngle());
    context.scale(1, -1);

    if ((object as PhysicsImage).image) {
      // draw content
      context.drawImage(
        (object as PhysicsImage).image,
        (-object.width * 2) / 2,
        (-object.height * 2) / 2,
        object.width * 2,
        object.height * 2
      );
    } else {
      context.fillRect(
        (-object.width * 2) / 2,
        (-object.height * 2) / 2,
        object.width * 2,
        object.height * 2
      );
    }
  }
  context.restore();
}
