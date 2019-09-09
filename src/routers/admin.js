export default {
    path: '/admin',
    component: () =>
        import ('@/views/Admin/index.vue'),
    children: [{
            path: 'users',
            component: () =>
                import ('@/views/Admin/users.vue')
        },
        {
            path: 'adminmovie',
            component: () =>
                import ('@/views/Admin/AdminMovie.vue')
        },
        {
            path: 'admincinema',
            component: () =>
                import ('@/views/Admin/AdminCinema')
        }
    ],
    //默认展示的子路由
    redirect: '/admin/users'
}