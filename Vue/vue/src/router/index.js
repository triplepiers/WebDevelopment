import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layout/LayoutView'),
    redirect: '/login',
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/UserView')
      },
      {
        path: 'me',
        name: 'me',
        component: () => import('@/views/PersonaView')
      },
      {
        path: 'book',
        name: 'book',
        component: () => import('@/views/BookView')
      },
      {
        path: 'upload',
        name: 'upload',
        component: () => import('@/views/UploadView')
      },
      {
        path: 'text',
        name: 'text',
        component: () => import('@/views/RichTextView')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView')
  },
  {
    path: '/reg',
    name: 'register',
    component: () => import('@/views/RegisterView')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
