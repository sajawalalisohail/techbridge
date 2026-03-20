uniform float uTime;
uniform float uState; // 0=ambient, 0.1-0.9=shaping, 0.9+=explode
uniform float uCurrentShape; // 0.0 to 5.0
uniform float uShapeProgress; // 0-1 fraction between shapes
uniform vec2 uMouse; // Normalized -1 to 1
uniform float uJellyStrength; // 0.8 recommended

attribute vec3 aRandomPos; // Ambient floating position
attribute vec3 aShape0; // Sphere
attribute vec3 aShape1; // Cube
attribute vec3 aShape2; // Torus
attribute vec3 aShape3; // Cross
attribute vec3 aShape4; // Neural
attribute vec3 aShape5; // Hex
attribute vec3 aVelocity; // Random direction for explosion

varying vec3 vColor;
varying float vAlpha;

// ─── Simplex 3D Noise ───────────────────────────────────────
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

// ─── Shape selector ──────────────────────────────────────────
vec3 getShape(float idx) {
  float i = floor(idx + 0.001);
  if (i < 0.5) return aShape0;
  if (i < 1.5) return aShape1;
  if (i < 2.5) return aShape2;
  if (i < 3.5) return aShape3;
  if (i < 4.5) return aShape4;
  return aShape5;
}

// ─── Service colors (RGB) ────────────────────────────────────
vec3 getServiceColor(int idx) {
  if (idx == 0) return vec3(0.298, 0.294, 0.686); // #4c4baf Indigo
  if (idx == 1) return vec3(0.231, 0.510, 0.965); // #3b82f6 Blue
  if (idx == 2) return vec3(0.545, 0.361, 0.965); // #8b5cf6 Violet
  if (idx == 3) return vec3(0.024, 0.714, 0.831); // #06b6d4 Cyan
  if (idx == 4) return vec3(0.659, 0.333, 0.969); // #a855f7 Bright Violet
  return vec3(0.063, 0.725, 0.506);                // #10b981 Emerald
}

void main() {
  vec3 pos = position;
  float state = uState;

  // Determine current and next shape
  int currentIdx = int(floor(uCurrentShape));
  int nextIdx = currentIdx + 1;
  if (nextIdx > 5) nextIdx = 5;
  float morphT = fract(uCurrentShape);

  // Get target positions
  vec3 currentTarget = getShape(float(currentIdx));
  vec3 nextTarget = getShape(float(nextIdx));
  vec3 shapePos = mix(currentTarget, nextTarget, smoothstep(0.0, 1.0, morphT));

  // ── STATE: AMBIENT ─────────────────────────────────────────
  if (state < 0.1) {
    float noiseVal = snoise(aRandomPos * 0.4 + uTime * 0.15);
    vec3 noiseVec = vec3(
      snoise(aRandomPos * 0.5 + uTime * 0.1),
      snoise(aRandomPos * 0.5 + uTime * 0.1 + 100.0),
      snoise(aRandomPos * 0.5 + uTime * 0.1 + 200.0)
    );
    pos = aRandomPos + noiseVec * 0.5;

    // Gentle mouse repulsion
    vec2 toMouse = pos.xy - uMouse * 6.0;
    float distMouse = length(toMouse);
    if (distMouse < 3.0) {
      pos.xy += normalize(toMouse) * (3.0 - distMouse) * 0.2;
    }

    vec3 ambientColor = vec3(0.4, 0.4, 0.6);
    vColor = ambientColor * (0.8 + noiseVal * 0.2);
    vAlpha = 0.4 + noiseVal * 0.2;

  // ── STATE: SHAPING ─────────────────────────────────────────
  } else if (state < 0.9) {
    // Offset shape to left side of viewport
    shapePos.x -= 2.5;

    // Mouse interaction (jelly effect)
    vec2 mouseWorld = uMouse * 5.0;
    vec2 toMouse = shapePos.xy - mouseWorld;
    float dist = length(toMouse);
    float influenceRadius = 3.0;

    vec3 displacement = vec3(0.0);

    if (dist < influenceRadius) {
      float strength = (influenceRadius - dist) / influenceRadius;

      // Push away from mouse
      vec2 pushDir = normalize(toMouse);
      displacement.xy = pushDir * strength * uJellyStrength * 1.2;

      // Wobble oscillation proportional to displacement
      float wobbleFreq = 4.0 + strength * 3.0;
      float wobbleAmp = 0.15 * strength;

      displacement.x += sin(uTime * wobbleFreq) * wobbleAmp;
      displacement.y += cos(uTime * wobbleFreq * 0.8) * wobbleAmp;
      displacement.z += sin(uTime * wobbleFreq * 1.2) * wobbleAmp * 0.5;
    }

    pos = shapePos + displacement;

    // Breathing animation
    float breathe = sin(uTime * 1.2) * 0.06;
    pos += normalize(shapePos) * breathe;

    // Color transition between services
    vec3 col1 = getServiceColor(currentIdx);
    vec3 col2 = getServiceColor(nextIdx);
    vec3 finalColor = mix(col1, col2, morphT);

    vColor = finalColor * 1.4;
    vAlpha = 0.85 + sin(uTime * 2.0 + dist) * 0.15;

  // ── STATE: EXPLOSION ───────────────────────────────────────
  } else {
    float explodeT = (state - 0.9) * 5.0;
    explodeT = clamp(explodeT, 0.0, 1.0);

    vec3 explodePos = aRandomPos + aVelocity * explodeT * 12.0;

    // Tumble rotation
    float rotX = explodeT * aVelocity.x * 3.0;
    float rotY = explodeT * aVelocity.y * 3.0;

    explodePos.xy = mat2(cos(rotX), -sin(rotX), sin(rotX), cos(rotX)) * explodePos.xy;
    explodePos.yz = mat2(cos(rotY), -sin(rotY), sin(rotY), cos(rotY)) * explodePos.yz;

    pos = explodePos;

    vColor = getServiceColor(5);
    vAlpha = 1.0 - explodeT;
  }

  // Final transform
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  // Size attenuation
  float size = 5.0;
  if (state >= 0.1 && state < 0.9) {
    size = 6.0 + sin(uTime * 3.0) * 1.5;
  } else if (state >= 0.9) {
    size = 8.0;
  }

  gl_PointSize = size * (10.0 / -mvPosition.z);
}
