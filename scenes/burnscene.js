Demo.prototype.sceneBurn = function () {
    this.setScene('burn');

  this.loader.addAnimation({
   image:'scenes/smokeback.png',
   scale:{uniform2d:2.0},
   position:[{x:0.0,y:-0.5},{duration:12,x:0.0,y:1.0}],
    shader:{name:"scenes/smoke.fs"
      ,variable: [
        {name:"strength",value:[1.0]},
        {name:"iteration",value:[Utils.random()*30.0]}
      ]
      },
    });  
  const blackness = 0.45;

  this.loader.addAnimation({
    image: ['_embedded/defaultTransparent.png', 'scenes/firepattern1.png'],
    additive:true,
    color:[{r:blackness*0.5,g:blackness*0.5,b:blackness*0.5,a:()=>Sync.get('fireTransition:alpha', 1.0)}],
    scale:{x:2},
    shader: {
      name: 'scenes/fire.fs',
      variable: [
        {name:"fireSlide", value:[()=>Sync.get('fireTransition:fireSlide', 2.5)]}
      ]
    }
  });

    this.loader.addAnimation([
      {
        image: {
          name: 'multiSceneEffects/tex_nuke.png'
        },
                scale: [{ uniform2d: 2.95 }],
        perspective: '2d',
        position: [
          {
            x: 0,
            y: 0,
            z: 0
          }
        ],  

      }
    ]);

  this.loader.addAnimation({
    image: ['_embedded/defaultTransparent.png', 'scenes/firepattern1.png'],
    additive:true,
    color:[{r:blackness,g:blackness,b:blackness,a:()=>Sync.get('fireTransition:alpha', 1.0)}],
    shader: {
      name: 'scenes/fire.fs',
      variable: [
        {name:"fireSlide", value:[()=>Sync.get('fireTransition:fireSlide', 4.5)]}
      ]
    }
  });


}
