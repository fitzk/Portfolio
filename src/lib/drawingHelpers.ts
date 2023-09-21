import * as THREE from 'three';

export function drawCube() {
    const color = new THREE.Color(0xffffff);
    color.setHex(Math.random() * 0xffffff);
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color
        })
    )
}
