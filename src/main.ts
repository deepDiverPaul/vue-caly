import { createApp } from 'vue'
import App from './App.vue'

import "./index.css";

import VueCaly from './plugin'

const app = createApp(App)

app.use(VueCaly)

app.mount('#app')
