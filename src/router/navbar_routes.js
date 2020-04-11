import Home from "../views/Home";
import About from "../views/About";

const navbar_routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta:{
            auth:false,
            title: 'Home',
            exact: true,
            icon: 'mdi-home',
        }
    },
    {
        path: '/about',
        name: 'about',
        component: About,
        meta:{
            auth:false,
            title: 'About',
            exact: true,
            icon: 'mdi-information',
        }
    },
];

export default navbar_routes