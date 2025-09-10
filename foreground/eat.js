Demo.prototype.eat = function () {
    this.setScene('eat');

      this.loader.addAnimation([{
      image: { name: 'foreground/eat.png'},
      perspective: '3d',
      position:[{
        x:()=>(getSceneTimeFromStart()%1.0)*4-2,
        y:()=>Math.random()*.05,
        z:0}],
      scale:[{"uniform3d":()=>.5*Sync.get('Foreground:scale2')}]

    }]);
    this.basicText({text:"EAT",x:0,y:0,scale:5.0, start:0, duration: 100});
}
