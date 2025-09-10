Demo.prototype.sceneForegroundJing = function () {
    this.setScene('foregroundJing');

      this.loader.addAnimation([{
      image: { name: 'foreground/xdemo.png'},
      perspective: '3d'
      ,position:[{
        x:0,
        y:0,
        z:0
      }]
      ,scale:[{"uniform3d":()=>Sync.get('Foreground:scale2')}]

    }]);

   
}