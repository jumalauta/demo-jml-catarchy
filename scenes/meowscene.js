Demo.prototype.sceneMeow = function () {
  this.setScene('meow');


  for(let i = 0; i < 40; i++) {
    this.basicText({ text: "Meow",
        x: (Utils.random() - 0.5) * 6.0,
        y: (Utils.random() - 0.5) * 4.0,
        scale: 10.0 + Utils.random() * 2.0,
        start: i * 0.1,
        duration: 10.0 });
  }
}
