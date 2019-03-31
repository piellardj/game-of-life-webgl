precision mediump float;

uniform sampler2D uTexture;

varying vec2 coords; // {0,1}x{0,1}

void main(void)
{
    gl_FragColor = texture2D(uTexture, coords);
}