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
    redirect: '/wealth/summary',
    name: 'Financial wealth',
    component: () => import(/* webpackChunkName: "wealth" */ '../views/wealth/WealthRouter.vue'),
    children: [
      {
        path: 'summary',
        name: 'Summary',
        component: () => import(/* webpackChunkName: "wealth" */ '../views/wealth/Summary.vue')
      },
      {
        path: 'statements',
        name: 'Statements',
        component: () => import(/* webpackChunkName: "wealth" */ '../views/wealth/Statements.vue')
      },
      {
        path: 'movements',
        name: 'Movements',
        component: () => import(/* webpackChunkName: "wealth" */ '../views/wealth/statements/Movements.vue')
      },
      {
        path: 'funds',
        name: 'Funds',
        component: () => import(/* webpackChunkName: "wealth" */ '../views/wealth/statements/Funds.vue')
      },
      {
        path: 'tax',
        name: 'Tax',
        component: () => import(/* webpackChunkName: "wealth" */ '../views/wealth/statements/Tax.vue')
      },
      {
        path: 'comissions',
        name: 'Comissions',
        component: () => import(/* webpackChunkName: "wealth" */ '../views/wealth/statements/Comissions.vue')
      },
      {
        path: 'gainslosses',
        name: 'Gainslosses',
        component: () => import(/* webpackChunkName: "wealth" */ '../views/wealth/statements/Gainslosses.vue')
      },
      {
        path: 'cfds',
        name: 'Cfds',
        component: () => import(/* webpackChunkName: "wealth" */ '../views/wealth/statements/Cfds.vue')
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
