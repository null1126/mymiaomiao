import Movie from '@/views/Movie.vue'
export default {
    /**
     * 电影 路由
     */
    path: '/movie',
    name: 'movie',
    component: Movie,
    /**
     * 电影路由的子路由
     */
    children: [
        /**
         * 城市 
         */
        {
            path: 'city',
            name: 'city',
            component: () => import('@/components/City')
        },
        /**
         * 搜索
         */
        {
            path: 'search',
            name: 'search',
            component: () => import('@/components/Search')
        },
        /**
         * 正在热播
         */
        {
            path: 'nowplaying',
            name: 'nowplaying',
            component: () => import('@/components/Nowplaying')
        },
        /**
         * 即将上映
         */
        {
            path: 'coming',
            name: 'coming',
            component: () => import('@/components/Coming')
        },
        {
            path: 'detail/:movieId',
            name: 'detail',
            components:{
                detail: () => import('@/views/Detail')
            },
            //传moiveId 
            props:{
                detail:true
            }
        }
    ],
    //默认展示的子路由
    redirect: '/movie/nowplaying'
}