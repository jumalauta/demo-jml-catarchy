Demo.prototype.sceneCat6 = function () {
    this.setScene('cat6');

      this.loader.addAnimation([{
      object:{
          "name":"scenes/guillotine.obj"
        }
      ,position:[{
        x:0,
        y:-.5,
        z:-10
      }]
      ,scale:[{"uniform3d":1}]
      ,angle:[{             
    
        degreesY:()=>90
             
      }]
    }]);

      this.loader.addAnimation([{
      object:{
          "name":"scenes/guillotinecat.obj"
        }
      ,position:[{
        x:0,
        y:-.5,
        z:-10
      }]
      ,scale:[{"uniform3d":1}]
      ,angle:[{             
    
        degreesY:()=>90
             
      }]
    }]);

      this.loader.addAnimation([{
      image: { name: 'scenes/putin.png'},
      perspective: '3d',
      position:[{
        x:.1,
        y:.05,
        z:-8.5}],
      scale:[{"uniform3d":1.75}],
      billboard:true,
      color:[{"r":1.0,"g":1.0,"b":1.0,"a":1.0}],
    }]);

    this.basicText({text:"Purr",x:0,y:0,scale:6.0, start:0, duration: 100});
}
