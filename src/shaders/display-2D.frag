precision mediump float;

uniform float uClearFactor; // 1 - persistence
uniform sampler2D uTexture;

varying vec2 coords; // {0,1}x{0,1}

void main(void)
{
    float living = texture2D(uTexture, coords).r;
    gl_FragColor = vec4(living, living, living, max(uClearFactor, living));
}