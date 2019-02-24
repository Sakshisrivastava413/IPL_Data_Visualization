import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GMAPS_API_KEY,
    libraries: 'drawing',
  },
  // installComponents: true,
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
