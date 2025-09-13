Demo.prototype.sceneCat6 = function () {
  this.setScene('cat6');

  this.loader.addAnimation([{
    object: {
      "name": "scenes/guillotine.obj"
    }
    , position: [{
      x: 0,
      y: -.5,
      z: -10
    }]
    , scale: [{ "uniform3d": 1 }]
    , angle: [{

      degreesY: () => 90

    }]
  }]);

  this.loader.addAnimation([{
    object: {
      "name": "scenes/guillotinecat.obj"
    }
    , position: [{
      x: 0,
      y: () => Sync.get('Guillotine:y'),
      z: -10
    }]
    , scale: [{ "uniform3d": 1 }]
    , angle: [{

      degreesY: () => 90

    }]
  }]);

  this.loader.addAnimation([{
    image: { name: 'scenes/putin.png' },
    perspective: '3d',
    position: [{
      x: () => .1 + Sync.get('Guillotine:headX'),
      y: () => .05 + Sync.get('Guillotine:headY'),
      z: -8.5
    }],
    scale: [{ "uniform3d": 1.75 }],
    billboard: true,
    color: [{ "r": 1.0, "g": 1.0, "b": 1.0, "a": 1.0 }],
        angle:[{                      
          degreesY:()=>getSceneTimeFromStart()*116,      
        }],
  }]);

  this.loader.addAnimation([{
    image: { name: 'scenes/trump.png' },
    perspective: '3d',
    position: [{
      x: () => .1 + Sync.get('Guillotine:trumpX'),
      y: () => .05 + Sync.get('Guillotine:trumpY'),
      z: -8.5
    }],
    scale: [{ "uniform3d": 1.75 }],
    billboard: true,
    color: [{ "r": 1.0, "g": 1.0, "b": 1.0, "a": 1.0 }]
    , angle: [{
      degreesZ: () => 3 * Math.sin(getSceneTimeFromStart()) + Sync.get('Guillotine:trumprot'),
    }]
  }]);

  this.addEffectExplosion(
    "multiSceneEffects/tex_basicParticle.png",
    null,                   // model
    .5 * window.pattern, 3,  // startTime, duration
    22, 55, 1.5,  // maxDist, amount, scale
    0, 0, -8.55,        // posX, posY, posZ
    0, 0, 0,        // startDim
    1, 1, .25,   // dimX, dimY, dimZ
    0, 0.1, 0,        // xOffset, yOffset, zOffset
    "SubtractiveBlending", // blendmode
    null);
  this.addEffectExplosion(
    "multiSceneEffects/tex_bloodParticle.png",
    null,                   // model
    .5 * window.pattern, 3,  // startTime, duration
    23, 105, 1.5,  // maxDist, amount, scale
    0, 0, -8.55,        // posX, posY, posZ
    0, 0, 0,        // startDim
    1, 1, .25,   // dimX, dimY, dimZ
    0, 0.1, 0,        // xOffset, yOffset, zOffset
    "AdditiveBlending", // blendmode
    null);
  this.addEffectExplosion(
    "multiSceneEffects/tex_basicParticle.png",
    null,                   // model
    1.5 * window.pattern, 3,  // startTime, duration
    22, 55, 1.5,  // maxDist, amount, scale
    0, 0, -8.55,        // posX, posY, posZ
    0, 0, 0,        // startDim
    1, 1, .25,   // dimX, dimY, dimZ
    0, 0.1, 0,        // xOffset, yOffset, zOffset
    "SubtractiveBlending", // blendmode
    null);
  this.addEffectExplosion(
    "multiSceneEffects/tex_bloodParticle.png",
    null,                   // model
    1.5 * window.pattern, 3,  // startTime, duration
    23, 105, 1.5,  // maxDist, amount, scale
    0, 0, -8.55,        // posX, posY, posZ
    0, 0, 0,        // startDim
    1, 1, .25,   // dimX, dimY, dimZ
    0, 0.1, 0,        // xOffset, yOffset, zOffset
    "AdditiveBlending", // blendmode
    null);

}
