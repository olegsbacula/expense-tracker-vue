import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

import { plugin as formkitPlugin, defaultConfig as formkitConfig } from '@formkit/vue'
import '@formkit/themes/genesis'
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi'
  },
})

const app = createApp(App)


app.use(vuetify)


app.use(formkitPlugin, formkitConfig)

app.mount('#app')
