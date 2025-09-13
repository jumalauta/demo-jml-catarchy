Demo.prototype.addPointer = function () {
  for (var i = 0; i < 40; i++) {
      this.loader.addAnimation ({
          id:"pointer"+i,
          image: "scenes/laserpoint.png",
          scale:[{uniform2d:0.1+0.1*(i/40)}],
          additive:true,
          position:[{p:i/30.0,
              x:(animation) =>  (0.4*Math.sin(getSceneTimeFromStart()*5+animation.p)),
              y:(animation) =>  (0.1*Math.cos(getSceneTimeFromStart()*5+animation.p))},
              {duration:2,p:i/30.0,
              x:(animation) =>  (0.2*Math.sin(getSceneTimeFromStart()*5+animation.p)),
              y:(animation) =>  (0.3*Math.cos(getSceneTimeFromStart()*5+animation.p))},
              {duration:2,p:i/30.0,
              x:(animation) =>  (0.6*Math.cos(getSceneTimeFromStart()*5+animation.p)),
              y:(animation) =>  (0.3*Math.sin(getSceneTimeFromStart()*5+animation.p))},
              {duration:2,p:i/30.0,
              x:(animation) =>  (0.1*Math.sin(getSceneTimeFromStart()*5+animation.p)),
              y:(animation) =>  (0.4*Math.cos(getSceneTimeFromStart()*5+animation.p))},
              {duration:2,p:i/30.0,
              x:(animation) =>  (0.15*Math.sin(getSceneTimeFromStart()*10+animation.p)),
              y:(animation) =>  (0.2*Math.cos(getSceneTimeFromStart()*10+animation.p))},
              {duration:2,p:i/30.0,
              x:(animation) =>  (0.1*Math.sin(getSceneTimeFromStart()*15+animation.p)),
              y:(animation) =>  (0.1*Math.cos(getSceneTimeFromStart()*15+animation.p))},
          ],
          color:[{a:0},{duration:1,a:200*(i/40)}]
      });
  }
      const aFunc = ()=>0.5+0.5*(Math.sin(getSceneTimeFromStart()*3)+1)/2;
  this.loader.addAnimation({
    parent:"pointer39",
    image:['scenes/crosshair.png'],
    color:[{r:0,g:0.0,b:0.0,a:aFunc}],
    angle:[{
      degreesZ:()=>-3*Math.sin(3*getSceneTimeFromStart())
      }],
    scale:[{uniform2d:2.0}],
    shader:{name:'scenes/crosshair.fs'}
  });

};

Demo.prototype.sceneCat8 = function () {
    this.setScene('cat8');

    this.loader.addAnimation([{
      image: { name: 'scenes/pikka1.png'},
      perspective: '3d',
      position:[{
        x:()=>Math.sin(getSceneTimeFromStart()*2),
        y:()=>.5*Math.cos(getSceneTimeFromStart()*2)+getSceneTimeFromStart()%window.beat,
        z:0}],
      scale:[{"uniform3d":()=>Sync.get('Foreground:scale2')}],
      color:[{"r":0.1,"g":1.0,"b":1.0,"a":1.0}],
    }]);

    this.addPointer();

    this.basicText({text:"Purr",x:0,y:0,scale:6.0, start:0, duration: 100});
}
