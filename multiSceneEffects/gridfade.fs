in vec2 texCoord;
out vec4 fragColor;
uniform sampler2D texture0;
uniform vec4 color;// = vec4(1.0, 1.0, 1.0, 1.0);
uniform float fade;         // 0 → visible, 1 → hidden
uniform bool invert;        // if true, invert fade logic
uniform float gridx; // number of grid cells in x and y
uniform float gridy; // number of grid cells in x and y
uniform float seed;         // seed for deterministic randomness


// Hash function with seed
float hash(vec2 p, float seed) {
    return fract(sin(dot(p, vec2(127.1, 311.7)) + seed * 43758.5453123) * 43758.5453123);
}



void main() {
    vec2 coord = texCoord.st;

    // Which grid cell this pixel belongs to
    vec2 gridPos = floor(coord * vec2(gridx,gridy));

    // Random value for this cell (deterministic with seed)
    float rnd = hash(gridPos, seed);

    // Threshold based on fade
 

    // Decide visibility of this cell
    float cellVisible = step(rnd, fade);
    if (cellVisible < .9 )
    {
        if(!invert)
            discard;
    }
    else if (invert) discard;
    // Sample texture
    vec4 finalColor = texture2D(texture0, coord);

    // Apply cell alpha
    //finalColor.a *= cellVisible;

    fragColor = finalColor;
}
