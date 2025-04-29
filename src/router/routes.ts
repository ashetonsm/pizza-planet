import HomeView from '@/views/HomeView.vue'
import AccountView from '@/views/AccountView.vue'
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
    component: () => import('@/views/AboutView.vue'), children: [
      { path: '/history', name: 'history', component: History },
      { path: '/delivery', name: 'delivery', component: Delivery },
      { path: '/orderGuide', name: 'orderGuide', component: OrderGuide },
    ]
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import('@/views/MenuView.vue')
  },
  {
    path: '/account',
    name: 'account',
    component: AccountView,
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
  },
]