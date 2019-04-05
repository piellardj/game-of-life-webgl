float getState(sampler2D texture, vec2 pos)
{
    return step(0.5, texture2D(texture, pos).r);
}