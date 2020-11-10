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

                     <el-pagination
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="pageIndex"
                       :page-sizes="[5, 10, 15, 20]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="flightsData.total">
                     </el-pagination>
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
            pageIndex: 1, // 当前页数
            pageSize: 5,  // 显示条数
        }
    },
    components: {
        flightsListHead,flightsItem
    },
     // 获取航班总数据
     mounted () {
        this.getData ()
    },
    methods:{
        async getData () {
           let res = await airsList(this.$route.query)   //   url上面的参数
           this.flightsData=res.data
           this.dataList = this.flightsData.flights;
   
           console.log(this.flightsData);
           console.log(this.dataList);
           // 因为获取的数据是整个数据，所以需要自己手动分   数据
           this.setDAataList()   //调用手动分页的方法
        },

        setDAataList(){
          // slice截取数组，括号内第一个是截取的起始位置(包含)，第二个 是结束的位置(不包含)，不会改变原数组

        //   不减1 最后一页  第五页是没有数据的
          let start=(this.pageIndex-1)*this.pageSize
          let end=this.pageSize+start
          this.dataList =this.flightsData.flights.slice(start,end)
        },


         handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize=val
            this.pageIndex=1
            this.setDAataList()
         },

          handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pageIndex=val
            this.setDAataList()
          }
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