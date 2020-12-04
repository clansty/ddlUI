import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Unauthorized from '@/views/Unauthorized'
import NotFound from '@/views/NotFound'
import ServerErr from '@/views/ServerErr'
import Tasks from '@/views/Tasks'
import Info from '@/views/Info'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'unauthorized' }
  },
  {
    path: '/unauthorized',
    name: "unauthorized",
    component: Unauthorized
  },
  {
    path: '/servererr',
    name: "servererr",
    component: ServerErr
  },
  {
    path: '/u/:token',
    component: Home,
    children: [
      {
        path: '',
        redirect: { name: 'tasks' }
      },
      {
        path: 'tasks',
        name: 'tasks',
        component: Tasks
      },
      {
        path: 'info',
        name: 'info',
        component: Info
      },
      {
        path: '*',
        component: NotFound
      },
    ]
  },
  {
    path: '*',
    component: NotFound
  }]

const router = new VueRouter({
  routes
})

export default router
