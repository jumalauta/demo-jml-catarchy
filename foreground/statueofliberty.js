Demo.prototype.sceneStatueOfLiberty = function () {
    this.setScene('statueOfLiberty');

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
}
