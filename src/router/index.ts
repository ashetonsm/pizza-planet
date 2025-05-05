import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes'
import { getCurrentUser } from 'vuefire'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
  }
})

router.beforeEach(async (to, from) => {
  const user = await getCurrentUser()
  console.log('beforeEach')
  if (to.meta.isProtected && !user) {
    console.log('no one is logged in')
    return { name: 'forbidden' }
  }
})

export default router
