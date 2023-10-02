---
---

This example uses a helper function to draw cubes refer to previous examples for how to draw a cube.

```ts
// transformations
const group = new THREE.Group();
scene.add(group);

const firstCube = drawCube(0x98b9f2);
const secondCube = drawCube(0x8cd790);
const thirdCube = drawCube(0x918ef4);

// move two of the cubes so they do not overlap
secondCube.position.x = -2;
thirdCube.position.x = 2;

group.add(firstCube);
group.add(secondCube);
group.add(thirdCube);
group.rotation.y = 1; // rotate group on y axis
```
