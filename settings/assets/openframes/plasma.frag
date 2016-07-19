// Author: Hugo Laliberté / hugolaliberte.com
// Title: Classic Retro Black and White Plasma SHADER

#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.1415926535897932384626433832795

uniform vec2 u_resolution;
uniform float u_time;

void main() {
    float scale = 0.05;
    float colorIntensity = 0.0;
    vec2 c = gl_FragCoord.xy * scale - scale / 2.;

    colorIntensity += sin((c.s + u_time));
    colorIntensity += sin((c.s + u_time) / 2.0);
    colorIntensity += sin((c.s + c.t + u_time) / 2.0);

    c += scale / 2. * vec2(sin(u_time / 3.0), cos(u_time / 2.0));

    colorIntensity += sin(sqrt(pow(c.s, 2.) + pow(c.t, 2.) + 1.) + u_time);

    colorIntensity = colorIntensity / 2.;

    float r = tan(colorIntensity * PI);
    float g = tan(colorIntensity * PI);
    float b = tan(colorIntensity * PI);
    vec4 color = vec4(r, g, b, 1.0);

    gl_FragColor = color;
  }