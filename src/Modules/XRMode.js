import * as BABYLON from '@babylonjs/core';

const createXRMode = async (ground, skybox, scene) => {
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

    return xr
}

export { createXRMode }