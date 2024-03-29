import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { createPinia } from 'pinia'


const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(router).use(vuetify).use(createPinia()).mount('#app')