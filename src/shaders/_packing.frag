/* Packs 4 floats in {0,1} into one float in [0, 1]*/
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
