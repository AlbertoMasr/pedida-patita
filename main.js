import * as BABYLON from '@babylonjs/core';
import earcut from 'earcut';

const canvas = document.getElementById('renderCanvas');

const engine = new BABYLON.Engine(canvas, true);

const createScene = async () => {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.2, 40, new BABYLON.Vector3(0, 0, 0), scene);

    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

    const fontData = await (await fetch('/Noto Sans Medium_Regular.json')).json();
    const textoPropuesta = BABYLON.MeshBuilder.CreateText('Propuesta', '¿Te quieres casar conmigo?', fontData, {
        size: 2,
        depth: 0.5,
    }, scene, earcut);

    return scene;
};

const scene = await createScene();

engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener('resize', () => {
    engine.resize();
});