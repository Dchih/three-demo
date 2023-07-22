<script setup lang="ts">
import { onMounted } from "vue"
import { main } from "./map/main"

onMounted(() => {
  main()
})
      


</script>

<template>
  11
  <div id="scene"></div>
</template>
<style>
#scene {
  width: 100%;
  height: 100%;
  z-index: 1
}

#tsparticles {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

</style>
