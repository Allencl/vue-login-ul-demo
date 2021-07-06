export default {
    routes: [
        // 业务页面
        {
            name: 'listBase',
            path: '/demo/list',
            meta: {title: '基础页面-增删改', keepAlive: true},
            component: () => import("@view/listBase/index.vue")
        },   
        {
            name: 'formPage',
            path: '/form/page',
            meta: {title: '基础页面-表单页面', keepAlive: true},
            component: () => import("@view/formPage/index.vue")
        },         


    ].concat([
        // 首页
        {
            name: 'home',
            path: '/',
            meta: {title: '首页', keepAlive: true},
            component: () => import("@src/layout/home.vue"),
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
    ])
}
