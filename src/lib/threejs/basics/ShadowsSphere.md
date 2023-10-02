---
---

### Shadows Animated Sphere

Instead of baking the shadow into the model directly using software, an alternative is loading a shadow texture as an alphaMap material and animating the resulting mesh relative to the sphere. The shadow jpg is loaded using the texture loader and the shadow mesh positioned slightly above the base plane.

```ts
import simpleShadow from "assets/textures/simpleShadow.jpg";

// plane mesh
const planeGeometry = new THREE.PlaneGeometry(8, 8);
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(simpleShadow);
const material = new THREE.MeshBasicMaterial({
  alphaMap: texture,
  transparent: true,
  color: colors.black,
});
const sphereShadow = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), material);
sphereShadow.rotation.x = Math.PI * 1.5;
sphereShadow.position.z = 0.5;
sphereShadow.position.y = -0.5;
scene.add(sphereShadow);
```

The following code that animates the sphere and it's shadow in this example was taken directly from ThreeJS Journey.

```ts
const clock = new THREE.Clock();

function animate() {
  controls.update();
  const elapsedTime = clock.getElapsedTime();

  // Update the sphere
  sphere.position.x = Math.cos(elapsedTime) * 1.5;
  sphere.position.z = Math.sin(elapsedTime) * 1.5;
  sphere.position.y = Math.abs(Math.sin(elapsedTime * 3));

  // Update the shadow
  sphereShadow.position.x = sphere.position.x;
  sphereShadow.position.z = sphere.position.z;
  sphereShadow.material.opacity = (1 - sphere.position.y) * 0.3;

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}

animate();
```
