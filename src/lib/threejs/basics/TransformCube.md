---
---

```ts
// draw single cube (same as prev example)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(2, 1, 0);
mesh.scale.set(1, 0.5, 0.5);
// reorder before rotation to avoid axis lock / confusion
mesh.rotation.reorder("YXZ");

// Math.PI = half rotation on y axis
mesh.rotation.y = Math.PI;
mesh.rotation.x = Math.PI;
scene.add(mesh);

// axis helper
const axisHelper = new THREE.AxesHelper(4);
scene.add(axisHelper);
```
