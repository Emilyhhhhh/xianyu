// 本地服务器
// import axios from 'axios'
// axios.defaults.baseURL = 'http://localhost:1337'
// export default axios


// 远程服务器
// 创建一个 axios
import axios from 'axios'
axios.defaults.baseURL
const http = axios.create({
    baseURL: 'http://157.122.54.189:9095'
})
http.interceptors.response
export default http