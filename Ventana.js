import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';

export async function ventana(name, texto, final, scene) {

    const width = 1920
    const height = 1080

    const windowMesh = BABYLON.MeshBuilder.CreatePlane("mesh_"+ name, {
        width: width * 0.01,
        height: height * 0.01,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    }, scene);

    windowMesh.position = new BABYLON.Vector3(0, 2, -15);

    const advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(windowMesh);

    const windowRectangle =  new GUI.Rectangle("window_rectangle_"+ name);
    windowRectangle.width = 1;
    windowRectangle.height = 1;
    windowRectangle.cornerRadius = 20;
    windowRectangle.color = "#f988ff";
    windowRectangle.thickness = 4;
    windowRectangle.background = "#f988ff";

    windowRectangle.alpha = 0.7;
    advancedTexture.addControl(windowRectangle);

    const windowGrid = new GUI.Grid();
    windowGrid.addRowDefinition(0.8);
    windowGrid.addRowDefinition(0.2);

    windowRectangle.addControl(windowGrid);

    const text1 = new GUI.TextBlock();
    text1.text = texto;
    text1.height = "300px";
    text1.color = "white";
    text1.textWrapping = GUI.TextWrapping.WordWrap;
    text1.resizeToFit = true;
    text1.fontSize = 60;
    text1.fontFamily = "Noto Sans Medium";
    text1.paddingTop = "10px";
    text1.paddingBottom = "10px";
    text1.paddingLeft = "10px";
    text1.paddingRight = "10px";
    text1.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    text1.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    windowGrid.addControl(text1, 0, 0);

    let button1;

    if(!final) {

    button1 = GUI.Button.CreateSimpleButton("btn_"+ name, "Siguiente...");
    button1.width = "300px"
    button1.height = "100px";
    button1.color = "white";
    button1.background = "green";
    button1.fontSize = 32;
    button1.cornerRadius = 15;
    windowGrid.addControl(button1, 1, 0);

    } else {

        const prupuestaGrid = new GUI.Grid();
        prupuestaGrid.addColumnDefinition(0.5);
        prupuestaGrid.addColumnDefinition(0.5);

        windowGrid.addControl(prupuestaGrid, 1, 0);

        button1 = GUI.Button.CreateSimpleButton("btn_"+ name, "Sí");
        button1.width = "400px"
        button1.height = "150px";
        button1.color = "white";
        button1.background = "green";
        button1.fontSize = 40;
        button1.cornerRadius = 15;
        prupuestaGrid.addControl(button1, 0, 0);

        const button2 = GUI.Button.CreateSimpleButton("btn_"+ name, "No");
        button2.width = "400px"
        button2.height = "150px";
        button2.color = "white";
        button2.background = "red";
        button2.fontSize = 40;
        button2.cornerRadius = 15;
        prupuestaGrid.addControl(button2, 0, 1);

        button2.onPointerUpObservable.add(() => {
            button2.textBlock.text = "Es el botón de la izquierda";
        });

    }

    windowMesh.isVisible = false;

    return [windowMesh, windowRectangle, button1, text1];

}