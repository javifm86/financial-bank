import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/home/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/analysis',
    name: 'Analysis & news',
    component: () => import(/* webpackChunkName: "analysis" */ '../views/analysis/AnalysisRouter.vue'),
    children: [
      {
        path: 'news/:id',
        name: 'News detail',
        props: true,
        component: () => import(/* webpackChunkName: "analysis" */ '../views/analysis/NewsDetail.vue')
      }
    ]
  },
  {
    path: '/wealth',
    name: 'Financial wealth',
    component: () => import(/* webpackChunkName: "wealth" */ '../views/wealth/WealthRouter.vue'),
    children: [
      {
        path: 'summary',
        alias: '/wealth',
        name: 'Summary',
        component: () => import(/* webpackChunkName: "wealth" */ '../views/wealth/Summary.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
