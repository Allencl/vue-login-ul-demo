export default {
    routes: [
        {
            name: 'home',
            path: '/',
            meta: {title: '首页', keepAlive: true},
            component: () => import("@src/layout/home.vue"),
        },

        {
            name: 'manageAuthority',
            path: '/wis/manage/authority',
            meta: {title: '权限管理', keepAlive: true},
            component: () => import("@view/manageAuthority/index.vue")
        },        





        // 这个要放在最后
        {
            name: '404',
            path: '/404',
            meta: {title: '404', keepAlive: true},
            component: () => import("@src/router/404.vue")
        },
        {
            path: "*",
            redirect: "/404"
        }
    ]
}
