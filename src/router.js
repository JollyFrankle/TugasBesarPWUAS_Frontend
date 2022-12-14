import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

function importView(path){
    return () => import(`./components/${path}.vue`);
}

const router = new VueRouter ({
    mode: 'history',
    routes:[
        {
            path: '/',
            meta: {title: 'Vuefire 2022'},
            component: importView('LayoutTemplate'),
            children: [
                {
                    path: '/',
                    name: 'Home',
                    meta: {title: 'Home'},
                    component: importView('Home')
                },
                {
                    path: '/explore',
                    name: 'Explore',
                    meta: {title: 'Explore'},
                    component: importView('Explore'),
                },
                {
                    path: '/market',
                    name: 'Market',
                    meta: {title: 'Market'},
                    component: importView('Market'),
                },
                {
                    path: '/profil',
                    name: 'Profil',
                    meta: {title: 'Profil'},
                    component: importView('Profil'),
                },
                {
                    path: '/profil/:id',
                    name: 'OtherProfil',
                    meta: {title: 'Profil'},
                    component: importView('Profil'),
                },
                {
                    path: '/post/:id',
                    name: 'View Post Detail',
                    meta: {title: 'Post'},
                    component: importView('Post'),
                }
            ]
        },
        {
            path: '/Login',
            name: 'Login',
            meta: {title: 'Login'},
            component: importView('User/Login'),
        },
        {
            path: '/Register',
            name: 'Register',
            meta: {title: 'Register'},
            component: importView('User/Register'),
        }
    ]
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
});

export default router;