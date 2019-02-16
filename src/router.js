import Vue from 'vue';
import Router from 'vue-router';
import Team from './views/Team.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Team',
      component: Team,
    },
  ],
});
