import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'home', component: () => import('pages/IndexPage.vue') }],
    meta: { requiresAuth: true }
  },
  {
    path: '/users',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'users', component: () => import('pages/users/UsersPage.vue') }],
    meta: { requiresAuth: true }
  },
  {
    path: '/accesses',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'accesses', component: () => import('pages/accesses/AccessesPage.vue') }],
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    component: () => import('layouts/BlankLayout.vue'),
    children: [{ path: '', name: 'login', component: () => import('pages/auth/LoginPage.vue') }],
  },
  {
    path: '/signup',
    component: () => import('layouts/BlankLayout.vue'),
    children: [{ path: '', name: 'signup', component: () => import('pages/auth/SignupPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
