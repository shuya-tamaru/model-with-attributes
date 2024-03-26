export const fragment = `
varying vec3 vPosition;
uniform float cutHeight;
uniform vec3 uDiffuse;

void main() {
  if (vPosition.y > cutHeight) {
    discard;
  }else{
    gl_FragColor = vec4(uDiffuse,1.0);
  }
}
`;
