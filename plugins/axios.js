import { Message } from "element-ui";

//🚩🚩如果在插件里面需要获取nuxt本身
//需要export default

// 这里的参数可以接收nuxt的参数，nuxt.xx
export default function({ $axios, redirect }) {
    //     $axios.onError(err => {
    //         const { statusCode, message } = err.response.data;

    //         // 还未使用
    //         // if(statusCode === 401 || statusCode === 403){
    //         //     Message.warning({message: "请先登录"});
    //         //     redirect("/user/login");
    //         // }

    //         if (statusCode === 400) {
    //             Message.warning({ message });
    //         }
    //     })
    // }

    // $axios.onError 是一个 nuxt 提供的辅助拦截器函数
    // 里面可以拦截到错误
    $axios.onError(err => {
        // 这里是每当出错的时候都会被拦截
        console.log(err);
        // 这个 err 是一个错误对象, log 的时候看不出来有什么用
        // 用 dir 可以看到里面的内容
        console.dir(err);
        console.log('错误信息是: ' + err.response.data.message);
        // 弹出一个提示告诉用户
        // this.$message.error('') 在这里由于不是组件内部, 没有 this 可以用
        // 可以单独引入element ui 当中的 Message 组件
        Message.error(err.response.data.message || '系统错误')

        // 如果需要跳转页面, 比如说需要跳转到登录页
        // 可以从 nuxt 中拿到 redirect 函数即可
        // redirect('/user/login')

    })
}