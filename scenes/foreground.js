Demo.prototype.sceneForeground = function () {
    this.setScene('foreground');

    this.loader.addAnimation({
        image: ['_embedded/defaultWhite.png', 'spectogram.png' ],
        shader:{name:"multiSceneEffects/randomLines.fs"}
    });

}
