<script lang="ts">
  import { T } from "@threlte/core";
  import { AutoColliders } from "@threlte/rapier";
  import { BoxGeometry } from "three";
  import * as colors from "$lib/colors";
</script>

<T.Group position={[0, 0, 0]}>
  <AutoColliders shape={"cuboid"}>
    <T.Mesh geometry={new BoxGeometry(20, 1, 10)}>
      <T.MeshBasicMaterial color={colors.toHex(colors.tropicalIndigo)} />
    </T.Mesh>
  </AutoColliders>
</T.Group>
