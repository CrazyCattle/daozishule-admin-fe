import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/index'),
    redirect: '/Articles',
    children: [
      {
        path: '/Articles',
        name: 'Articles',
        component: () => import('@/views/Home/index')
      },
      {
        path: '/Categories',
        name: 'Categories',
        component: () => import('@/views/Category/index')
      }
    ]
  },
  {
    path: '/AddArticle',
    name: 'AddArticle',
    component: () => import('@/views/Articles/addArticle')
  },
  {
    path: '/Login',
    name: 'login',
    component: () => import('@/views/Login/index')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
