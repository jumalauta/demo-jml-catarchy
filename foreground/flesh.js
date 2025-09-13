Demo.prototype.flesh = function () {
  this.setScene('flesh');

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
          
    this.basicText({text:"FLESH",x:0,y:0,scale:5.0, start:0, duration: 100});

}