import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomePage.vue'),
    },
    {
      path: '/patient/create',
      name: 'PatientCreate',
      component: () => import('@/views/PatientCreate.vue'),
    },
    {
      path: '/patient/detail/:id',
      name: 'PatientDetail',
      component: () => import('@/views/PatientDetail.vue'),
      props: true
    },
  ]
})

export default router
