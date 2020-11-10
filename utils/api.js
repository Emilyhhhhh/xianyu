//封装API基地址
// 🚩🚩1.本地服务器
// import axios from 'axios'
// axios.defaults.baseURL = 'http://localhost:1337'
// export default axios

import { Message } from "element-ui";


// 🚩🚩2p.远程服务器
// 创建一个 axios
import axios from 'axios'
const http = axios.create({
    baseURL: 'http://157.122.54.189:9095'
})

http.interceptors.response.use(
    res => {
        console.log('自己安装的axios拦截到正常响应状态码为200的请求');
        // 如果是状态码就报错的请求, 这里无法拦截, 需要添加第二个函数作为回调
        // 如果拦截了请求或者响应, 记得要 return
        return res
    },
    err => {
        console.log('这里拦截到状态码本身出错');
        // 这里可以拦截到状态码本身出错的请求
        console.dir(err)
        Message.error(err.response.data.message || '系统错误')
    }
)
export default http