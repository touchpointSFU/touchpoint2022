import { Point } from "./PhysicsSimulationUtils";

export function drawCursor(
  isMouseDown: boolean,
  mouseWorldPos: Point,
  context: CanvasRenderingContext2D
) {
  // console.log(mouseWorldPos.x);

  context.save();
  context.fillStyle = isMouseDown ? "#00F" : "#0FF";

  const size = 0.05;
  context.fillRect(
    mouseWorldPos.x - size / 2,
    mouseWorldPos.y - size / 2,
    size,
    size
  );
  context.restore();
}
