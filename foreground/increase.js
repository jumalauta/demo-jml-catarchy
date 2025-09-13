Demo.prototype.increase = function () {
    this.setScene('increase');

        this.addEffectExplosion(
          "multiSceneEffects/tex_basicParticle.png", // texture
          null,                   // model
          0,10,           // startTime, duration
          5, 400, .125,              // maxDist, amount
          0,0,1,                // posX, posY, posZ
          0,0,0,                  // startDim       
          2,1,1,                // dimX, dimY, dimZ
          0,0,0,                 // xOffset, yOffset, zOffset
          "AdditiveBlending",
          null);

      this.loader.addAnimation([{
      image: { name: 'foreground/increase.png'},
      perspective: '3d',
      position:[{
        x:()=>(2*getSceneTimeFromStart()%1.0)*-2,
        y:()=>(10*getSceneTimeFromStart()%1.0)*-2,
        z:0}],
      scale:[{"uniform3d":()=>Sync.get('Foreground:scale2')}],
      color:[{"r":()=>Math.random(),"g":()=>Math.random(),"b":()=>Math.random(),"a":1.0}]
    }]);

        this.basicText({text:"INCREASE",x:0,y:0,scale:1.0, start:0, duration: 100});
}
