function rotateY(point, angle) {
  const radians = angle * (Math.PI / 180);
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);

  const x = point.x * cos - point.z * sin;
  const y = point.y;
  const z = point.x * sin + point.z * cos;

  return { x, y, z };
}

Demo.prototype.sceneCat5 = function () {
    this.setScene('cat5');


  let startTime = 0;
  let durationTime = 40;
  let texture = 'multiSceneEffects/tex_basicParticle.png';
  let particleSize = 0.1;
  let parentId = null;

  const meshVertexCount = 240;
  let particles = new Array(meshVertexCount);



    this.basicText({text:"RESISTANCE",x:0,y:0,scale:6.0, start:0, duration: 100});

  this.loader.addAnimation(
    {
      end:-1,
      object: {
        name: 'scenes/anarchya.obj'
      },
      position: [
        {
          x: 0.0,
          y: 0.0,
          z: 0
        }
      ],
    material: {
      blending: "CustomBlending",
      blendEquation: "AddEquation",
      blendSrc: "OneFactor",
      blendDst: "OneFactor",
      transparent: true,
      depthWrite: false,
      alphaWrite: false,
      premultipliedAlpha: false
    },  
      scale: [{ uniform3d: 0.4 }],
      objectOnLoadFunction:(meshData) => {
        if (!meshData.mesh[0].position) {
          throw new Error("Mesh position not found");
        }
        if (meshVertexCount != meshData.mesh[0].position.count/3) {
         // throw new Error("Mesh vertex count mismatch");
        }

        for (let i = 0; i < particles.length; i++) {
          const x = meshData.mesh[0].position.array[i*3+0];
          const y = meshData.mesh[0].position.array[i*3+1];
          const z = meshData.mesh[0].position.array[i*3+2];
          const scatter = 0.04;
          particles[i] = {
            "startX": Utils.random()*10.0 - 5.0,
            "startY": Utils.random()*10.0 - 5.0,
            "startZ": Utils.random()*10.0 - 5.0,
            "x": x+Utils.random()*scatter-scatter/2.0,
            "y": y+Utils.random()*scatter-scatter/2.0,
            "z": z+Utils.random()*scatter-scatter/2.0,
            "scale": Utils.random()*0.7+0.3,
          };
        }
      }
      //color: [{r:.45,g:.0,b:.0}],
    }
  );

  this.loader.addAnimation({
      image: { name: 'scenes/pikka1.png'},
    textureProperties: [{},{minFilter: 'NearestMipmapNearestFilter', magFilter: 'LinearFilter'}],
   // "parent":parentId,
    position: [
      {
        x: 0.0,
        y: -.1,
        z: 0
      }
    ],
    angle:[{             
        degreesX:-90,  
        degreesZ:()=>250*getSceneTimeFromStart()
      }],
    scale: [{ uniform3d: 0.8 }],
    "perspective": "3d",
    "billboard": true,
    color: [{r:1,g:1,b:1}],
    material: {
      blending: "CustomBlending",
      blendEquation: "AddEquation",
      blendSrc: "OneFactor",
      blendDst: "OneFactor",
      transparent: true,
      depthWrite: false,
      alphaWrite: false,
      premultipliedAlpha: true
    },
    transparent:true,

    //"scale":[{"uniform3d":.1}],
    "instancer": {
      "count": particles.length,
      "runInstanceFunction": (properties) => {

        const i = properties.index;
        const count = properties.count;
        const time = properties.time;
        let object = properties.object;
        let color = properties.color;

        const particle = particles[i];

        let scale = 0.24;

        //const rotatedPosition = rotateY(particle, -getSceneTimeFromStart()*40);
        const rotatedPosition = particle;
        const progress = Math.min(time/7.0, 1.0);
        object.position.x = Utils.interpolate(progress, rotatedPosition.startX, rotatedPosition.x, 0);
        object.position.y = Utils.interpolate(progress, rotatedPosition.startY, rotatedPosition.y, 0);
        object.position.z = Utils.interpolate(progress, rotatedPosition.startZ, rotatedPosition.z, 0);

        if (time >= 9.0) {
          scale = Utils.random() > 0.1 ? scale + Math.sin(i%2 + time * 20.0) * 0.02 : 0.0;
        } else {
          scale += Math.sin(i%2 + time * 20.0) * 0.1 * ((1.0-progress)+0.02);
        }


        object.scale.x = scale;
        object.scale.y = scale;
        object.scale.z = scale;
      }
    }
    
  });    
}

