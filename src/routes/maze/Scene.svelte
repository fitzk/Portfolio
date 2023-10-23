<script lang="ts">
  import { OrbitControls, Sky } from "@threlte/extras";
  import { RigidBody, AutoColliders } from "@threlte/rapier";
  import { T } from "@threlte/core";
  import * as colors from "$lib/colors";
  import Ground from "./Ground.svelte";
  import MainCharacter from "./Player.svelte";
</script>


<Sky setEnvironment={true} />
<Ground />
<MainCharacter />
