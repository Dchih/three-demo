<script setup lang="ts">
import { onMounted, Ref, ref, nextTick } from "vue"
import { main } from "./world/main"
import type { World } from "./world/src";
import { Vector3 } from "three"
import { loadFull } from "tsparticles";
const clickSwitch = ref(false)
const options = ref({
    background: {
        color: {
            value: '#0d47a1'
        }
    },
    fpsLimit: 120,
    interactivity: {
        events: {
            onClick: {
                enable: clickSwitch.value,
                mode: 'push'
            },
            onHover: {
                enable: false,
                mode: 'repulse'
            },
            resize: true
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.5,
                size: 40
            },
            push: {
                quantity: 4
            },
            repulse: {
                distance: 200,
                duration: 0.4
            }
        }
    },
    particles: {
        color: {
            value: '#ffffff'
        },
        links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1
        },
        collisions: {
            enable: true
        },
        move: {
            direction: 'none',
            enable: true,
            outMode: 'bounce',
            random: false,
            speed: 1,
            straight: false
        },
        number: {
            density: {
                enable: true,
                area: 800
            },
            value: 50
        },
        opacity: {
            value: 0.5
        },
        shape: {
            type: 'circle'
        },
        size: {
            random: true,
            value: 2
        }
    },
    detectRetina: true
})

const particlesInit = async engine => {
    await loadFull(engine);
};

const particlesLoaded = async container => {
    console.log("Particles container loaded", container);
};

let world:World

function randomPosition() {
  const cameraZPosition = Math.random() * 750
  const controlsZPosition = Math.random() * 750
  const target: Vector3 = new Vector3(cameraZPosition,cameraZPosition,cameraZPosition)
  world.setCameraPosition(target)
  world.setControlsPosition(target)

  console.log(world)
}

const refreshBackground = ref(true)
function toggleClickInteraction() {
  clickSwitch.value = !clickSwitch.value
  refreshBackground.value = false
  nextTick(() => refreshBackground.value = true)
}

onMounted(() => {
  world = main()
})
      


</script>

<template>
  <Particles
    v-if="refreshBackground"
    id="tsparticles"
    :particlesInit="particlesInit"
    :particlesLoaded="particlesLoaded"
    :options="options"></Particles>
  <!-- <button @click="toggleClickInteraction">打开鼠标点击交互</button> -->
  <div id="scene"></div>
</template>

<style scoped>

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
