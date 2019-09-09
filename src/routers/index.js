import Vue from 'vue'
import Router from 'vue-router'
import Movie from './movie'
import Cinema from './cinema'
import Mine from './mine'
import Admin from './admin'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL, //根路径下进行访问
    //base: 'miaomiao',//根路径是miaomiao下进行访问   然后在vue-config.js 配置一下静态资源路径
    routes: [
        /**
         * 电影 路由
         */
        Movie,
        /**
         * 我的 路由
         */
        Mine,
        /**
         * 影院 路由
         */
        Cinema,
        /**
         * 管理页面 路由
         */
        Admin,

        //找不到路由时显示电影路由组件 
        {
            path: '/*',
            redirect: "/movie"
        },
    ]
})