attribute vec4 a_position;
uniform float u_scroll;

void main() {
  gl_Position = vec4(a_position.x,a_position.y + u_scroll, a_position.z,a_position.w);
}