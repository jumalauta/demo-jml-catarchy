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
      "name": "scenes/catbody_normal.obj"
    }
    , position: [{
      x: 0,
      y: () => .5 + Sync.get('Cat:Jump') * (-.5 + 1.3 + Math.sin((getSceneTimeFromStart() * 16))),
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
    this.basicText({text:"Meow",x:0,y:0,scale:6.0, start:0, duration: 100});
}
