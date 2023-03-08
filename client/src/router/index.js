import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import LoginPage from '../views/pages/LoginPage.vue'
import RegisterPage from '../views/pages/RegisterPage.vue'
import GamesPage from '../views/pages/GamesPage.vue'
import ProfilePage from '../views/pages/ProfilePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/home',
      name: 'home',
      component: GamesPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('access_token')
  if (to.name === 'login' && isAuthenticated) {
    next('/home')
  } else if ((to.name === 'bookmarks' || to.name === 'bookmarks_detail') && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
