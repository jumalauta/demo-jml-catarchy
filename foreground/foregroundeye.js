Demo.prototype.sceneForegroundEye = function () {
    this.setScene('foregroundEye');

      this.loader.addAnimation([{
      object:{
          "name":"foreground/eye.obj"
        }
      ,position:[{
        x:0,
        y:0,
        z:0
      }]
      ,scale:[{"uniform3d":()=>Sync.get('Foreground:scale')}]
      ,angle:[{             
        degreesX:()=>-90+25*Math.sin(-2*getSceneTimeFromStart()) ,      
        degreesY:()=>0 ,    
        degreesZ:()=>25*Math.cos(-2*getSceneTimeFromStart()) ,               
      }]
    }]);
}