Demo.prototype.basicText = function (props)
{
  if(props.a == undefined) props.a = 1.0;
  if(props.y == undefined) props.y = 0;
  this.loader.addAnimation([{
    start:props.start, duration:props.duration,
      text:{string:props.text,name:"multiSceneEffects/monoSpace.ttf",parameters:{depth:1.0}},
      perspective:"3d", 
      color:[{"r":1.0,"g":1.0,"b":1.0,"a":props.a}],
      position:[{
        x:0,
        y:props.y,
        z:2},
       {duration:9},{y:0}],
      scale: [{ uniform3d: 2.9 }],
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
window.currentlyVisible = 0;
Demo.prototype.flashText = function (texts, start, dur)
{
  this.loader.addAnimation({
    start:start, duration:dur,
    prevTime:0,
    currentlyVisible:0,
    runFunction:(animation)=>{
        if(getSceneTimeFromStart() > animation.prevTime)
        {
          animation.prevTime = getSceneTimeFromStart()+.4;
          animation.currentlyVisible++;
          if(animation.currentlyVisible > texts.length-1)
          {
            animation.currentlyVisible = 0;
          }

          window.currentlyVisible = animation.currentlyVisible;
          console.log("currentlyVisible: " + window.currentlyVisible, " texts.length: " + texts.length);
        }
        

    }
});
  for (let i=0; i<texts.length;i++)
  {
        let myVisible=i;
        this.basicText({text:texts[i],x:0,y:0,start: start, duration:dur,scale:6.0, a:()=>(window.currentlyVisible == myVisible) ? 1.0 : 0.0});
  }
}
