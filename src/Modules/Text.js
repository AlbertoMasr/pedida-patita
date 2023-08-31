import * as BABYLON from '@babylonjs/core';
import earcut from 'earcut';

const createFont = async (name, text, scene) => {

    const fontData = await (await fetch('../../fonts/Noto Sans Medium_Regular.json')).json();

    const textoPropuesta = BABYLON.MeshBuilder.CreateText(name, text, fontData, {
        size: 2,
        depth: 0.5,
    }, scene, earcut);

    return textoPropuesta

}

export { createFont }