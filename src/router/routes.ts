import HomeView from '@/views/HomeView.vue'
import MenuView from '@/views/MenuView.vue'
import AdminView from '@/views/AdminView.vue'
import ContactView from '@/views/ContactView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import History from '@/components/History.vue'
import Delivery from '@/components/Delivery.vue'
import OrderGuide from '@/components/OrderGuide.vue'

export const routes = [
    {
      path: '/:pathMatch(.*)*', 
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'), children: [
        {path: '/history', name: 'history', component: History},
        {path: '/delivery', name: 'delivery', component: Delivery},
        {path: '/orderGuide', name: 'orderGuide', component: OrderGuide},
      ]
    },
    {
      path: '/menu',
      name: 'menu',
      component: MenuView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      beforeEnter: (to: any, from: any, next: () => void) => {
        alert('This area is for authorized users only. Please sign in to continue.')
        next()
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
  ]