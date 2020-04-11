const sidebar_routes = [
    /* {
        path: '/app',
        name: 'app',
        meta: {
            auth: true,
            title: 'App',
            exact: false,
            icon: 'mdi-application',
        },
        children: [

        ],
    },*/
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName : "dashboard" */ '../views/system/Dashboard.vue'),
        meta:{
            auth:true,
            title: 'Dashboard',
            exact: true,
            icon:'mdi-view-dashboard',
        }
    },
    {
        path: '/secret',
        name: 'secret',
        component: () => import(/* webpackChunkName : "secret" */ '../views/system/Secret.vue'),
        meta:{
            auth:true,
            title: 'Secret',
            exact: true,
            icon:'mdi-lock',
        }
    }
];

export default sidebar_routes