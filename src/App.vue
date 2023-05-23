<script setup lang="ts">
import { onMounted } from "vue"
import { main } from "./world/main"

onMounted(() => {
  // main()
})

</script>

<template>
  <button type="button" @click="() => main()" >点击打开scene</button>
  <div id="scene"></div>
</template>

<style scoped>

#scene {
  width: 100%;
  height: 100%;
}
</style>
