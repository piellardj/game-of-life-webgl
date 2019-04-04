precision mediump float;

uniform sampler2D uPrevious;
uniform vec2 uCellSize;

varying vec2 coords; // {0,1}x{0,1}

float state(vec2 pos)
{
    return step(0.5, texture2D(uPrevious, pos).r);
}

void main(void)
{
    /* Compute amount of living neighbours */
    float N = 
        state(coords + vec2(-1,-1) * uCellSize) +
        state(coords + vec2(-1,+0) * uCellSize) +
        state(coords + vec2(-1,+1) * uCellSize) +
        state(coords + vec2(+0,-1) * uCellSize) +
        state(coords + vec2(+0,+1) * uCellSize) +
        state(coords + vec2(+1,-1) * uCellSize) +
        state(coords + vec2(+1,+0) * uCellSize) +
        state(coords + vec2(+1,+1) * uCellSize);

    float currentState = state(coords);

    #INJECT(rules)

    gl_FragColor = vec4(vec3(currentState), 1);
}