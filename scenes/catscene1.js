Demo.prototype.sceneCat1 = function () {
    this.setScene('cat1');



    this.basicText({text:"MEOW",x:0,y:0,scale:6.0, start:0, duration: window.pattern});
    this.basicText({text:"JUMALAUTA",x:0,y:0,scale:6.0, start:window.pattern, duration: window.pattern});
    this.basicText({text:"PRESENTS",x:0,y:0,scale:6.0, start:window.pattern*2, duration: window.pattern});
    this.basicText({text:"FELES",x:0,y:0.35,scale:6.0, start:window.pattern*3, duration: 2*window.pattern});
    this.basicText({text:"CONTRA",x:0,y:0,scale:6.0, start:window.pattern*3, duration: 2*window.pattern});
    this.basicText({text:"OMNIA",x:0,y:-0.35,scale:6.0, start:window.pattern*3, duration: 2*window.pattern});        
}
