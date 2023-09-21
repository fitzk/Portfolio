import * as THREE from "three";

export function getRandomColor(baseColor: 0xffffff) {
  const color = new THREE.Color(baseColor);
  color.setHex(Math.random() * 0xffffff);
  return color;
}

export function drawCube(color: number) {
  return new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
      color,
    }),
  );
}
