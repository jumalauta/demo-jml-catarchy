Demo.prototype.sceneCat3 = function () {
    this.setScene('cat3');

      this.loader.addAnimation([{
      image: { name: 'scenes/polttopullo.png'},
      perspective: '3d',
      position:[{
        x:()=>Math.sin(getSceneTimeFromStart()*3.5),
        y:()=>.5*Math.cos(getSceneTimeFromStart()*2)+getSceneTimeFromStart()%window.beat,
        z:0}],
      scale:[{"uniform3d":()=>Sync.get('Foreground:scale2')}],
      color:[{"r":1.0,"g":()=>Math.sin(getSceneTimeFromStart()*25)+1,"b":()=>Math.sin(getSceneTimeFromStart()*25)+1,"a":1.0}],
    }]);

      this.loader.addAnimation([{
      image: { name: 'scenes/paw.png'},
      perspective: '3d',
      position:[{
        x:()=>Sync.get('Paw:x'),
        y:()=>Sync.get('Paw:y'),
        z:0}],
      scale:[{"uniform3d":()=>Sync.get('Foreground:scale2')}],
      color:[{"r":()=>Math.sin(getSceneTimeFromStart()*15)+1,"g":1.0,"b":()=>Math.sin(getSceneTimeFromStart()*8)+1,"a":1.0}],
        angle:[{                      
          degreesZ:()=>Sync.get('Paw:angle'),    
        }],
    }]);

    this.basicText({text:"Meow",x:0,y:0,scale:6.0, start:0, duration: 100});
}
