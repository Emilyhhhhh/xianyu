import axios from '@/utils/api.js'

// 首页轮播图
export const banners = () => {
    return axios({
        url: 'scenics/banners'
    })
}