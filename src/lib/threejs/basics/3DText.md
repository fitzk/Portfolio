---
---

```ts
import { Font } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import matcap from "../assets/matcap.png";
import typeface from "../assets/your_typeface.json";

// ...
const textGeometry = new TextGeometry("Kayla's Portfolio", {
  bevelEnabled: true,
  bevelOffset: 0,
  bevelSegments: 5,
  bevelSize: 0.02,
  bevelThickness: 0.2,
  curveSegments: 12,
  font: new Font(typeface),
  height: 0.1,
  size: 0.6,
});
textGeometry.center();

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(matcap);
const textMaterial = new THREE.MeshMatcapMaterial({
  matcap: texture,
});

const mesh = new THREE.Mesh(textGeometry, textMaterial);
scene.add(mesh);
```
