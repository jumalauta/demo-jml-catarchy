
const deg2rad = 0.01745329251;
window.camPos = [0.0, 0.0, 0.0];
window.camPosLength = 1.0;
window.camFov = 0.0;
window.beat = 60 / 160;
window.tick = window.beat / 6;
window.pattern = window.beat * 8;
window.camNear = 0.0;
window.camFar = 0.0;
window.globalTime = 0.0;
window.nextSegmentIndex = 0;
window.wrapped = false;
Demo.prototype.cameraSetup = function (stopCamAt) {
    this.loader.addAnimation({
        "camera": "cam1"
        , "position": [{ "x": 0, "y": 0, "z": -5 }]
        , "lookAt": [{ "x": 0.0, "y": 0.0, "z": 0.0 }]
        , "up": [{ "x": 0, "y": 1, "z": 0 }]
        , "perspective": [{ "fov": 75, "aspect": 16 / 9, "near": .05, "far": 1000 }]
        , "distYawPitch": [-5.0, 1, 2.0]
        , "instableTimer": [0.0, 0.0, 0.0, 0.0, 0.0]
        , "runPreFunction": (animation) => {
            if (stopCamAt !== undefined) {
                if (getSceneTimeFromStart() >= stopCamAt) {
                    return;
                }
            }

            for (let i = 0; i < animation.instableTimer.length; i++) {
                animation.instableTimer[i] += Math.random() * getDeltaTime();
            }
            let distance = .05 * Sync.get('Cam:Instability') * Math.sin(2 * animation.instableTimer[3]) + Sync.get('Cam:Distance');
            let pitch = (Sync.get('Cam:Instability') * 5 * Math.cos(2 * animation.instableTimer[1]) + Sync.get('Cam:Yaw')) * deg2rad;
            let roll = (Sync.get('Cam:Instability') * 5 * Math.sin(2 * animation.instableTimer[2]) + Sync.get('Cam:Pitch')) * deg2rad;
            let yaw = 0.0;
            let target = [Sync.get('Cam:TargetX'), Sync.get('Cam:TargetY'), Sync.get('Cam:TargetZ')]
            let points = [0, 0, distance];
            let cosa = Math.cos(yaw),
                sina = Math.sin(yaw);
            let cosb = Math.cos(pitch),
                sinb = Math.sin(pitch);
            let cosc = Math.cos(roll),
                sinc = Math.sin(roll);
            let Axx = cosa * cosb,
                Axy = cosa * sinb * sinc - sina * cosc,
                Axz = cosa * sinb * cosc + sina * sinc;
            let Ayx = sina * cosb,
                Ayy = sina * sinb * sinc + cosa * cosc,
                Ayz = sina * sinb * cosc - cosa * sinc;
            let Azx = -sinb,
                Azy = cosb * sinc,
                Azz = cosb * cosc;
            let px = points[0];
            let py = points[1];
            let pz = points[2];
            let newPoints = [
                (Axx * px + Axy * py + Axz * pz) + target[0],
                Ayx * px + Ayy * py + Ayz * pz + target[1],
                Azx * px + Azy * py + Azz * pz + target[2]
            ];
            window.camPos = newPoints;
            window.camPosLength = Math.sqrt(newPoints[0] * newPoints[0] + newPoints[1] * newPoints[1] + newPoints[2] * newPoints[2]);
            animation.position[0].x = newPoints[0];
            animation.position[0].y = newPoints[1];
            animation.position[0].z = newPoints[2];
            animation.lookAt[0].x = Sync.get('Cam:Instability') * .25 * Math.sin(2 * animation.instableTimer[3]) + Sync.get('Cam:TargetX');
            animation.lookAt[0].y = Sync.get('Cam:Instability') * .25 * Math.cos(2 * animation.instableTimer[4]) + Sync.get('Cam:TargetY');
            animation.lookAt[0].z = Sync.get('Cam:TargetZ');
            animation.perspective[0].fov = Sync.get('Cam:FOV');
            window.camNear = animation.perspective[0].near;
            window.camFar = animation.perspective[0].far;
            window.camFov = animation.perspective[0].fov * deg2rad;
        }
    });

    this.loader.addAnimation({
        "light": {
            "type": "Directional",
            "properties": { "intensity": 6.85 },
            "castShadow": false,
            "shadowProperties": {
                "bias": () => Sync.get('Cam:ShadowBias'),
                "radius": () => Sync.get('Cam:ShadowRadius'),
                "normalBias": () => Sync.get('Cam:ShadowNormalBias')
            }
        }
        , position: [{ x: () => window.camPos[0], y: () => window.camPos[1], z: () => window.camPos[2] + 2.0 }]

        , "color": [{
            "r": () => Sync.get('Light:R'), "g": () => Sync.get('Light:G'), "b": () => Sync.get('Light:B')
        }]
    });
};

Demo.prototype.setScene = function (sceneName) {
    this.loader.setScene(sceneName);
    this.cameraSetup();
};

const settings = new Settings();

settings.engine.preload = false;
settings.engine.tool = true;
settings.demo.renderer.sortObjects = false;
settings.demo.renderer.logarithmicDepthBuffer = false;
settings.demo.sync.rocketFile = 'sync/demo.rocket';
settings.demo.sync.beatsPerMinute = 160;
settings.demo.sync.rowsPerBeat = 8;
settings.demo.camera.near = 0.1;
settings.demo.camera.far = 1000.0;
settings.demo.shadow.mapSize.width = 4096;
settings.demo.shadow.mapSize.height = settings.demo.shadow.mapSize.width;
settings.demo.image.texture.minFilter = 'NearestFilter';
settings.demo.image.texture.magFilter = 'NearestFilter';
//settings.demo.image.texture.wrapS = 'RepeatWrapping';
//settings.demo.image.texture.wrapT = 'RepeatWrapping';
settings.demo.fbo.color.texture.minFilter = 'NearestFilter';
settings.demo.fbo.color.texture.magFilter = 'NearestFilter';
//settings.demo.fbo.color.texture.wrapS = 'RepeatWrapping';
//settings.demo.fbo.color.texture.wrapT = 'RepeatWrapping';

includeFile('multiSceneEffects/PostProcess.js');
includeFile('multiSceneEffects/dof.js')
includeFile('multiSceneEffects/EffectExplosion.js');
includeFile('multiSceneEffects/particleStream.js');
includeFile('multiSceneEffects/EffectStarfield.js');
includeFile('multiSceneEffects/basicText.js');
includeFile('background/background1.js');
includeFile('scenes/catscene1.js');
includeFile('scenes/catscene2.js');
includeFile('scenes/catscene3.js');
includeFile('scenes/catscene4.js');
includeFile('scenes/catscene5.js');
includeFile('scenes/catscene6.js');
includeFile('scenes/catscene7.js');
includeFile('scenes/catscene8.js');
includeFile('scenes/catscene9.js');
includeFile('scenes/burnscene.js');
includeFile('scenes/foreground.js');
includeFile('scenes/meowscene.js');

Demo.prototype.init = function () {
    const start = 0;
    const duration = 180;
    const bpm = 120;
    const beat = 60 / bpm;
    const pattern = beat * 8;

    this.sceneBackground1();
    this.sceneCat1();
    this.sceneCat2();
    this.sceneCat3();
    this.sceneCat4();
    this.sceneCat5();
    this.sceneCat6();
    this.sceneCat7();
    this.sceneCat8();
    this.sceneCat9();
    this.sceneMeow();
    this.sceneBurn();
    this.sceneForeground();

    this.loader.setScene('main');

    let overflow = 0.5;
    const scenes = [
        { start: 0, duration: 129, name: 'background1', bg: true, },
        
        { start: 0, duration: 5*window.pattern, name: 'cat1', bg: false },
        { start: 5*window.pattern, duration: 4*window.pattern, name: 'cat2', bg: false },
        { start: 9*window.pattern, duration: 4*window.pattern, name: 'cat3', bg: false },
        { start: 13*window.pattern, duration: 8*window.pattern, name: 'cat4', bg: false },      
        { start: 21*window.pattern, duration: 4*window.pattern, name: 'cat5', bg: false },
        { start: 25*window.pattern, duration: 2*window.pattern, name: 'cat6', bg: false },
        { start: 27*window.pattern, duration: 4*window.pattern, name: 'cat7', bg: false },
        { start: 31*window.pattern, duration: 4*window.pattern, name: 'cat8', bg: false },
        { start: 35*window.pattern, duration: 8*window.pattern, name: 'cat9', bg: false },   
        { start: 43*window.pattern, duration: 4*window.pattern, name: 'burn', bg: false },   
        { start: 39*window.pattern, duration: 5*window.pattern, name: 'meow', bg: false },   
        { start: 0, duration: 47*window.pattern, name: 'foreground', bg: false, },
        ];

    scenes.forEach((scene) => {
        this.loader.addAnimation({ start: scene.start, duration: scene.duration, scene: { name: scene.name, fbo: { name: scene.name + 'Fbo' } }, ...(scene.parameters || {}) });
    });

    this.loader.addAnimation({ fbo: { name: 'screenFront', action: 'begin', storeDepth: false } });
    scenes.forEach((scene) => {
        if (!scene.bg) {
            this.loader.addAnimation({
                start: scene.start, duration: scene.duration, color: scene.color, image: scene.name + 'Fbo.color.fbo',
            });
        }
    });

    this.loader.addAnimation({ fbo: { name: 'screenFront', action: 'unbind' } });


    this.loader.addAnimation({ fbo: { name: 'screenBg', action: 'begin', storeDepth: false } });
    scenes.forEach((scene) => {
        if (scene.bg) {
            this.loader.addAnimation({ start: scene.start, duration: scene.duration, color: scene.color, image: scene.name + 'Fbo.color.fbo' });
        }
    });




    this.loader.addAnimation({
        image: 'screenFront.color.fbo',
        shader: {
            name: 'multiSceneEffects/background.fs',
            variable: [
                // chainEffectN value = <baseeffect>.<mix amount = .0 (all), .999 (minimum)>
                { name: 'chainEffect0', value: [8] },
                {
                    name: 'mirrorSpeed',
                    value: [
                        () => Sync.get('BgEffect:mirrorSpeedX'),
                        () => Sync.get('BgEffect:mirrorSpeedY')
                    ]
                }
            ]
        }
    });
    this.loader.addAnimation({ fbo: { name: 'screenBg', action: 'unbind' } });





    this.loader.addAnimation({ fbo: { name: 'postProcessableFbo', action: 'begin', storeDepth: false } });
    this.loader.addAnimation({
        image: 'screenBg.color.fbo',
        shader: {
            name: 'multiSceneEffects/gaussianBlur.fs',
            variable: [
                { "name": "directions", "value": [32.0] },
                { "name": "quality", "value": [4.0] },
                { "name": "size", "value": [32.0] }
            ]
        }
    });

    this.loader.addAnimation({ image: 'screenFront.color.fbo' });
    this.loader.addAnimation({ fbo: { name: 'postProcessableFbo', action: 'unbind' } });

    this.addPostProcess('postProcessableFbo.color.fbo');

};


function GetNextCutTime(actualTimeInMs) {
    const segs = window.segments;
    if (!segs || segs.length === 0) return null;

    if (window.nextSegmentIndex >= segs.length) {
        if(window.wrapped == false)
        {
            window.nextSegmentIndex = 0; // wrap if needed
            window.wrapped = true;
        }
        else
            return null;
    }

    const seg = segs[window.nextSegmentIndex];
    const segActualMs = seg.actualTime * 1000; // convert sec → ms

    if (actualTimeInMs >= segActualMs) {
        const cutMs = seg.cutTime * 1000; // convert sec → ms
        window.nextSegmentIndex++;
        console.log("cut time " + cutMs + " ms, next segment: " + window.nextSegmentIndex);
        return cutMs;
    }

    return null;
}

window.segments = [
  { "actualTime": 0.000000, "cutTime": 2.500000 },
  { "actualTime": 1.500000, "cutTime": 2.500000 },
  { "actualTime": 3.000000, "cutTime": 38.000000 },
  { "actualTime": 3.096612, "cutTime": 38.339372 },
  { "actualTime": 3.257239, "cutTime": 38.229283 },
  { "actualTime": 3.367328, "cutTime": 38.141776 },
  { "actualTime": 3.500000, "cutTime": 14.000000 },
  { "actualTime": 5.500000, "cutTime": 24.000000 },
  { "actualTime": 8.500000, "cutTime": 6.404182 },
  { "actualTime": 8.596334, "cutTime": 6.352397 },
  { "actualTime": 8.658476, "cutTime": 6.228113 },
  { "actualTime": 8.762046, "cutTime": 6.134899 },
  { "actualTime": 8.850081, "cutTime": 6.088293 },
  { "actualTime": 8.927759, "cutTime": 6.000258 },
  { "actualTime": 9.000258, "cutTime": 5.927759 },
  { "actualTime": 9.088293, "cutTime": 5.850081 },
  { "actualTime": 9.134899, "cutTime": 5.762046 },
  { "actualTime": 9.228113, "cutTime": 5.658476 },
  { "actualTime": 9.352397, "cutTime": 5.596334 },
  { "actualTime": 9.404182, "cutTime": 5.500000 },
  { "actualTime": 9.500000, "cutTime": 28.500000 },
  { "actualTime": 13.157702, "cutTime": 8.000000 },
  { "actualTime": 14.657702, "cutTime": 32.000000 },
  { "actualTime": 18.978656, "cutTime": 36.320954 },
  { "actualTime": 20.231268, "cutTime": 41.589686 },
  { "actualTime": 21.731268, "cutTime": 38.089686 },
  { "actualTime": 24.171044, "cutTime": 43.358417 },
  { "actualTime": 31.000000, "cutTime": 50.187373 },
  { "actualTime": 31.250000, "cutTime": 50.187373 },
  { "actualTime": 31.500000, "cutTime": 50.187373 },
  { "actualTime": 31.750000, "cutTime": 50.187373 },
  { "actualTime": 32.000000, "cutTime": 50.187373 },
  { "actualTime": 32.250000, "cutTime": 50.187373 },
  { "actualTime": 32.500000, "cutTime": 50.187373 },
  { "actualTime": 32.750000, "cutTime": 50.187373 },
  { "actualTime": 32.956990, "cutTime": 50.321865 },
  { "actualTime": 38.500000, "cutTime": 34.993556 },
  { "actualTime": 39.000000, "cutTime": 55.864875 },
  { "actualTime": 43.102993, "cutTime": 34.096548 },
  { "actualTime": 43.500000, "cutTime": 60.364875 },
  { "actualTime": 48.535017, "cutTime": 65.399892 },
  { "actualTime": 49.694023, "cutTime": 68.080074 },
  { "actualTime": 49.978823, "cutTime": 70.815402 },
  { "actualTime": 50.118381, "cutTime": 67.549756 },
  { "actualTime": 50.223500, "cutTime": 67.047349 },
  { "actualTime": 50.544482, "cutTime": 69.377959 },
  { "actualTime": 50.753818, "cutTime": 70.117614 },
  { "actualTime": 51.032933, "cutTime": 67.774875 },
  { "actualTime": 51.338133, "cutTime": 66.893836 },
  { "actualTime": 51.491646, "cutTime": 69.587296 },
  { "actualTime": 52.035920, "cutTime": 68.945331 },
  { "actualTime": 52.468549, "cutTime": 70.954959 },
  { "actualTime": 52.747664, "cutTime": 70.606065 },
  { "actualTime": 52.957000, "cutTime": 67.368331 },
  { "actualTime": 53.138425, "cutTime": 66.558898 },
  { "actualTime": 53.473363, "cutTime": 67.654875 },
  { "actualTime": 53.593363, "cutTime": 70.396729 },
  { "actualTime": 53.802699, "cutTime": 68.364875 },
  { "actualTime": 54.020305, "cutTime": 68.582481 },
  { "actualTime": 54.452991, "cutTime": 75.953518 },
  { "actualTime": 63.469204, "cutTime": 118.921209 },
  { "actualTime": 64.250000, "cutTime": 118.921209 },
  { "actualTime": 65.030796, "cutTime": 118.921209 },
  { "actualTime": 65.811591, "cutTime": 118.921209 },
  { "actualTime": 66.592387, "cutTime": 118.921209 },
  { "actualTime": 67.373183, "cutTime": 84.969731 },
  { "actualTime": 77.500000, "cutTime": 99.096548 },
  { "actualTime": 77.750000, "cutTime": 98.846548 },
  { "actualTime": 78.000000, "cutTime": 98.596548 },
  { "actualTime": 78.250000, "cutTime": 98.346548 },
  { "actualTime": 78.500000, "cutTime": 98.096548 },
  { "actualTime": 78.750000, "cutTime": 97.846548 },
  { "actualTime": 79.000000, "cutTime": 97.596548 },
  { "actualTime": 79.250000, "cutTime": 97.346548 },
  { "actualTime": 79.500000, "cutTime": 97.096548 },
  { "actualTime": 79.750000, "cutTime": 96.846548 },
  { "actualTime": 80.000000, "cutTime": 96.596548 },
  { "actualTime": 80.250000, "cutTime": 96.346548 },
  { "actualTime": 80.500000, "cutTime": 96.096548 },
  { "actualTime": 80.750000, "cutTime": 95.846548 },
  { "actualTime": 81.000000, "cutTime": 95.596548 },
  { "actualTime": 81.250000, "cutTime": 95.346548 },
  { "actualTime": 81.500000, "cutTime": 95.096548 },
  { "actualTime": 81.750000, "cutTime": 99.346548 },
  { "actualTime": 89.000000, "cutTime": 47.937373 },
  { "actualTime": 89.250000, "cutTime": 47.687373 },
  { "actualTime": 89.500000, "cutTime": 47.437373 },
  { "actualTime": 89.750000, "cutTime": 47.187373 },
  { "actualTime": 90.000000, "cutTime": 106.596548 },
  { "actualTime": 94.500000, "cutTime": 121.303486 },
  { "actualTime": 101.000000, "cutTime": 127.803486 },
  { "actualTime": 102.000000, "cutTime": 128.303486 },
  { "actualTime": 102.500000, "cutTime": 128.303486 },
  { "actualTime": 103.000000, "cutTime": 128.303486 },
  { "actualTime": 103.500000, "cutTime": 128.303486 },
  { "actualTime": 104.000000, "cutTime": 128.303486 },
  { "actualTime": 104.500000, "cutTime": 128.303486 },
  { "actualTime": 105.000000, "cutTime": 128.303486 },
  { "actualTime": 105.500000, "cutTime": 128.303486 },
  { "actualTime": 106.000000, "cutTime": 134.803486 }
]