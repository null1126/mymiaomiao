export default {
    /**
     * 我的 路由
     */
    path: '/mine',
    name: 'mine',
    //按需导入组件
    component: () =>
        import ('@/views/Mine.vue'),
    children: [
        //个人中心
        {
            path: 'center',
            component: () =>
                import ('@/views/Center.vue')
        },
        //登录
        {
            path: 'login',
            component: () =>
                import ('@/components/Login.vue')
        },
        //注册
        {
            path: 'register',
            component: () =>
                import ('@/components/Register.vue')
        },
        //修改密码
        {
            path: 'Findpassword',
            component: () =>
                import ('@/components/Findpassword.vue')
        },
        //重定向
        {
            path: '/mine',
            redirect: 'center'
        }
    ]
}