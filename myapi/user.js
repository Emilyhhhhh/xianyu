// 封装api接口
import axios from '@/utils/api.js'

// 首页轮播图
export const banners = () => {
    return axios({
        url: 'scenics/banners'
    })
}

// 登录
export const login = (data) => {
    return axios({
        method: 'post',
        url: 'accounts/login',
        data
    })
}


// 注册
export const register = (data) => {
    return axios({
        method: 'post',
        url: 'accounts/register',
        data
    })
}


//手机验证码
export const captchas = (tel) => {
    return axios({
        method: 'post',
        url: '/captchas',
        // 注意data传参的格式，不然会报400
        data: {
            tel
        }
    })
}


//实时机票城市：首页搜索框
export const airsSearch = (name) => {
    return axios({
        url: '/airs/city',
        // 注意data传参的格式，不然会报400
        params: {
            name
        }
    })
}

//推荐机票：首页底部的特价机票
export const airsSale = () => {
    return axios({
        url: '/airs/sale',
        // 注意data传参的格式，不然会报400
    })
}