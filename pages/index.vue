<template>
    <div class="container" title="首页">
        <!-- 幻灯片 -->
        <!-- 结合使用el-carousel和el-carousel-item标签就得到了一个走马灯。幻灯片的内容是任意的，需要放在el-carousel-item标签中。默认情况下，在鼠标 hover 底部的指示器时就会触发切换。通过设置trigger属性为click，可以达到点击触发的效果。 若将arrow设置为always，则会一直显示 interval自动切换的时间间隔，单位为毫秒-->
        <el-carousel 
        :interval="5000" 
        arrow="always" title="幻灯片">
            <el-carousel-item 
            v-for="(item, index) in banners" 
            :key="index">
                <div class="banner-image" 
                :style="`
                background:url(${item.url}) center center no-repeat;
                background-size:contain contain;
                `">
                </div>
            </el-carousel-item>
        </el-carousel>
        <!-- 搜索栏 -->
        <div class="banner-content">
            <div class="search-bar">
                <!-- tab栏 -->
                <el-row 
                type="flex" 
                class="search-tab">
                    <span 
                    v-for="(item, index) in options" 
                    :key="index" 
                    :class="{active: index === currentOption}"
                    @click="handleOption(index)">
                        <i>{{item.name}}</i>
                    </span>
                </el-row>

                <!-- 输入框 -->
                <el-row 
                type="flex" 
                align="middle" 
                class="search-input">
                    <input 
                    :placeholder="options[currentOption].placeholder" 
                    v-model="searchValue"
                    @keyup.enter="handleSearch"/>
                    <i class="el-icon-search" @click="handleSearch"></i>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import {banners} from '@/myapi/user.js'
import axios from '@/utils/api.js'
export default {
    data(){
        return {
            // 轮播图数据
            banners: [],
            searchValue:'',     //文本框输入的内容
            currentOption:0,   //默认第一个的样式是白底
            options:[
                {
                   name: "攻略",  
                   placeholder: "搜索城市" ,  //文本框的默认显示
                   url: "/post?city="
                   
                },
                 {
                   name: "攻略",  
                   placeholder: "请输入城市搜索酒店",
                   url: "/hotel?city=",
                },
                 {
                   name: "机票",  
                   placeholder: "请输入出发地",
                    url: "/air"
                }

            ]
        }
    },
    methods: {
        // 2.tab栏目点击触发
        handleOption(index){
            this.currentOption=index
             if(index==2){
                return this.$router.push(this.options[index].url)

            }

        },
        //3. 点击搜索或者回车触发
        handleSearch(){
           

        }
    },
    // 1.默认出来的轮播图
    async mounted () {
        let res=await banners()
        console.log(res);
        this.banners=res.data.data
        this.banners=res.data.data.map(value=>{
             value.url=axios.defaults.baseURL+value.url
             return value
        })
        console.log(this.banners);

    }

}
</script>

<style scoped lang="less">
.container{
    min-width:1000px;
    margin:0 auto;
    position:relative;

    /deep/ .el-carousel__container{
        height:700px;
    }

    .banner-image{
        width:100%;
        height:100%;
    }

    .banner-content{
        z-index:9;
        width:1000px;
        position:absolute;
        left:50%;
        top:45%;
        margin-left: -500px;
        border-top:1px transparent solid;

        .search-bar{
            width:552px;
            margin:0 auto;
        }

        .search-tab{
            .active{
                i{
                color:#333;
                }
                &::after{
                background: #eee;
                }
            }

            span{
                width:82px;
                height:36px;
                display:block;
                position: relative;
                margin-right:8px;
                cursor: pointer;

                i{
                position:absolute;
                z-index:2;
                display: block;
                width:100%;
                height:100%;
                line-height:30px;
                text-align:center;
                color:#fff;
                }

                &:after{
                position: absolute;
                left:0;
                top:0;
                display:block;
                content: "";
                width:100%;
                height:100%;
                border: 1px rgba(255,255,255,.2) solid;
                border-bottom: none;
                transform: scale(1.1,1.3) perspective(.7em) rotateX(2.2deg);
                transform-origin: bottom left;
                background: rgba(0,0,0,.5);
                border-radius:1px 2px 0 0;
                box-sizing:border-box;
                }
            }
        }

        .search-input{
            width:550px;
            height:46px;
            background:#fff;
            border-radius: 0 4px 4px 4px;
            border: 1px rgba(255,255,255,.2) solid;
            border-top:none;
            box-sizing: unset;

            input{
                flex:1;
                height:20px;
                padding: 13px 15px;
                outline: none;
                border:0;
                font-size:16px;
            }

            .el-icon-search{
                cursor :pointer;
                font-size:22px;
                padding:0 10px;
                font-weight:bold;
            }
        }
    }
}
</style>
</style>