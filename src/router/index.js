import Vue from 'vue';
import VueRouter from 'vue-router'
import sidebar_routes from './sidebar_routes'
import navbar_routes from './navbar_routes'
import cookies from 'js-cookie';
import axiosInstance from "../plugins/axios";
import store from '../store'

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

router.beforeEach((to, from, next) => {
    if (cookies.get('x-access-token') === undefined){
        if(to.meta.auth === 'middle') {
            return next()
        }
        else if (to.meta.auth){
            axiosInstance.post('/refresh-token')
                .then(({data}) => {
                    store.dispatch('setToken',data);
                    return next();
                })
                .catch(() => {
                    return next({name:'login'})
                })
        }
        else{
            return next()
        }

    }
    else {
        if (to.meta.auth === 'middle') {
            next({name:'dashboard'})
        }
        else {
            next()
        }
    }
});

Vue.use(VueRouter);
export default router
