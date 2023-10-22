<script lang="ts">
  import { OrbitControls, Sky } from "@threlte/extras";
  import { RigidBody, AutoColliders } from "@threlte/rapier";
  import { T } from "@threlte/core";
  import * as colors from "$lib/colors";
  import Ground from "./Ground.svelte";
  import MainCharacter from "./MainCharacter.svelte";
</script>

<T.PerspectiveCamera
  fov={40}
  makeDefault
  position.x={12}
  position.y={13}
  position.z={-10}
>
  <OrbitControls target.x={2.5} />
</T.PerspectiveCamera>
<Sky setEnvironment={true} />
<Ground />

<T.Group position={[2, 12, 0]}>
  <RigidBody>
    <AutoColliders restitution={0.5} shape={"ball"}>
      <T.Mesh castShadow>
        <T.SphereGeometry radius={2} />
        <T.MeshBasicMaterial color={colors.toHex(colors.gunmetal)} />
      </T.Mesh>
    </AutoColliders>
  </RigidBody>
</T.Group>

<MainCharacter />
