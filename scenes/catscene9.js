Demo.prototype.sceneCat9 = function () {
    this.setScene('cat9');

  this.loader.addAnimation([{
    id: "skateboard",
    object: {
      "name": "scenes/skateboard.obj"
    }
    , position: [{
      x: () => .3 * Math.sin(8 * getSceneTimeFromStart()),
      y: -3,
      z: -10
    }]
    , scale: [{ "uniform3d": 1 }]
    , angle: [{

      degreesY: () => -90 + 15 * Math.sin(2 * getSceneTimeFromStart()),
    }]
  }]);

  this.loader.addAnimation([{
    id: "catbody",
    parent: "skateboard",
    object: {
      "name": "scenes/catbody_sitting.obj"
    }
    , position: [{
      x: 0,
      y: () => .15,
      z: 0
    }]
    , scale: [{ "uniform3d": 1 }]
    , angle: [{
      degreesX:10 
    }]
  }]);


  this.loader.addAnimation([{
    parent: "catbody",
    object: {
      "name": "scenes/aurinkolasikissa.obj"
    }
    , position: [{
      x: 0,
      y: 4.5,
      z: -.5
    }]
    , scale: [{ "uniform3d": 1 }]
    , angle: [{
      degreesX: () => (getSceneTimeFromStart() % window.beat) * -150 + 45,
      degreesY: () => -90 + 45 * Math.sin(5 * getSceneTimeFromStart()),
      degreesZ: () => 0,
    }]
  }]);

  this.loader.addAnimation([{
    parent: "catbody",
    id: "ak47_1",
    object: {
      "name": "multiSceneEffects/obj_ak.obj"
    }
    , position: [{
      x: 1,
      y: 3,
      z: 1
    }]
    , scale: [{ "uniform3d": 1 }]
    , angle: [{
      degreesX: () => Math.sin(5 * getSceneTimeFromStart()),
      degreesY: () => 90 +5*Math.sin(5 * getSceneTimeFromStart()),
      degreesZ: () => 0,
    }]
  }]);  

  this.loader.addAnimation([{
    parent: "catbody",
    id: "ak47_2",
    object: {
      "name": "multiSceneEffects/obj_ak.obj"
    }
    , position: [{
      x: -1,
      y: 3,
      z: 1
    }]
    , scale: [{ "uniform3d": 1 }]
    , angle: [{
      degreesX: () => Math.sin(5 * (getSceneTimeFromStart()+.5)),
      degreesY: () => 90 +5*Math.sin(5 * (getSceneTimeFromStart()+.5)),
      degreesZ: () => 0,
    }]
  }]);  

  for (let i = 0; i < 2; i++) {
    const parentId = "ak47_" + (i + 1);
        const muzzleAlpha = ()=>{
          //return 1.0;
          const ak47BurstRate = 100./60.*25.;
          const fire = 1.0;
          const value = fire*((Math.sin(i*0.8+ak47BurstRate * (getSceneTimeFromStart() + 10.0))+1)/2);
          return value<0.95?0.0:1.0;
          //return 0.0;
        };
        const muzzleAdditive = true;

        this.loader.addAnimation({
          "parent":parentId
         ,"image":{
            "name":"scenes/muzzle_flame.png"
          }
          ,"additive":muzzleAdditive
          ,"perspective":"3d"
          ,"position":[{
            "x":-3.25,
            "y":0.5,
            "z":0
          }]
          ,"color":[{"a":muzzleAlpha}]
          ,"angle":[{
            "degreesY":-90,
            }]
          ,"scale":[{"uniform3d":()=>1.0+Math.sin(i*getSceneTimeFromStart()*20.0)*0.1}]
          ,"shader":{"name":"scenes/muzzle.fs"
            ,"variable": [
              {"name":"strength","value":[1.0]},
              {"name":"iteration","value":[Utils.random()*30.0]}
            ]
            }
        });  
        this.loader.addAnimation({
          "parent":parentId
         ,"image":{
            "name":"scenes/tex_muzzle.png"
          }
          ,material:{side:'DoubleSide'}
          ,"additive":muzzleAdditive
          ,"perspective":"3d"
          ,"position":[{
            "x":-4.3,
            "y":0.4,
            "z":0
          }]
          ,"color":[{"a":muzzleAlpha}]
          ,"angle":[{
            "degreesX":()=>getSceneTimeFromStart()*1000
            }]
          ,"scale":[{"uniform3d":()=>1.0+Math.sin(i*getSceneTimeFromStart()*20.0)*0.1}]
          ,"shader":{"name":"scenes/muzzle.fs"
            ,"variable": [
              {"name":"strength","value":[1.0]},
              {"name":"iteration","value":[Utils.random()*30.0]}
            ]
            }
        });  
        this.loader.addAnimation({
          "parent":parentId
         ,"image":{
            "name":"scenes/tex_muzzle.png"
          }
          ,material:{side:'DoubleSide'}
          ,"additive":muzzleAdditive
          ,"perspective":"3d"
          ,"position":[{
            "x":-4.3,
            "y":0.4,
            "z":0
          }]
          ,"color":[{"a":muzzleAlpha}]
          ,"angle":[{
            "degreesX":()=>getSceneTimeFromStart()*1000-90
            }]
          ,"scale":[{"uniform3d":()=>1.0+Math.sin(i*getSceneTimeFromStart()*20.0)*0.1}]
          ,"shader":{"name":"scenes/muzzle.fs"
            ,"variable": [
              {"name":"strength","value":[1.0]},
              {"name":"iteration","value":[Utils.random()*30.0]}
            ]
            }
        });
      }

    this.basicText({text:"Meow",x:0,y:0,scale:6.0, start:0, duration: 100});
}
