Demo.prototype.addEffectTunnel = function () {
  const length = 20.0;
  const thickness = 5.;

  const animationDefinition1 = {
    object: '_embedded/defaultWhite.png',
    //billboard: true,
    material: {
      type: 'Standard',
      //side: 'DoubleSide',
      roughness: 0.1,
      metalness: 0.8,
      castShadow: false,
      receiveShadow: false,
      blending: 'AdditiveBlending',
      transparent:true,
      depthWrite:false,
      //envMap: 'cube1.cube.map'

    },
    shader: {
      fragmentShaderPrefix:`
uniform float time;

float rand() {
  return fract(sin(time+dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void drawLaser()
{
    vec4 color1 = vec4(0.1,.4,0.8,1.);
    vec2 coord=vMapUv;

    // sin wavy
    coord.s = coord.s + sin(time*20.0 + coord.t * 15.0) * 0.05;

    float y = coord.t * 2.0;
    if (y > 1.0) {
      y = 2.0 - y;
    }

    float x = coord.s * 2.0;
    if (x > 1.0) {
      x = 2.0 - x;
    }
    //gl_FragColor.rgb = gl_FragColor.rgb * 0.3 + vec3(x*y) * 0.7;
    gl_FragColor.rgb = vec3(x*y);
    float originalAlpha = gl_FragColor.a;
    gl_FragColor.a = (0.6 + 0.4*rand());

    // moire pattern
    vec2 gridCoord = floor(coord * 3000.0 / 10.0);
    if (mod(gridCoord.x + gridCoord.y, 2.0) == 0.0) {
        gl_FragColor.rgb *= 0.6;
    }

    gl_FragColor.rgba *= color1;
    gl_FragColor.a *= originalAlpha;
    if (gl_FragColor.b < 0.2) {
      discard;
    }


}
      `,
      fragmentShaderSuffix:`drawLaser();`
    },
    shape: {
        type: 'PLANE',
        width: thickness,
        height: length,
    },
  };


  const animationDefinition = animationDefinition1;

  let id = 'tunnel';
  this.loader.addAnimation({
    object: null,
    visible:()=>Sync.get('Tunnel:vis', 1.0) < 1 ? false : true,
    id: id,
    position:{
      x:()=>Sync.get('Tunnel:posX', 0.0),
      y:()=>Sync.get('Tunnel:posY', 0.0),
      z:()=>Sync.get('Tunnel:posZ', -40.0)
    },
    angle:{
      degreesX:()=>Sync.get('Tunnel:degX', 0.0),
      degreesY:()=>Sync.get('Tunnel:degY', 0.0),
      degreesZ:()=>Sync.get('Tunnel:degZ', 0.0)
    },
    scale:{uniform3d:()=>Sync.get('Tunnel:scale', 1.0)}
  });

  // lines

  const circlePoints = 20;
  const particles = new Array(500);
  const lines = particles.length / 2;
  for(let i = 0, j = 0; i < particles.length; j++, i++) {
    const radius = 15+5*Utils.random();

    const randomPoint = Math.floor(Utils.random()*circlePoints);
    const percent1 = randomPoint / circlePoints;
    const percent2 = ((randomPoint + 1) % circlePoints) / circlePoints;

    const angle1 = (percent1) * Math.PI * 2;
    const angle2 = (percent2) * Math.PI * 2;
    const x1 = Math.cos(angle1) * radius;
    const y1 = Math.sin(angle1) * radius;
    const x2 = Math.cos(angle2) * radius;
    const y2 = Math.sin(angle2) * radius;
    const interpolatePercent = Utils.random();
    const x = Utils.interpolateLinear(interpolatePercent, x1, x2);
    const y = Utils.interpolateLinear(interpolatePercent, y1, y2);
    const z = Utils.random() * -100.0 + 20;

    const particle = {
      x: x,
      y: y,
      z: z,
      color: {
        r: Math.ceil(Utils.random()),
        g: Math.ceil(Utils.random()),
        b: Math.ceil(Utils.random()),
        a: 1.0
      },
      angle: {
        degreesX: 90,
        degreesY: percent1 * 360 + -45,
        degreesZ: 0
      }
    };
    particles[i] = particle;
    //particles[i+1] = particle;
  }

  const runInstanceFunction = (properties) => {

          const i = properties.index;
          const particle = particles[i];

          const count = properties.count;
          const time = properties.time;
          let object = properties.object;
          let color = properties.color;
          color.r = particle.color.r;
          color.g = particle.color.g;
          color.b = particle.color.b;
          color.a = particle.color.a;

          const alpha = Sync.get('Tunnel:scale', 1.0);
          let scale = alpha;

          const side = i % 2;

          object.scale.x = scale;
          object.scale.y = scale;
          object.scale.z = scale;

          object.position.x = particle.x;
          object.position.y = particle.y;
          object.position.z = ((getSceneTimeFromStart()*80.0+particle.z)%80.0)+particle.z;

          const deg2rad = Math.PI / 180;
          properties.angle.degreesX = particle.angle.degreesX * deg2rad;
          properties.angle.degreesY = particle.angle.degreesY * deg2rad;
          //properties.angle.degreesY = (side*90) * deg2rad;
          //properties.angle.degreesY = (i/10.0+getSceneTimeFromStart()*0*360.0+side*90) * deg2rad;
          properties.angle.degreesZ = particle.angle.degreesZ * deg2rad;


          };

      this.loader.addAnimation({
        parent: id,
        visible:()=>Sync.get('Tunnel:t1vis', 1.0) < 1 ? false : true,
        ...Utils.deepCopyJson(animationDefinition),
        instancer: {
          count: particles.length,
          runInstanceFunction: runInstanceFunction
        }
      });



};

Demo.prototype.sceneCat4 = function () {
  this.setScene('cat4');

  this.addEffectTunnel();

    this.loader.addAnimation([{
    id: "skateboard",
    object: {
      "name": "scenes/skateboard.obj"
    }
    , position: [{
      x: ()=>.3*Math.sin(8*getSceneTimeFromStart())-3,
      y: -3,
      z: -10
    }]
    , scale: [{ "uniform3d": 1 }]
    , angle: [{

      degreesY: () => 90 + 15 * Math.sin(2 * getSceneTimeFromStart()),      
    }]
  }]);

    this.loader.addAnimation([{
    id: "catbody",
    parent:"skateboard",
    object: {
      "name": "scenes/catbody_normal.obj"
    }
    , position: [{
      x: 0,
      y: ()=>.5+Sync.get('Cat:Jump')*(-.5+1.3+ Math.sin((getSceneTimeFromStart()*16))),
      z: 0
    }]
    , scale: [{ "uniform3d": 1 }]
    , angle: [{
    }]
  }]);


  this.loader.addAnimation([{
    parent: "catbody",
    object: {
      "name": "scenes/aurinkolasikissa.obj"
    }
    , position: [{
      x: 0,
      y: 3,
      z: 2
    }]
    , scale: [{ "uniform3d": 1 }]
    , angle: [{
      degreesX: () => (getSceneTimeFromStart() % window.beat) * -150 + 45,
      degreesY: () => -90 + 45 * Math.sin(5 * getSceneTimeFromStart()),
      degreesZ: () => 0,
    }]
  }]);
  this.flashText(['CRUSH', 'THE', 'HETERONORMATIVE', 'STRUCTURES'],0,1*window.pattern);
  this.flashText(['SMASH', 'THE', 'OPPRESSION'],2*window.pattern,1*window.pattern);
  this.flashText(['EMBRACE','THE','CHAOS'],4*window.pattern,1*window.pattern);
  this.flashText(['KILL','THE','IMMORTAL','EMPEROR'],6*window.pattern,1*window.pattern);
  // this.basicText({ text: "Purr", x: 0, y: 0, scale: 6.0, start: 0, duration: 100 });
}
