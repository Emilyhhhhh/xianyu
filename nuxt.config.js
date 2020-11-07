import pkg from './package'

export default {
    mode: 'universal',

    /*
     ** Headers of the page
     */
    head: {
        title: "闲云旅游网", // 修改title
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: pkg.description }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', type: 'text/css', href: '//at.alicdn.com/t/font_1168872_ehvuah8v57g.css' } // 新增全局字体样式
        ]
    },

    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },

    /*
     ** Global CSS
     */
    css: [
        'element-ui/lib/theme-chalk/index.css',
        'assets/main.css' // 新增自定义的页面过渡样式（文件来自3.4.1）
    ],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        // '@/plugins/element-ui'
        '@/plugins/element-ui',
        // '@/plugins/localStorage'
        // 这里的引入, 如果是普通字符串, 就在服务端马上运行
        // 如果是要等到浏览器再运行的代码可以将配置改为对象, 并且 路径作为 src 传进去
        {
            src: '@/plugins/localStorage',
            // 如果只在浏览器加载的代码, 可以添加一个 属性 ssr: false
            ssr: false
        }
    ],

    /*
     ** Nuxt.js modules
     */
    modules: [
        // https://axios.nuxtjs.org/setup
        '@nuxtjs/axios'
    ],

    /*
     ** Axios module configuration
     */
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
        // baseURL: "http://157.122.54.189:9095" // 新增备用地址
        baseURL: "http://127.0.0.1:1337" // 新增axios默认请求路径 		  
    },

    /*
     ** Build configuration
     */
    build: {
        transpile: [/^element-ui/],

        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {}
    },
}