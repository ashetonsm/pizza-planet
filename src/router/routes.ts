import HomeView from '@/views/HomeView.vue'
import AccountView from '@/views/AccountView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import ForbiddenView from '@/views/ForbiddenView.vue'
import MenuView from '@/views/MenuView.vue'
import ContactView from '@/views/ContactView.vue'
import AboutView from '@/views/AboutView.vue'
import OrderGuide from '@/components/About/OrderGuide.vue'
import Delivery from '@/components/About/Delivery.vue'
import History from '@/components/About/History.vue'
import SignInView from '@/views/SignInView.vue'
import AdminView from '@/views/AdminView.vue'

export const routes = [
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView
  },
  {
    path: '/403',
    name: 'forbidden',
    component: ForbiddenView
  },
  {
    path: '/',
    alias: '/home',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView, children: [
      { path: '/history', name: 'history', component: History },
      { path: '/delivery', name: 'delivery', component: Delivery },
      { path: '/orderGuide', name: 'orderGuide', component: OrderGuide },
    ]
  },
  {
    path: '/menu',
    name: 'menu',
    component: MenuView,

  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('@/views/CheckoutView.vue'),
    meta: { isProtected: true }
  },
  {
    path: '/account',
    name: 'account',
    component: AccountView,
    meta: { isProtected: true }
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
  {
    path: '/login',
    name: 'login',
    component: SignInView
  },
]