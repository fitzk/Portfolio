---
---

```ts
const scene = new THREE.Scene();

// draw a cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// camera
const camera = new THREE.PerspectiveCamera(75, width / height);
// move camera in front of cube by moving camera along z access
camera.position.z = 4;
scene.add(camera);

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(width, height);
renderer.render(scene, camera);
```
