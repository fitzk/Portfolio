---
---

I had to dynamically load 'lil-gui' to avoid a self not defined error. By default the UI will be mounted in the top right corner of the screen. In order to move the UI next to our canvas, I changed the container to be a sibling of our canvas.

```ts
const guiLib = (await import("lil-gui")).default;

const gui = new guiLib({
  container: document.getElementById("gui") ?? undefined,
  autoPlace: false,
});
```

Then we draw a box and add properties we want to see in the UI.

```ts
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

gui.add(mesh.position, "y").min(-3).max(3).step(0.01);
gui.add(mesh.position, "x").min(-3).max(3).step(0.01);
gui.add(mesh.position, "z").min(-3).max(3).step(0.01);
```
