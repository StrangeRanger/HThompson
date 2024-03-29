import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import PoliciesView from '@/views/PoliciesView.vue'
import LinksView from '@/views/LinksView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/policies',
      name: 'policies',
      component: PoliciesView
    },
    {
      path: '/links',
      name: 'links',
      component: LinksView
    }
  ]
})

export default router
