precision mediump float;

uniform sampler2D uPrevious;
uniform vec2 uPhysicalCellSize;

varying vec2 coords; // {0,1}x{0,1}

#include "_packing.frag"

float evolveCell(float currentState, float N)
{
    #INJECT(rules)
    return clamp(currentState, 0.0, 1.0);
}

vec4 evolveColumn(vec4 current, vec4 neighbours)
{
    return vec4(
        evolveCell(current.x, neighbours.x),
        evolveCell(current.y, neighbours.y),
        evolveCell(current.z, neighbours.z),
        evolveCell(current.w, neighbours.w)
    );
}

mat4 evolveBlock(mat4 current, mat4 neighbours)
{
    return mat4(
        evolveColumn(current[0], neighbours[0]),
        evolveColumn(current[1], neighbours[1]),
        evolveColumn(current[2], neighbours[2]),
        evolveColumn(current[3], neighbours[3])
    );
}

void main(void)
{
    vec4 topLeftTexel =     texture2D(uPrevious, coords + vec2(-1,-1) * uPhysicalCellSize);
    vec4 leftTexel =        texture2D(uPrevious, coords + vec2(-1,+0) * uPhysicalCellSize);
    vec4 bottomLeftTexel =  texture2D(uPrevious, coords + vec2(-1,+1) * uPhysicalCellSize);
    vec4 topTexel =         texture2D(uPrevious, coords + vec2(+0,-1) * uPhysicalCellSize);
    vec4 middleTexel =      texture2D(uPrevious, coords);
    vec4 bottomTexel =      texture2D(uPrevious, coords + vec2(+0,+1) * uPhysicalCellSize);
    vec4 topRightTexel =    texture2D(uPrevious, coords + vec2(+1,-1) * uPhysicalCellSize);
    vec4 rightTexel =       texture2D(uPrevious, coords + vec2(+1,+0) * uPhysicalCellSize);
    vec4 bottomRightTexel = texture2D(uPrevious, coords + vec2(+1,+1) * uPhysicalCellSize);

    vec4 top =       unpackBottomRow(topTexel);
    vec4 bottom =    unpackTopRow(bottomTexel);
    vec4 left =     unpackRightColumn(leftTexel);
    vec4 right =    unpackLeftColumn(rightTexel);
    float topLeft =     unpackBottomRight(topLeftTexel);
    float topRight =    unpackBottomLeft(topRightTexel);
    float bottomLeft =  unpackTopRight(bottomLeftTexel);
    float bottomRight = unpackTopLeft(bottomRightTexel);

    mat4 current = unpackTexel(middleTexel);

    mat4 neighbours = mat4(
        /* First column */
        topLeft + top.x         + top.y         + left.x + current[1][0] + left.y     + current[0][1] + current[1][1],
        left.x  + current[0][0] + current[1][0] + left.y + current[1][1] + left.z     + current[0][2] + current[1][2],
        left.y  + current[0][1] + current[1][1] + left.z + current[1][2] + left.w     + current[0][3] + current[1][3],
        left.z  + current[0][2] + current[1][2] + left.w + current[1][3] + bottomLeft + bottom.x      + bottom.y,

        /* Second column */
        top.x         + top.y         + top.z         + current[0][0] + current[2][0] + current[0][1] + current[1][1] + current[2][1],
        current[0][0] + current[1][0] + current[2][0] + current[0][1] + current[2][1] + current[0][2] + current[1][2] + current[2][2],
        current[0][1] + current[1][1] + current[2][1] + current[0][2] + current[2][2] + current[0][3] + current[1][3] + current[2][3],
        current[0][2] + current[1][2] + current[2][2] + current[0][3] + current[2][3] + bottom.x      + bottom.y      + bottom.z,

        /* Third column */
        top.y         + top.z         + top.w         + current[1][0] + current[3][0] + current[1][1] + current[2][1] + current[3][1],
        current[1][0] + current[2][0] + current[3][0] + current[1][1] + current[3][1] + current[1][2] + current[2][2] + current[3][2],
        current[1][1] + current[2][1] + current[3][1] + current[1][2] + current[3][2] + current[1][3] + current[2][3] + current[3][3],
        current[1][2] + current[2][2] + current[3][2] + current[1][3] + current[3][3] + bottom.y      + bottom.z      + bottom.w,

        /* Fourth column */
        top.z         + top.w         + topRight + current[2][0] + right.x + current[2][1] + current[3][1] + right.y,
        current[2][0] + current[3][0] + right.x  + current[2][1] + right.y + current[2][2] + current[3][2] + right.z,
        current[2][1] + current[3][1] + right.y  + current[2][2] + right.z + current[2][3] + current[3][3] + right.w,
        current[2][2] + current[3][2] + right.z  + current[2][3] + right.w + bottom.z      + bottom.w      + bottomRight
    );

    gl_FragColor = packTexel(evolveBlock(current, neighbours));
}