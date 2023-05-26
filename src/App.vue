<script setup lang="ts">
import { onMounted } from "vue"
import { main } from "./world/main"
import type { World } from "./world/src";
import { Vector3 } from "three"

let world:World

function randomPosition() {
  const cameraZPosition = Math.random() * 750
  const controlsZPosition = Math.random() * 750
  const target: Vector3 = new Vector3(cameraZPosition,cameraZPosition,cameraZPosition)
  world.setCameraPosition(target)
  world.setControlsPosition(target)

  console.log(world)
}

onMounted(() => {
  console.log(main())
  world = main()
})

</script>

<template>
  <button @click="randomPosition">随机变换</button>
  <div id="scene"></div>
</template>

<style scoped>

#scene {
  width: 100%;
  height: 100%;
}
</style>
