Demo.prototype.sceneCat7 = function () {
    this.setScene('cat7');
      this.loader.addAnimation([{
      image: { name: 'scenes/system.png'},
      perspective: '3d',
      position:[{
        x:0,
        y:()=>Sync.get('System:systemY'),
        z:0}],
      scale:[{"x":1.70, "y":()=>Sync.get('System:systemYscale')}],
      color:[{"r":1.0,"g":0.1,"b":0.1,"a":1.0}],
    }]);
      this.loader.addAnimation([{
      image: { name: 'scenes/bigpikka.png'},
      perspective: '3d',
      position:[{
        x:0,
        y:()=>Sync.get('System:systemYpikke'),
        z:0}],
      scale:[{"uniform3d":()=>Sync.get('Foreground:scale2')}],
      color:[{"r":.5,"g":0.1,"b":.85,"a":1.0}],
    }]);


}
