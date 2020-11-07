// 用户管理
export const state = () => ({
    //采用接口返回的数据结构
    userInfo: {
        // token: '',
        // user: {}

    }
})

// export const state = () => {
//     return {
//         // 这里是全局状态数据保存的地方
//         abc: 123
//     }
// }

// 修改 state 里面的数据, 必须使用 mutations 里面的函数
export const mutations = {
    // 每个属性都是一个函数, 作为修改 state 的方法
    // setAbc(state, data) {
    // 每个 mutation 函数都可以接受到两个参数
    // 第一个是 state 对象本身
    // 第二是调用函数时额外添加的数据
    // 这里需要做的就是改变 state 数据
    // state.abc = data
    // 这样外面调用这个函数, 并且传入数据, 即可改变当前的 abc 属性
    setUserInfo(state, data) {
        state.userInfo = data
    }

};

// export const actions = {};