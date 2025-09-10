Demo.prototype.addEffectStarfield = function (startTime, durationTime, amountOfParticles, texture, areaSizeX,areaSizeY,areaSizeZ, particleSize, parentId,x,y,z, speed = 1.0, directionFlip = 0.0, highlight = false)
{
  const recalcThreshold = 0.1;

  let stars = new Array(amountOfParticles);
  const sizeX = areaSizeX;
  const sizeY = areaSizeY;
  const sizeZ = areaSizeZ;
  for (let i = 0; i < stars.length; i++) {
    let z1 = Utils.random()
    stars[i] = {
      "x0": Utils.random()*sizeX*2-sizeX+x,
      "y0": Utils.random()*sizeY*2-sizeY+y,
      "x1": Utils.random()*sizeX*2-sizeX+x,
      "y1": Utils.random()*sizeY*2-sizeY+y,
      "z1": Utils.random()*sizeZ*2-sizeZ+z,
      "z2": z
    };
  }

  z = -50;
  this.loader.addAnimation({
    "start":startTime, "duration":durationTime,
    "image": texture,
    textureProperties: [{},{minFilter: 'NearestMipmapNearestFilter', magFilter: 'LinearFilter'}],
    "parent":parentId,
    "position":[{
      "x":0,
      "y":0,
      "z":-50,
    }],
    "angle":[{"degreesY":180}],
    "perspective": "3d",
    "billboard": true,
    "additive": true,
    "material":{
      "blending": 'AdditiveBlending',
      "transparent":true,
      "depthWrite":false,

    },
    "scale":[{"uniform3d":.1}],
    "instancer": {
      "count": stars.length,
      "runInstanceFunction": (properties) => {

        const i = properties.index;
        const count = properties.count;
        const time = properties.time;
        let object = properties.object;
        let color = properties.color;

        let scale = particleSize;

        if (highlight) {
          color.r = 1.0;
          color.g = 0.0;
          color.b = 0.0;
          scale *= 1.3;
        }

        object.scale.x = scale;
        object.scale.y = scale;
        object.scale.z = scale;

        const realSizeZ = 500;
        const percent = -(.15*getSceneTimeFromStart())%1.0;
        stars[i].z2 = (percent*realSizeZ*2+stars[i].z1);
        if(stars[i].z2<-realSizeZ)
          stars[i].z2+=realSizeZ*2;

        object.position.z = stars[i].z2;
        object.position.x = stars[i].x1;
        object.position.y = stars[i].y1;
        if (highlight) {
          object.position.x += Math.sin(time*speed*1000.0)*1.0;
          object.position.y += Math.cos(time*speed*1000.0)*1.0;
        }

        }
      }
    
  });
}