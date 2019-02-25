import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = true;

if (!process.env.VUE_APP_GMAPS_API_KEY) {
  alert("Whoops! You forgot to add `VUE_APP_GMAPS_API_KEY` variable in your env file, check console for more details!");
  console.log(`
    %cYou have not added VUE_APP_GMAPS_API_KEY variable in your '.env' file, please add it and initialise with google maps API key
  `, "color: red; background: lightgreen; font-size: 18px");
}
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
