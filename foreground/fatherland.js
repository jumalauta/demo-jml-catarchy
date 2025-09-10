Demo.prototype.fatherland
 = function () {
    this.setScene('fatherland');

      this.loader.addAnimation([{
      image: { name: 'foreground/statueofliberty.png'},
      perspective: '3d',
      position:[{
        x:0.1,
        y:0,
        z:0},
       {duration:9},{y:0}],
      scale:[{"uniform3d":()=>Sync.get('Foreground:scale2')}]

    }]);

    this.basicText({text:"FATHERLAND",x:0,y:0,scale:5.0, start:0, duration: 100});
}
