import * as BABYLON from '@babylonjs/core';
import * as Materials from '@babylonjs/materials';
import earcut from 'earcut';

import { ventana } from './Ventana.js';

const canvas = document.getElementById('renderCanvas');

const engine = new BABYLON.Engine(canvas, true);

const createScene = async () => {

    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, -40), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    const skyBoxMaterial = new Materials.SkyMaterial("skyBoxMaterial", scene)
    const skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, scene)
    skybox.material = skyBoxMaterial

    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 20, height: 20 }, scene)
    const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene)
    ground.material = groundMaterial

    const fontData = await (await fetch('/Noto Sans Medium_Regular.json')).json();

    let [windowMesh, rectangleMesh, buttonVentana, texto1] = await ventana('Propuesta', "Para mi chihuahuita, chihua, chihuiña, caquita, more, vira ... \n\n Estas son mis maneras de mostrarte detalles, haciendo lo que me gusta, con todo cariño y amor lo hice para tí.", false, scene);
    let [windowMesh2, rectangleMesh2, buttonVentana2, texto2] = await ventana('Propuesta2', "Eres lo mejor que me ha pasado en la vida, desde que te conocí mi vida cambió, descubrí lo que es amar. \n\n Me has hecho tener tantos sentimientos y emociones, y eso es lo que nos hace sentir vivos, para mí eso es el sentido de vivir y gracias a tí lo he conseguido.", false, scene);
    let [windowMesh3, rectangleMesh3, buttonVentana3, texto3] = await ventana('Propuesta3', "Quiero pasar contigo el resto de mi vida, ser compañeros de vida, vivir experiencias, y empezar una nueva familia juntos", false, scene);
    let [windowMesh4, rectangleMesh4, buttonVentana4, texto4] = await ventana('Propuesta4', "Por eso mismo, no bajes el celular, y voltea viendo la pantalla del celular hacia atrás", false, scene);

    windowMesh.isVisible = true;

    let textoPropuesta;

    buttonVentana.onPointerUpObservable.add(() => {
        windowMesh.dispose();
        windowMesh2.isVisible = true;
    });

    buttonVentana2.onPointerUpObservable.add(() => {
        windowMesh2.dispose();
        windowMesh3.isVisible = true;
    });

    buttonVentana3.onPointerUpObservable.add(async () => {
        windowMesh3.dispose();

        windowMesh4.isVisible = true;
        buttonVentana4.isVisible = false;

        textoPropuesta = BABYLON.MeshBuilder.CreateText('Propuesta', '¿Te quieres casar conmigo?', fontData, {
            size: 2,
            depth: 0.5,
        }, scene, earcut);

        textoPropuesta.material = new BABYLON.StandardMaterial('Propuesta', scene);
        textoPropuesta.material.diffuseColor = new BABYLON.Color3(0, 100, 100);
    
        textoPropuesta.position = new BABYLON.Vector3(0, 2, -75);
        textoPropuesta.rotation = new BABYLON.Vector3(110, 0, Math.PI);

        let [windowMesh5, rectangleMesh5, buttonVentana5, texto5] = await ventana('Propuesta5', "Elige con sabiduría", true, scene);

        windowMesh5.position = new BABYLON.Vector3(0, -8, -75);
        windowMesh5.rotation = new BABYLON.Vector3(110, 0, Math.PI);

        windowMesh5.isVisible = true;

        buttonVentana5.onPointerUpObservable.add(() => {
            buttonVentana5.textBlock.text = "¡Lo sabía!, ¡Te amo!";
            texto5.text = "FAMILIA SOTEVAS";
        });

    });

    let avaliableVR = await BABYLON.WebXRSessionManager.IsSessionSupportedAsync("immersive-vr")
    let avaliableAR = await BABYLON.WebXRSessionManager.IsSessionSupportedAsync("immersive-ar")

    alert("VR: " + avaliableVR + "\nAR: " + avaliableAR)

    let inmersive_state = 'inline'
    let reference_floor = "local-floor"

    if(avaliableAR) {

        inmersive_state = 'immersive-ar'
        ground.isVisible = false
        skybox.isVisible = false

    } else if(avaliableVR) {

        inmersive_state = 'immersive-vr'

    }

    const xr = await scene.createDefaultXRExperienceAsync({
        floorMeshes: [ground],
        uiOptions: {
            sessionMode: inmersive_state,
            referenceSpaceType: reference_floor
        },
    });

    return scene;
};

const scene = await createScene();

engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener('resize', () => {
    engine.resize();
});