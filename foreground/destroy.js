Demo.prototype.destroy = function () {
  this.setScene('destroy');

      this.addEffectExplosion(
        "multiSceneEffects/tex_BasicParticle.png", // texture
        null,                   // model
        0,10,  // startTime, duration
        5, 100, .25,             // maxDist, amount
        0,0,0,                // posX, posY, posZ
        0,0,0,                  // startDim       
        1,1,1,                // dimX, dimY, dimZ
        0,0,0,                 // xOffset, yOffset, zOffset
        "SubtractiveBlending",
        null);

        this.addEffectExplosion(
          "multiSceneEffects/tex_basicParticle.png", // texture
          null,                   // model
          0,10,           // startTime, duration
          5, 100, .25,              // maxDist, amount
          0,0,1,                // posX, posY, posZ
          0,0,0,                  // startDim       
          1,1,1,                // dimX, dimY, dimZ
          0,0,0,                 // xOffset, yOffset, zOffset
          "AdditiveBlending",
          null);
          
    this.basicText({text:"DESTROY",x:0,y:0,scale:1.0, start:0, duration: 100});

}