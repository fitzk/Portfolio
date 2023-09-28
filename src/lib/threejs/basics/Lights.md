---
---

Lights are performance hogs, try to use only what you need.

Adjust intensity in control panel to see how different lights effect the cube and plane, or how these lights can be combined. Intensity is set to zero for all lights by default.

Most lights come with helper functions (not included in live preview),

```ts
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
);
scene.add(directionalLightHelper);
```

Note that `RectAreaLight`, only works with `MeshStandardMaterial` or `MeshPhysicalMaterial`.

When using Spot Light we have to add the target to the scene

```ts
scene.add(spotLight.target);
```
