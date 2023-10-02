---
---

Ensure animation is the same speed regardless of viewer's computer FPS.

```ts
const clock = new THREE.Clock();

animate() {
    const elapsedTime = clock.getElapsedTime();
    cube.rotation.y = elapsedTime;
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
}

animate();
```
