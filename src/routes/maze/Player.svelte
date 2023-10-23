<script lang="ts">
  import { AutoColliders, RigidBody } from "@threlte/rapier";
  import type { Mesh, PerspectiveCamera } from "three";
  import { T, useFrame } from "@threlte/core";
  import * as colors from "$lib/colors";
  import PlayerController from "./PlayerController";

  let playerMesh: Mesh;
  let ballMesh: Mesh;
  let playerCamera: PerspectiveCamera;

  let controller;

  useFrame((ctx, delta) => {
    if (!playerCamera || !playerMesh) return;
    if (playerMesh && !controller)
      controller = new PlayerController(playerMesh, ctx);

      controller.update()
  });
</script>

<T.PerspectiveCamera bind:ref={playerCamera}>
  <AutoColliders>
    <T.Mesh bind:ref={playerMesh} name="yellow capsule">
      <T.CapsuleGeometry radius={1} />
      <T.MeshBasicMaterial color={colors.toHex(colors.mustard)} />
    </T.Mesh>
  </AutoColliders>
</T.PerspectiveCamera>
<T.Group position={[2, 12, 0]}>
  <RigidBody>
    <AutoColliders restitution={0.5} shape={"ball"}>
      <T.Mesh bind:ref={ballMesh} castShadow>
        <T.SphereGeometry radius={2} />
        <T.MeshBasicMaterial color={colors.toHex(colors.bitterSweet)} />
      </T.Mesh>
    </AutoColliders>
  </RigidBody>
</T.Group>
