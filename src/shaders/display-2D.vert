attribute vec2 aCorner; // {-1,1}x{-1,1}

uniform float uScale;
uniform vec2 uSubTexture; // in [0,1]x[0,1]

varying vec2 coords; // {0,1}x{0,1}

void main(void)
{
    coords = (vec2(.5,-.5) * aCorner + .5) * uSubTexture / uScale;
    gl_Position = vec4(aCorner, 0, 1);
}
