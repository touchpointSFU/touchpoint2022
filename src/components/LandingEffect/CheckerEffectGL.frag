#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

varying vec3 vVertexPosition;

uniform sampler2D uSampler0;

uniform float uCursorSize;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform vec2 uNoiseOffset;

uniform float uCheckerSize;

// Noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }
float noise(vec3 P) {
    vec3 i0 = mod289(floor(P)), i1 = mod289(i0 + vec3(1.0));
    vec3 f0 = fract(P), f1 = f0 - vec3(1.0), f = fade(f0);
    vec4 ix = vec4(i0.x, i1.x, i0.x, i1.x), iy = vec4(i0.yy, i1.yy);
    vec4 iz0 = i0.zzzz, iz1 = i1.zzzz;
    vec4 ixy = permute(permute(ix) + iy), ixy0 = permute(ixy + iz0), ixy1 = permute(ixy + iz1);
    vec4 gx0 = ixy0 * (1.0 / 7.0), gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
    vec4 gx1 = ixy1 * (1.0 / 7.0), gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
    gx0 = fract(gx0); gx1 = fract(gx1);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0), sz0 = step(gz0, vec4(0.0));
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1), sz1 = step(gz1, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5); gy0 -= sz0 * (step(0.0, gy0) - 0.5);
    gx1 -= sz1 * (step(0.0, gx1) - 0.5); gy1 -= sz1 * (step(0.0, gy1) - 0.5);
    vec3 g0 = vec3(gx0.x,gy0.x,gz0.x), g1 = vec3(gx0.y,gy0.y,gz0.y),
        g2 = vec3(gx0.z,gy0.z,gz0.z), g3 = vec3(gx0.w,gy0.w,gz0.w),
        g4 = vec3(gx1.x,gy1.x,gz1.x), g5 = vec3(gx1.y,gy1.y,gz1.y),
        g6 = vec3(gx1.z,gy1.z,gz1.z), g7 = vec3(gx1.w,gy1.w,gz1.w);
    vec4 norm0 = taylorInvSqrt(vec4(dot(g0,g0), dot(g2,g2), dot(g1,g1), dot(g3,g3)));
    vec4 norm1 = taylorInvSqrt(vec4(dot(g4,g4), dot(g6,g6), dot(g5,g5), dot(g7,g7)));
    g0 *= norm0.x; g2 *= norm0.y; g1 *= norm0.z; g3 *= norm0.w;
    g4 *= norm1.x; g6 *= norm1.y; g5 *= norm1.z; g7 *= norm1.w;
    vec4 nz = mix(vec4(dot(g0, vec3(f0.x, f0.y, f0.z)), dot(g1, vec3(f1.x, f0.y, f0.z)),
        dot(g2, vec3(f0.x, f1.y, f0.z)), dot(g3, vec3(f1.x, f1.y, f0.z))),
        vec4(dot(g4, vec3(f0.x, f0.y, f1.z)), dot(g5, vec3(f1.x, f0.y, f1.z)),
            dot(g6, vec3(f0.x, f1.y, f1.z)), dot(g7, vec3(f1.x, f1.y, f1.z))), f.z);
    return 2.2 * mix(mix(nz.x,nz.z,f.y), mix(nz.y,nz.w,f.y), f.x);
}
float noise(vec2 P) { return noise(vec3(P, 0.0)); }

float getCheckerColor(vec3 vertexPosition, float aspectRatio, float checkSizeScreenSpace) { 
  float x_thing = step(checkSizeScreenSpace / 2.0, mod(vertexPosition.x, checkSizeScreenSpace));
  float y_thing = step(checkSizeScreenSpace / aspectRatio / 2.0, mod(vertexPosition.y, checkSizeScreenSpace / aspectRatio));

  bool condition1 = x_thing > 0.5 && y_thing < 0.5;
  bool condition2 = x_thing < 0.5 && y_thing > 0.5;

  float color;
  if (condition1 || condition2) {
    // when shite
    return 1.0; 
  } else {
    // when dark
    return 0.0;
  }
}

ivec2 getCell(vec2 screenpos, float aspectRatio, float checkSizeScreenSpace) {
  int col = int(screenpos.x * 2.0 / (checkSizeScreenSpace));
  int row = int(screenpos.y * 2.0 / (checkSizeScreenSpace / aspectRatio));
  return ivec2(col, row); 
}

vec2 getCellPosition(ivec2 cell, float aspectRatio, float checkSizeScreenSpace) {
  return vec2(float(cell.x) * checkSizeScreenSpace, float(cell.y) * checkSizeScreenSpace  / aspectRatio); 
}

float polarizeValue(float val, float threshold) {
  return val > threshold ? 1.0: 0.0;
}

float noiseChecker(ivec2 currentCell, vec2 noiseScale, vec2 noiseOffset) {
  vec2 noiseVector = vec2(currentCell)*noiseScale + noiseOffset;
  float noiseInfluence = noise(noiseVector);
  return noiseInfluence;
}


void main() {

  // check size for screen space
  float checkSizeScreenSpace = uCheckerSize * 4.0 / uResolution.x;

  vec3 vertexPosition = vVertexPosition;
  float aspectRatio = uResolution.y / uResolution.x;
  
  // ==========================================
  // Creating the checkerboard map
  // ==========================================
  
  float checkerColor = getCheckerColor(vertexPosition, aspectRatio, checkSizeScreenSpace);
  ivec2 currentCell = getCell(vec2(vertexPosition.x,vertexPosition.y), aspectRatio, checkSizeScreenSpace);

  // the pixel position of the cell
  vec2 currentCellPosition = getCellPosition(currentCell, aspectRatio, checkSizeScreenSpace);
  
  // detial noise
  vec2 noiseScaleSmall = vec2(20.0/100.0);
  vec2 noiseOffsetSmall = uNoiseOffset;
  float noiseInfluenceSmall = noiseChecker(currentCell, noiseScaleSmall, noiseOffsetSmall);
  
  // big noise
  vec2 noiseScaleBig = vec2(2.0/100.0);
  vec2 noiseOffsetBig = uNoiseOffset;
  float whiteSpaceFactor = 0.04;
  float noiseInfluenceBig = noiseChecker(currentCell, noiseScaleBig, noiseOffsetBig) - whiteSpaceFactor;


  // to control how cluster the form look
  float mixFactor = .7;
  float mixedCheckerInfluence = mix(noiseInfluenceSmall, noiseInfluenceBig, mixFactor);

  // ==============================================
  // Introduce mouse influence to the checker map
  // ==============================================

  // mouse size in pixel
  float mouseSize = uCheckerSize * uCursorSize; 
  float noiseInfluence2 = noise(vec2(currentCell*100)/ 220.0+5.0);
  // make the noise influence look sharp
  noiseInfluence2 = noiseInfluence2;
  
  // scale with resolution
  float mouseInfluence = distance(currentCellPosition * uResolution, uMouse*2.0 * uResolution) / (mouseSize * 2.0);
  
  // make the mouse image affect by the noise shape
  float mouseNoiseComposite = (mouseInfluence) * (1.0-noiseInfluence2* (0.9));

  // gl_FragColor = vec4(vec2(noiseInfluence), 1.0, 1.0); 
  float checkerMouseComposite = mix(mixedCheckerInfluence, 1.0, mouseNoiseComposite);
  
  float color = checkerColor < 0.5 ? mixedCheckerInfluence: 0.0;
  float polarizedColor = 1.0-polarizeValue(color, .1);
  
    gl_FragColor = vec4(vec3(polarizedColor),1.0-polarizedColor);

    return;
  // within the mouse permimeter
  if(mouseNoiseComposite < 1.0) {
    // gl_FragColor = vec4(1.0,0.0,0.0, 1.0);
  } else {
    gl_FragColor = vec4(vec3(polarizedColor),1.0-polarizedColor);
  }
}