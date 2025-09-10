Demo.prototype.sceneCat7 = function () {
    this.setScene('cat7');

      this.loader.addAnimation([{
      image: { name: 'scenes/pikka1.png'},
      perspective: '3d',
      position:[{
        x:()=>Math.sin(getSceneTimeFromStart()*2),
        y:()=>.5*Math.cos(getSceneTimeFromStart()*2)+getSceneTimeFromStart()%window.beat,
        z:0}],
      scale:[{"uniform3d":()=>Sync.get('Foreground:scale2')}],
      color:[{"r":1.0,"g":0.1,"b":0.1,"a":1.0}],
    }]);

    this.basicText({text:"Meow",x:0,y:0,scale:6.0, start:0, duration: 100});
}
