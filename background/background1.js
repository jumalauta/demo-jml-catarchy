Demo.prototype.sceneBackground1 = function () {
    this.setScene('background1');
    
    this.loader.addAnimation([
      {
        image: {
          name: 'background/twirlbg.png'
        },
        perspective: '2d',
        position: [
          {
            x: 0,
            y: 0,
            z: 0
          }
        ],  
        angle:[{                      
          degreesZ:()=>getSceneTimeFromStart()*116,      
        }],
        scale: [{ uniform2d: 2.3 }],
        color: [{
          r: 1, g: 1, b: 1
      }]
      }
    ]);
}