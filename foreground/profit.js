Demo.prototype.profit = function () {
    this.setScene('profit');

      this.loader.addAnimation([{
      image: { name: 'foreground/tex_dollar.png'},
      perspective: '3d',
      position:[{
        x:0.1,
        y:()=>(getSceneTimeFromStart()%1.0)*4-2,
        z:0},
       {duration:9},{y:0}],
      scale:[{"uniform3d":()=>Sync.get('Foreground:scale2')}]

    }]);

        this.basicText({text:"PROFIT",x:0,y:0,scale:1.0, start:0, duration: 100});
}
