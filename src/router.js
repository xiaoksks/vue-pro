import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
    routes: [{
        path: '/login',
        meta: {
            title: "登录界面"
        },
        component: () => import("./views/User/Login"),
    }, {
        path: '/',
        component: () => import("./layouts/BasicLayout"),
        redirect: "/table",
        children:[{
            path: 'table',
            meta: {
                title: "综合表格展示"
            },
            component: () => import("./views/Table"),
        },{
            path: 'konva',
            meta: {
                title: "绘图"
            },
            component: () => import("./views/Konva"),
        },{
            path: 'testMenu1',
            meta: {
                title: "testMenu1"
            },
            component: () => import("./views/TestMenu/TestMenu1"),
        },{
            path: 'testMenu2',
            meta: {
                title: "testMenu2"
            },
            component: () => import("./views/TestMenu/TestMenu2"),
        }]
    }]
})

router.beforeEach((to, from, next) => {
    // 自动化修改页面标签的 title
    document.title = to.meta.title;
    if (to.path != "/login" && !localStorage.token) {
        next("/login")
    } else {
        next()
    }
});

export default router;
