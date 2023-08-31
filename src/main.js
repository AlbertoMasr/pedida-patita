import * as BABYLON from '@babylonjs/core';
import * as Materials from '@babylonjs/materials';

import { createWindow } from './Modules/Window.js';
import { createFont } from './Modules/Text.js';
import { createXRMode } from './Modules/XRMode.js';

const canvas = document.getElementById('renderCanvas');

const engine = new BABYLON.Engine(canvas, true);

function createCamera(scene) {
    const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, -40), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    return camera;
}

function createLight(scene) {
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    return light;
}

function createSkybox(scene) {
    const skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene)
    const skyBoxMaterial = new Materials.SkyMaterial("skyBoxMaterial", scene)
    skybox.material = skyBoxMaterial
    return skybox;
}

function createGround(scene) {
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 20, height: 20 }, scene)
    const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene)
    ground.material = groundMaterial
    ground.isVisible = false
}

async function finalWindow(scene) {
    const textoPropuesta = await createFont('Propuesta', '¿Quieres casarte conmigo?', scene);

    textoPropuesta.material = new BABYLON.StandardMaterial('Propuesta', scene);
    textoPropuesta.material.diffuseColor = new BABYLON.Color3(0, 100, 100);

    textoPropuesta.position = new BABYLON.Vector3(0, 2, -75);
    textoPropuesta.rotation = new BABYLON.Vector3(110, 0, Math.PI);

    let [windowMesh5, rectangleMesh5, buttonWindow5, texto5] = createWindow('Propuesta5', "Elige con sabiduría", true, scene);

    windowMesh5.position = new BABYLON.Vector3(0, -8, -75);
    windowMesh5.rotation = new BABYLON.Vector3(110, 0, Math.PI);

    windowMesh5.isVisible = true;

    buttonWindow5.onPointerUpObservable.add(() => {
        buttonWindow5.textBlock.text = "¡Lo sabía!, ¡Te amo!";
        texto5.text = "FAMILIA SOTEVAS";
    });
}

const createScene = async () => {

    const scene = new BABYLON.Scene(engine);

    const camera = createCamera(scene);

    const light = createLight(scene);

    const skybox = createSkybox(scene);

    const ground = createGround(scene);

    let [windowMesh, rectangleMesh, buttonWindow, texto1] = createWindow('Propuesta', "Para mi chihuahuita, chihua, chihuiña, caquita, more, vira ... \n\n Estas son mis maneras de mostrarte detalles, haciendo lo que me gusta, con todo cariño y amor lo hice para tí.", false, scene);
    let [windowMesh2, rectangleMesh2, buttonWindow2, texto2] = createWindow('Propuesta2', "Eres lo mejor que me ha pasado en la vida, desde que te conocí mi vida cambió, descubrí lo que es amar. \n\n Me has hecho tener tantos sentimientos y emociones, y eso es lo que nos hace sentir vivos, para mí eso es el sentido de vivir y gracias a tí lo he conseguido.", false, scene);
    let [windowMesh3, rectangleMesh3, buttonWindow3, texto3] = createWindow('Propuesta3', "Quiero pasar contigo el resto de mi vida, ser compañeros de vida, vivir experiencias, y empezar una nueva familia juntos", false, scene);
    let [windowMesh4, rectangleMesh4, buttonWindow4, texto4] = createWindow('Propuesta4', "Por eso mismo, no bajes el celular, y voltea viendo la pantalla del celular hacia atrás", false, scene);

    windowMesh.isVisible = true;

    buttonWindow.onPointerUpObservable.add(() => {
        windowMesh.dispose();
        windowMesh2.isVisible = true;
    });

    buttonWindow2.onPointerUpObservable.add(() => {
        windowMesh2.dispose();
        windowMesh3.isVisible = true;
    });

    buttonWindow3.onPointerUpObservable.add(async () => {
        windowMesh3.dispose();
        windowMesh4.isVisible = true;
        buttonWindow4.isVisible = false;

        await finalWindow(scene);

    });

    const xrMode = await createXRMode(ground, skybox, scene);

    return scene;
};

const scene = await createScene();

engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener('resize', () => {
    engine.resize();
});