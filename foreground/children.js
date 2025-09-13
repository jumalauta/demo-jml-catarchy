Demo.prototype.children = function () {
    this.setScene('children');

      this.loader.addAnimation([{
      image: { name: 'foreground/boat_seppo.png'},
      perspective: '3d',
      position:[{
        x:()=>Math.sin(getSceneTimeFromStart()),
        y:()=>1.5*Math.sin(2*getSceneTimeFromStart()),
        z:0}],
      scale:[{"uniform3d":()=>1.5*Sync.get('Foreground:scale2')}]

    }]);

    this.basicText({text:"CHILDREN",x:0,y:0,scale:5.0, start:0, duration: 100});
}
