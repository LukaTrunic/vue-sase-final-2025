import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import BookView from '@/views/BookView.vue'
import TableView from '@/views/TableView.vue'
import AuthorView from '@/views/AuthorView.vue'
import LoginView from '@/views/LoginView.vue'
import EditAuthor from '@/views/EditAuthor.vue'
import NewAuthor from '@/views/NewAuthor.vue'
import BorrowView from '@/views/BorrowView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/book/:id',
      name: 'book',
      component: BookView,
    },
    {
      path: '/table',
      name: 'table',
      component: TableView,
    },
    {
      path: '/author',
      name: 'author',
      component: AuthorView,
    },
    {
      path: '/author/new',
      name: 'new-author',
      component: NewAuthor,
    },
    {
      path: '/author/:id',
      name: 'edit-author',
      component: EditAuthor,
    },
    {
      path: '/borrow',
      name: 'borrow',
      component: BorrowView,
    }
  ]
})

export default router
