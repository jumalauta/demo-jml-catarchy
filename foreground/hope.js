Demo.prototype.hope = function () {
    this.setScene('hope');

      this.loader.addAnimation([{
      image: { name: 'foreground/nuclear.png'},
      perspective: '3d',
      position:[{
        x:0.1,
        y:0,
        z:()=>Math.sin(getSceneTimeFromStart())},
       {duration:9},{y:0}],
      angle:[{             
        degreesZ:()=>100*getSceneTimeFromStart() ,               
      }],
      scale:[{"uniform3d":()=>Sync.get('Foreground:scale2')}]

    }]);
        this.basicText({text:"HOPE",x:0,y:0,scale:1.0, start:0, duration: 100});
}
