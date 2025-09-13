Demo.prototype.kill = function () {
    this.setScene('kill');

      this.loader.addAnimation([{
      object:{
          "name":"foreground/spikeball.obj"
        }
      ,position:[{
        x:()=>Math.sin(getSceneTimeFromStart()),
        y:-.8,
        z:0
      }]
      ,scale:[{"uniform3d":.5}]
      ,angle:[{             
        degreesX:()=>-50*getSceneTimeFromStart() ,      
        degreesY:()=>0 ,    
        degreesZ:()=>50*getSceneTimeFromStart() ,               
      }]
    }]);

      this.loader.addAnimation([{
      object:{
          "name":"foreground/spikeball.obj"
        }
      ,position:[{
        x:-.5,
        y:.9,
        z:0.5
      }]
      ,scale:[{"uniform3d":.5}]
      ,angle:[{             
        degreesX:()=>-50*getSceneTimeFromStart() ,      
        degreesY:()=>0 ,    
        degreesZ:()=>50*getSceneTimeFromStart() ,               
      }]
    }]);

    this.basicText({text:"KILL",x:0,y:0,scale:5.0, start:0, duration: 100});
}
