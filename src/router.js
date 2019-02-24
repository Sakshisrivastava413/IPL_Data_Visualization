import Vue from 'vue';
import Router from 'vue-router';
import Team from './views/Team.vue';
import Player from './views/Player.vue';
import Venue from './views/Venue.vue';
import Season from './views/Season.vue';

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
    {
      path: '/player',
      name: 'Player',
      component: Player,
    },
    {
      path: '/venue',
      name: 'Venue',
      component: Venue,
    },
    {
      path: '/season',
      name: 'Season',
      component: Season,
    },
  ],
});
