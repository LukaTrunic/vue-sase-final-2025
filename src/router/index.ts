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
import EditBorrow from '@/views/EditBorrow.vue'
import NewBorrow from '@/views/NewBorrow.vue'
import QRCodeView from '@/views/QRCodeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Login'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        title: 'About'
      }
    },
    {
      path: '/book/:id/take',
      name: 'new-borrow',
      component: NewBorrow,
      meta: {
        title: 'Borrow Book'
      }
    },
    {
      path: '/book/:id',
      name: 'book',
      component: BookView,
      meta: {
        title: 'Book Details'
      }
    },
    {
      path: '/table',
      name: 'table',
      component: TableView,
      meta: {
        title: 'Table'
      }
    },
    {
      path: '/author',
      name: 'author',
      component: AuthorView,
      meta: {
        title: 'Authors'
      }
    },
    {
      path: '/author/new',
      name: 'new-author',
      component: NewAuthor,
      meta: {
        title: 'Add Author'
      }
    },
    {
      path: '/author/:id',
      name: 'edit-author',
      component: EditAuthor,
      meta: {
        title: 'Edit Author'
      }
    },
    {
      path: '/borrow',
      name: 'borrow',
      component: BorrowView,
      meta: {
        title: 'Borrow Data'
      }
    },
    {
      path: '/borrow/:id/qrcode',
      name: 'qrcode',
      component: QRCodeView,
      meta: {
        title: 'QRCode'
      }
    },
    {
      path: '/borrow/:id',
      name: 'edit-borrow',
      component: EditBorrow,
      meta: {
        title: 'Edit Borrow Data'
      }
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} :: The Library System`
  }
  next()
})

export default router
