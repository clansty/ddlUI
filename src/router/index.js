import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Unauthorized from '@/views/Unauthorized'
import NotFound from '@/views/NotFound'
import ServerErr from '@/views/ServerErr'
import Tasks from '@/views/Tasks'
import Info from '@/views/Info'
import TaskView from '@/views/TaskView'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: { name: 'unauthorized' }
    },
    {
        path: '/unauthorized',
        name: "unauthorized",
        component: Unauthorized, 
        meta: {
            title: "401 Unauthorized"
        }
    },
    {
        path: '/servererr',
        name: "servererr",
        component: ServerErr, 
        meta: {
            title: "Server Error"
        }
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
                component: Tasks, 
                meta: {
                    title: "Tasks"
                }
            },
            {
                path: 'task/:id',
                name: 'task',
                component: TaskView, 
                meta: {
                    title: "Task View"
                }
            },
            {
                path: 'info',
                name: 'info',
                component: Info,
                meta: {
                    title: "System Info"
                }
            },
            {
                path: '*',
                component: NotFound,
                name: "notFound",
                meta: {
                    title: "404 Not Found"
                }
            },
        ]
    },
    {
        path: '*',
        component: NotFound,
        meta: {
            title: "404 Not Found"
        }
    }]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

export default router
