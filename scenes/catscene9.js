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

    this.basicText({text:"Meow",x:0,y:0,scale:6.0, start:0, duration: 100});
}
