module.exports = {
    //publicPath: '/miaomiao', //配置静态资源根路径
    devServer: {
        proxy: {
            //代理本地接口写在最上面
            '/api2': {
                target: 'http://localhost:3000',
                changeOrigin: true
            },
            //代理网上接口
            '/api': {
                target: 'http://39.97.33.178',
                changeOrigin: true
            }
        }
    }
}