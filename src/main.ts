import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Particles from "vue3-particles"

const app = createApp(App)

app.use(Particles)

app.mount('#app')
