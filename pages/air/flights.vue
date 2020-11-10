<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div>
                    
                </div>
                
                <!--🚩🚩1. 航班头部布局 -->
                <flightsListHead/>
                
                
                <!-- 航班信息 -->
                <div>
                     <!--🚩🚩2. 航班列表 -->
                    <flightsItem v-for="(v,index) in dataList" :key="index" :data=v /> 
                </div>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
            </div>
        </el-row>
    </section>
</template>

<script>
import flightsListHead from '@/components/air/flightsListHead.vue'
import flightsItem from '@/components/air/flightsItem.vue'
import {airsList} from '@/myapi/user.js'

export default {
    data () {
        return {
            flightsData:{},   // 航班总数据
            dataList: [],      //航班列表数据，循环渲染flightsItem组件，单独出来是因为要分页
        }
    },

    components: {
        flightsListHead,flightsItem
    },
     // 获取航班总数据
    async mounted () {
        let res = await airsList(this.$route.query)   //url上面的参数
        this.flightsData=res.data
        this.dataList = this.flightsData.flights;

        console.log(this.flightsData);
        console.log(this.dataList);

    }

}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>