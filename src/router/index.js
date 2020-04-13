import Vue from 'vue';
import VueRouter from 'vue-router'
import sidebar_routes from './sidebar_routes'
import navbar_routes from './navbar_routes'

Vue.use(VueRouter);
const extra_routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName : "login" */ '../views/Login.vue'),
        meta:{
            auth:'middle',
            title: 'Login',
            exact: true,
            icon: 'mdi-lock',
        }
    },
];
const routes = navbar_routes.concat(sidebar_routes,extra_routes);

const router = new VueRouter({
    mode: 'history',
    routes:routes,
});

export default router
