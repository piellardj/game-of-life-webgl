precision mediump float;

uniform float uClearFactor; // 1 - persistence
uniform sampler2D uTexture;

varying vec2 coords; // {0,1}x{0,1}

#include "_sample.frag"

void main(void)
{
    float living = getState(uTexture, coords);
    gl_FragColor = vec4(living, living, living, max(uClearFactor, living));
}