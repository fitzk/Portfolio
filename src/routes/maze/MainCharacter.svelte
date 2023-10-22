<script lang="ts">
  import { BasicPlayerController } from "@threlte/rapier";
  import { Mesh, Vector3 } from "three";
  import { T } from "@threlte/core";
  import * as colors from "$lib/colors";

  let capsuleMesh: Mesh;
  export let position = new Vector3(0, 10, 0);
</script>

<BasicPlayerController
  groundCollisionGroups={[15]}
  height={1.8}
  jumpStrength={2}
  position={position.toArray()}
  radius={0.3}
  speed={3}
>
  <T.Mesh bind:ref={capsuleMesh} name="yellow capsule">
    <T.CapsuleGeometry radius={1} />
    <T.MeshBasicMaterial color={colors.toHex(colors.mustard)} />
  </T.Mesh>
</BasicPlayerController>
