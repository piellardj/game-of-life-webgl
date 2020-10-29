#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
#else
  precision mediump float;
#endif

uniform float uClearFactor; // 1 - persistence
uniform vec2 uGridSize;
uniform sampler2D uTexture;

varying vec2 coords; // {0,1}x{0,1}

#include "_packing.frag"

/* 0 < a < 1 => values.x
 * 1 < a < 2 => values.y
 * 2 < a < 3 => values.z
 * 3 < a < 4 => values.w
 */
float multiStep(vec4 values, float a)
{
    return mix(
        mix(values.x, values.y, step(1.0, a)),
        mix(values.z, values.w, step(3.0, a)),
        step(2.0, a)
    );
}

float getState(sampler2D texture, vec2 pos)
{
    vec4 texel = texture2D(texture, pos);
    mat4 virtualBlock = unpackTexel(texel);

    vec2 a = mod(uGridSize * pos, 4.0); // in [0, 4]^2

    vec4 row = vec4(
        multiStep(virtualBlock[0], a.y),
        multiStep(virtualBlock[1], a.y),
        multiStep(virtualBlock[2], a.y),
        multiStep(virtualBlock[3], a.y)
    );

    return multiStep(row, a.x);
}

void main(void)
{
    float living = getState(uTexture, coords);
    gl_FragColor = vec4(living, living, living, max(uClearFactor, living));
}