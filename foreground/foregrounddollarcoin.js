Demo.prototype.sceneForegroundDollarCoin = function () {
    this.setScene('foregroundDollarCoin');

      this.loader.addAnimation([{
      image: { name: 'foreground/liberty.png'},
      perspective: '3d'
      ,position:[{
        x:0,
        y:0,
        z:0
      }]
      ,scale:[{"uniform3d":()=>Sync.get('Foreground:scale2')}]
      ,angle:[{             
        degreesZ:()=>100*getSceneTimeFromStart() ,               
      }]
    }]);
}