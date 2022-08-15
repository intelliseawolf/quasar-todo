import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: () => {
      return 'homepage';
    },
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'homepage', component: () => import('pages/IndexPage.vue') },
      { path: 'todo', component: () => import('pages/TodoList.vue') },
      { path: 'todo/add', component: () => import('pages/TodoAdd.vue') },
      { path: 'todo/:id/edit', component: () => import('pages/TodoEdit.vue') },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
