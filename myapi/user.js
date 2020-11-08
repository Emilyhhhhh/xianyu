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