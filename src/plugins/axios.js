
import router from '../router/index';
import axios from "axios";
import cookies from 'js-cookie';
import store from '../store/index';
import app from '../main';

const refreshTokenUrl = '/refresh-token';
let axiosInstance = axios.create({
   baseURL : 'http://api.local/api',
   withCredentials : true,
});

axiosInstance.interceptors.request.use(
    config => {
        app.$Progress.start();
        const token = cookies.get('x-access-token');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        // config.headers['Content-Type'] = 'application/json';
        return config;
    },
    // eslint-disable-next-line no-unused-vars
    error => {
        // Promise.reject(error);
        console.clear();
        app.$Progress.fail();
    }
    );

axiosInstance.interceptors.response.use((response) => {
    app.$Progress.finish();
    return response
}, function (error) {
    app.$Progress.fail();
    const originalRequest = error.config;

    if (error.response.status === 401 && originalRequest.url === refreshTokenUrl){
        router.push('/login');
        return false;
    }

    if (error.response.status === 401 && !originalRequest._retry){
        originalRequest._retry = true;
        return axiosInstance.post(refreshTokenUrl)
            .then(({status,data}) => {
                if (status === 200){
                    store.dispatch('setToken', data);
                    return axiosInstance(originalRequest);
                }
            })
    }

    console.clear();
    return false//Promise.reject(error);
});

// Vue.use(axiosInstance);
export default axiosInstance;