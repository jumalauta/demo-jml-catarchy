Demo.prototype.worship = function () {
    this.setScene('worship');

      this.loader.addAnimation([{
      image: { name: 'foreground/penta.png'},
      perspective: '3d',
      color:[{"r":()=>Math.random(),"g":()=>Math.random(),"b":()=>Math.random(),"a":1.0}]
      ,position:[{
        x:0,
        y:0,
        z:0
      }]
      ,scale:[{"uniform3d":()=>Sync.get('Foreground:scale2')}]
      ,angle:[{             
        degreesZ:()=>-100*getSceneTimeFromStart() ,               
      }]
    }]);

        this.basicText({text:"WORSHIP",x:0,y:0,scale:1.0, start:0, duration: 100});
}
