Demo.prototype.sceneBackground1 = function () {
    this.setScene('background1');
    
    this.loader.addAnimation([
      {
        image: {
          name: 'background/twirlbg.png'
        },
        perspective: '2d',
        position: [
          {
            x: 0,
            y: 0,
            z: 0
          }
        ],  
        angle:[{                      
          degreesZ:()=>getSceneTimeFromStart()*116,      
        }],
        scale: [{ uniform2d: 2.3 }],
        color: [{
          r: 1, g: 1, b: 1
      }],
      shader: {
      name: 'background/colorcycle.fs',
      variable: [
        {"name":"centerize","value":[()=>0.0]},
        {"name":"shiftHue", "value":[()=>{
          const time = getSceneTimeFromStart();
          const bpm = 120;
          const changePerBeat = 1.0/8.0;
          const currentBeat = (time/60.0)*bpm;

          if (time > 117.2) {
            return (time*6.0)%1.0;
          }
          //return (time/60.0)*bpm*changePerBeat % 1.0;
          if (currentBeat % 4.0 < 2.0) {
            return (time/60.0)*bpm*changePerBeat % 1.0;
          } else {
            return 0.0;//1.0 + 0.5 * (1.0 - (currentBeat % 1.0)) * 2.0;
          }
      }]},
        {"name":"shiftSaturation", "value":[()=>1.0]},
        {"name":"shiftValue", "value":[()=>{

          const time = getSceneTimeFromStart();
          if (time >= 12 && time < 16) {
            return 0;
          }
          const bpm = 120;
          const currentBeat = (time/60.0)*bpm;
          if (currentBeat % 3.0 < 0.2) {
            return 1.0 + 0.5 * ((currentBeat % 1.0) / 0.2) * 2.0;
          } else {
            return 0.0;//1.0 + 0.5 * (1.0 - (currentBeat % 1.0)) * 2.0;
          }
      }]}
      ]
    }
      }
    ]);
}