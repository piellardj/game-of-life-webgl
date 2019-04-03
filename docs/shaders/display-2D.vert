attribute vec2 aCorner; // {-1,1}x{-1,1}

uniform vec4 uSubTexture; // in [0,1]^^4: x, y, width, height

varying vec2 coords; // {0,1}x{0,1}

void main(void)
{
    coords = (vec2(.5,-.5) * aCorner + .5) * uSubTexture.zw + uSubTexture.xy;
    gl_Position = vec4(aCorner, 0, 1);
}
