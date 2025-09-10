Demo.prototype.emperor = function () {
    this.setScene('emperor');

  this.loader.addAnimation([{
    object: {
      "name": "foreground/gear.obj"
    }
    , position: [{
      x: 0,
      y: 0,
      z: 0
    }]
    , scale: [{ "uniform3d": () => .5*Sync.get('Foreground:scale') }]
    , angle: [{
      degreesX: () => -90 + 25 * Math.sin(-2 * getSceneTimeFromStart()),
      degreesY: () => 150 * getSceneTimeFromStart(),
    }]
  }]);

  this.loader.addAnimation([{
    object: {
      "name": "foreground/gear.obj"
    }
    , position: [{
      x: -1.5,
      y: 0,
      z: 0
    }]
    , scale: [{ "uniform3d": () => .5*Sync.get('Foreground:scale') }]
    , angle: [{
      degreesX: () => -90 + 25 * Math.sin(-2 * getSceneTimeFromStart()),
      degreesY: () => -150 * getSceneTimeFromStart(),
    }]
  }]);

  this.loader.addAnimation([{
    object: {
      "name": "foreground/gear.obj"
    }
    , position: [{
      x: 1.5,
      y: 0,
      z: 0
    }]
    , scale: [{ "uniform3d": () => .5*Sync.get('Foreground:scale') }]
    , angle: [{
      degreesX: () => -90 + 25 * Math.sin(-2 * getSceneTimeFromStart()),
      degreesY: () => -150 * getSceneTimeFromStart(),
    }]
  }]);

    this.basicText({text:"EMPEROR",x:0,y:0,scale:5.0, start:0, duration: 100});
}
