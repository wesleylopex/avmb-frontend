import { defineRouter } from '#q-app/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';

import { useAuthStore } from '../stores/auth'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to) => {
    const auth = useAuthStore()

    if (to.meta.requiresAuth) {
      if (!auth.token) {
        return { name: 'login', query: { redirect: to.fullPath } }
      }

      if (!auth.user) {
        try {
          await auth.fetchMe()
        } catch {
          return { name: 'login' }
        }
      }

      if (to.name && to.name !== 'home' && !auth.hasResource(to.name as string)) {
        return { path: '/404' }
      }
    }

    return true
  })

  Router.afterEach((to) => {
    if (to.meta.title) {
      document.title = to.meta.title as string
    } else {
      document.title = 'Desafio AVMB'
    }
  })

  return Router
});
