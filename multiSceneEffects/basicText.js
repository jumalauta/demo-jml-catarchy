Demo.prototype.basicText = function (props)
{

  this.loader.addAnimation([{
      text:{string:props.text,name:"multiSceneEffects/monoSpace.ttf"},
      perspective:"3d", 
      color:[{"r":1.0,"g":0.1,"b":0.1,"a":1.0}],
      position:[{
        x:.5,
        y:0,
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