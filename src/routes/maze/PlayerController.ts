import { type Mesh, Camera, Vector3, Quaternion, Object3D } from "three";
import { useThrelte } from "@threlte/core";

export default class PlayerController {
    player: Object3D;
    playerPosition: Vector3 = new Vector3();
    cameraPosition: Vector3 = new Vector3();
    playerRotation: Quaternion = new Quaternion();
    cameraRotation: Quaternion = new Quaternion();
    playerSet = false;
    camera;
    ctx;
    constructor(player: Object3D, ctx) {
        this.player = player;
        this.playerSet = true;

        this.ctx = ctx;


        this.playerPosition = new Vector3(...player.position.toArray());

        this.ctx.renderer.domElement.tabIndex = 1;
        this.ctx.renderer.domElement.addEventListener(
            "keydown",
            this.onKeyDown,
            false
        );
        this.ctx.renderer.domElement.addEventListener(
            "click",
            this.onKeyDown,
            false
        );
        if (!this.camera) {
            this.camera = this.ctx.camera.current;
        }

        // this.ctx.camera.current.lookAt(this.player.position);
        // this.camera.position.z -= 4;

    }

    lookAt = (vector: Vector3) => {
        this.camera.lookAt(vector);
    }

    onKeyDown = (event) => {
        switch (event.key) {
            case 'w': {
                this.playerPosition.x += 1;
                // this.cameraPosition.x += 1;
                console.log('w', this.playerPosition)
                break;
            };
            case 'd': {
                // this.cameraPosition.x -= 1;
                console.log('d', this.playerPosition)
                break;
            }
        }

    }

    update = () => {
        if (this.player.position.distanceTo(this.playerPosition) !== 0) {
            this.player.position.set(...this.playerPosition.toArray());
             this.camera.lookAt(this.player.position)
            // this.camera.position.set(...this.cameraPosition.toArray())
        }

    }
}
