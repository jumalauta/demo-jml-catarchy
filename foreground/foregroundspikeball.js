Demo.prototype.sceneForegroundSpikeball = function () {
    this.setScene('foregroundSpikeball');

      this.loader.addAnimation([{
      object:{
          "name":"foreground/spikeball.obj"
        }
      ,position:[{
        x:0,
        y:0,
        z:0
      }]
      ,scale:[{"uniform3d":()=>Sync.get('Foreground:scale')}]
      ,angle:[{             
        degreesX:()=>-50*getSceneTimeFromStart() ,      
        degreesY:()=>0 ,    
        degreesZ:()=>50*getSceneTimeFromStart() ,               
      }]
    }]);
}