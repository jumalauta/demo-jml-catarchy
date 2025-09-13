Demo.prototype.sceneForegroundGear = function () {
    this.setScene('foregroundGear');

      this.loader.addAnimation([{
      object:{
          "name":"foreground/gear.obj"
        }
      ,position:[{
        x:0,
        y:0,
        z:0
      }]
      ,scale:[{"uniform3d":()=>Sync.get('Foreground:scale')}]
      ,angle:[{             
        degreesX:()=>-90+25*Math.sin(-2*getSceneTimeFromStart()) ,      
        degreesY:()=>100*getSceneTimeFromStart()              
      }]
    }]);
}