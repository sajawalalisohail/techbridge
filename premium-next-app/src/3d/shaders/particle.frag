varying vec3 vColor;
varying float vAlpha;

void main() {
  // Create circular particle
  vec2 center = gl_PointCoord - vec2(0.5);
  float dist = length(center);

  // Hard cutoff for circle shape
  if (dist > 0.5) discard;

  // Soft glow falloff (inverse square for realistic glow)
  float glow = 1.0 - (dist * 2.0);
  glow = pow(glow, 1.3);

  // Hot center
  vec3 finalColor = vColor * (1.0 + glow * 0.5);

  // Alpha with soft edge
  float alpha = glow * vAlpha;

  gl_FragColor = vec4(finalColor, alpha);
}
