Demo.prototype.sceneCat2 = function () {
  this.setScene('cat2');



  this.loader.addAnimation([{
    object: {
      "name": "scenes/aurinkolasikissa.obj"
    }
    , position: [{
      x: 0,
      y: -.5,
      z: -10
    }]
    , scale: [{ "uniform3d": 2 }]
    , angle: [{
      degreesX: () => (getSceneTimeFromStart() % window.beat) * -150 + 45,
      degreesY: () => -90 + 45 * Math.sin(5 * getSceneTimeFromStart()),
      degreesZ: () => 0,
    }]
  }]);

  this.basicText({ text: "Purr", x: 0, y: 0, scale: 6.0, start: 0, duration: 100 });
}
