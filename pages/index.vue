<template>
    <div class="container" title="首页">
        <!-- 幻灯片 -->
        <!-- 结合使用el-carousel和el-carousel-item标签就得到了一个走马灯。幻灯片的内容是任意的，需要放在el-carousel-item标签中。默认情况下，在鼠标 hover 底部的指示器时就会触发切换。通过设置trigger属性为click，可以达到点击触发的效果。 若将arrow设置为always，则会一直显示 interval自动切换的时间间隔，单位为毫秒-->
        <el-carousel 
        :interval="5000" 
        arrow="always">
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
    </div>
</template>

<script>
export default {
    data(){
        return {
            // 轮播图数据
            banners: [
                {
                    url: "http://157.122.54.189:9095/assets/images/th03.jfif",
                },
                {
                    url: "http://157.122.54.189:9095/assets/images/th04.jfif",
                }
            ]
        }
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
}
</style>