in vec2 texCoord;
out vec4 fragColor;
uniform sampler2D texture0;
uniform vec4 color;
uniform float time;
uniform float iteration;
uniform float strength;
void main()
{
    float t = floor((iteration+time)*80.0);
    vec2 coord=texCoord;

    coord.t += (sin(coord.t*12.0 + t*1.0)*0.122*strength)*(coord.t-0.5);
    coord.s += (cos(coord.s*20.0 + t*0.3)*0.125*strength)*(coord.t-0.5);

    fragColor = texture2D(texture0, coord) * color;

}
