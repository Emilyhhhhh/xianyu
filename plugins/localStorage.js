console.log('测试自定义插件')
    // 在这个自定义插件中配置 vuex-persistedstate
import createPersistedState from 'vuex-persistedstate'

// 这里什么都可以写, 不过如果你需要用到 nuxt 本身, 必须通过 export 的方式暴露函数来接收

export default ({ store }) => {
    // 如果想要等到 nuxt 加载完毕
    // 再执行代码, 有一个函数叫做 window.onNuxtReady()
    window.onNuxtReady(() => {
        createPersistedState({
            // 在这里其实, 是想要将 vuex 数据存放到 localStorage 里面
            key: 'store'
        })(store)
    })
}