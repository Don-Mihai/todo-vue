import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './vuetify';
import 'vuetify/dist/vuetify.min.css';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

const pinia = createPinia();
const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.use(router);
app.use(vuetify);
app.use(pinia);

app.mount('#app');
