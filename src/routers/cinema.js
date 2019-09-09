export default {
    /**
     * 影院 路由
     */
    path: '/cinema',
    name: 'cinema',
    //按需导入组件
    component: () => import('@/views/Cinema.vue'),
    /**
     * 影院子路由 
     */
    children: [
        /**
         * 全城
         */
        {
            path: 'wholecity',
            name: 'wholecity',
            component: () => import('@/components/Wholecity')
        },
        /**
         * 品牌
         */
        {
            path: 'brand',
            name: 'brand',
            component: () => import('@/components/Brand')
        },
        /**
         * 特色
         */
        {
            path: 'feature',
            name: 'feature',
            component: () => import('@/components/Feature')
        }
    ],
    //默认展示的子路由
    redirect: '/cinema/wholecity'
}