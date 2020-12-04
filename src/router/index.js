import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Unauthorized from '@/views/Unauthorized'
import NotFound from '@/views/NotFound'

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
        path: '/u/:token',
        component: Home,
        // children: [
        //   {
        //     path: '',
        //     component: UserProfile
        //   },
        //   {
        //     path: 'posts',
        //     component: UserPosts
        //   },
        //   {
        //     path: 'posts',
        //     component: UserPosts
        //   }
        // ]
    },
    {
        path: '*',
        component: NotFound
    }]

const router = new VueRouter({
    routes
})

export default router
