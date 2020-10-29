#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
#else
  precision mediump float;
#endif

uniform float uClearFactor; // 1 - persistence
uniform vec2 uGridSize;
uniform sampler2D uTexture;

varying vec2 coords; // {0,1}x{0,1}/* Packs 4 floats in {0,1} into one float in [0, 1]*/
float pack(vec4 values)
{
    return 0.03125 + dot(vec4(0.0625, 0.125, 0.25, 0.5), values);
}

/* Unpacks 4 floats in {0,1} from one float in [0, 1]*/
vec4 unpack(float v)
{
    return vec4(
        step(0.0625, mod(v, 0.125)),
        step(0.125, mod(v, 0.25)),
        step(0.25, mod(v, 0.5)),
        step(0.5, v)
    );
}

mat4 unpackTexel(vec4 rgba)
{
    return mat4(unpack(rgba.r), unpack(rgba.g), unpack(rgba.b), unpack(rgba.a));
}

vec4 packTexel(mat4 mat)
{
    return vec4(pack(mat[0]), pack(mat[1]), pack(mat[2]), pack(mat[3]));
}

float unpackX(float v)
{
    return step(0.0625, mod(v, 0.125));
}

float unpackW(float v)
{
    return step(0.5, v);
}

vec4 unpackTopRow(vec4 texel)
{
    return vec4(unpackX(texel.r), unpackX(texel.g), unpackX(texel.b), unpackX(texel.a));
}

vec4 unpackBottomRow(vec4 texel)
{
    return vec4(unpackW(texel.r), unpackW(texel.g), unpackW(texel.b), unpackW(texel.a));
}

vec4 unpackLeftColumn(vec4 texel)
{
    return unpack(texel.r);
}

vec4 unpackRightColumn(vec4 texel)
{
    return unpack(texel.a);
}

float unpackTopLeft(vec4 texel)
{
    return unpackX(texel.r);
}

float unpackBottomLeft(vec4 texel)
{
    return unpackW(texel.r);
}

float unpackTopRight(vec4 texel)
{
    return unpackX(texel.a);
}

float unpackBottomRight(vec4 texel)
{
    return unpackW(texel.a);
}

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