Demo.prototype.basicText = function (props)
{
  if(props.y == undefined) props.y = 0;
  this.loader.addAnimation([{
    start:props.start, duration:props.duration,
      text:{string:props.text,name:"multiSceneEffects/monoSpace.ttf"},
      perspective:"3d", 
      color:[{"r":1.0,"g":0.1,"b":0.1,"a":1.0}],
      position:[{
        x:0,
        y:props.y,
        z:2},
       {duration:9},{y:0}],
      scale: [{ uniform3d: 3.1 }],
    material:{
      blending: 'NormalBlending',
      transparent:true,
      alphaTest:0.01
    }
  }]);

}

Demo.prototype.chaosText = function (props)
{

  this.loader.addAnimation([{
      text:{string:props.text,name:"multiSceneEffects/monoSpace.ttf",parameters:{depth:1.0}},
      perspective:"3d", 
      color:[{"r":1.0,"g":0.1,"b":0.1,"a":1.0}],
      position:[{
        x:.5,
        y:0,
        z:0}],
      scale: [{ uniform3d: 3.1 }],
    material:{
      blending: 'NormalBlending',
      transparent:true,
      alphaTest:0.01
    },
    shader:{
      vertexShaderPrefix:`

uniform float time;

      float rand( float n ) { return fract(sin(n) * 43758.5453123); }
      vec3 random3( vec3 pos ) {
      return vec3(
      rand(pos.x) - 0.5,
      rand(pos.y) - 0.5,
      rand(pos.z) - 0.5
      );
        }
        void chaos() {
    vec3 pos = position;
    float t = floor(time * 15.0);
    pos += random3(pos + t) * 0.5;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
      `,
      vertexShaderSuffix:`
        chaos();`
    }
  }]);

}