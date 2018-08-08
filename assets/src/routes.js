import Login from './templates/User/Login.vue'
import Index from './templates/index.vue'
import DisplayItems from './templates/Items/DisplayItems.vue'
export const routes = [
    {path: '/login', component: Login, name: 'Login'},
    {path: '/item', component: DisplayItems, name: 'DisplayItems', 
        meta: { 
            requiresAuth: true
        }
    },
    {path: '/', component: Index, name: 'Index'}
]

