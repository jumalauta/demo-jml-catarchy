Demo.prototype.sceneForegroundPeace = function () {
    this.setScene('foregroundPeace');

      this.loader.addAnimation([{
      image: { name: 'foreground/peace.png'},
      perspective: '3d'
      ,position:[{
        x:0,
        y:0,
        z:0
      }]
      ,scale:[{"uniform3d":()=>Sync.get('Foreground:scale2')}]
      ,angle:[{             
        degreesZ:()=>90*getSceneTimeFromStart() ,               
      }]
    }]);
}