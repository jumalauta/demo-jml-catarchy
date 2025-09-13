/*
this.loader.addAnimation({
    image: ['_embedded/defaultWhite.png', 'spectogram.png' ],
    shader:{name:"multiSceneEffects/randomLines.fs"}
});
*/

in vec2 texCoord;
out vec4 fragColor;
uniform sampler2D texture0;
uniform sampler2D texture1;
uniform vec4 color;
uniform float time;
uniform float timePercent;

float rand(vec2 coord)
{
    float seed = 2.0;
    return fract(sin(dot(coord.st,vec2(12.9898,78.233)+seed)) * 43758.5453);
}

float rands(vec2 coord, float seed)
{
    return fract(sin(dot(coord.st,vec2(12.9898,78.233)+seed)) * 43758.5453);
}

float pattern(vec2 st, vec2 v, float t) {
    vec2 p = floor(st+v);
    return step(t, rand(100.+p*.000001)+rand(p.xx)*0.5 );
}

vec2 pixelize(vec2 st, float pixels)
{
    st *= pixels;
    st = floor(st);
    st /= pixels;
    return st;
}

void main() {

    float spectogramThreshold = 0.4;
    vec2 spectogramCoord = vec2(timePercent, 0.05);
    vec4 spectogramColorPoint = texture(texture1, spectogramCoord);
    float graySpectogram = (spectogramColorPoint.r + spectogramColorPoint.g + spectogramColorPoint.b) / 3.0;
    if (graySpectogram < spectogramThreshold) {
        discard;
    }

    float t = floor(timePercent*1200.0)/10.0;
    vec4 finalColor = vec4(0.0);

    float[] pixels = float[](100.0, 50.0, 30.0, 25.0, 4.0);
    for (int i=0; i<5; i++) {
        vec2 st = pixelize(texCoord, pixels[i]);
        float vertical = rands(vec2(st.x, t), pixels[i]);
        float horizontal = rands(vec2(t, st.y), pixels[i]);
        if (vertical < 0.01) {
            finalColor += vec4(0.25);
        }
        if (horizontal < 0.01) {
            finalColor += vec4(0.25);
        }
    }

    fragColor = min(finalColor, vec4(1.0));
    fragColor *= color;
}
