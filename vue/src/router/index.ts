import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../components/Container.vue'),
      redirect: '/users',
      children: [
        {
          path: 'users',
          name: 'users',
          component: () => import('../views/Users.vue'),
        },
        {
          path: 'tickets',
          name: 'tickets',
          component: () => import('../views/Tickets.vue'),
        },
        {
          path: 'locales',
          name: 'locales',
          component: () => import('../views/Locales.vue'),
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('../views/Settings.vue'),
        },
        {
          path: 'rss',
          name: 'rss',
          component: () => import('../views/Rss.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
  ],
});

export default router;
