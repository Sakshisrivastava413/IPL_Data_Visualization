import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Team',
      component: () => import('./views/Team.vue'),
    },
    {
      path: '/player',
      name: 'Player',
      component: () => import('./views/Player.vue'),
    },
    {
      path: '/venue',
      name: 'Venue',
      component: () => import('./views/Venue.vue'),
    },
    {
      path: '/season',
      name: 'Season',
      component: () => import('./views/Season.vue'),
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});
