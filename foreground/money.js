Demo.prototype.money = function () {
    this.setScene('money');

      this.addEffectExplosion(
        "foreground/tex_dollar.png", // texture
        null,                   // model
        0,10,  // startTime, duration
        5, 220, .15,             // maxDist, amount
        0,0,0,                // posX, posY, posZ
        0,0,0,                  // startDim       
        1,1,1,                // dimX, dimY, dimZ
        0,0,0,                 // xOffset, yOffset, zOffset
        "AdditiveBlending",
        null);

      this.addEffectExplosion(
        "foreground/tex_dollar.png", // texture
        null,                   // model
        0,10,  // startTime, duration
        5, 100, .15,             // maxDist, amount
        0,0,0,                // posX, posY, posZ
        0,0,0,                  // startDim       
        1,1,1,                // dimX, dimY, dimZ
        0,0,0,                 // xOffset, yOffset, zOffset
        "AdditiveBlending",
        null);

    this.basicText({text:"MONEY",x:0,y:0,scale:5.0, start:0, duration: 100});
}
