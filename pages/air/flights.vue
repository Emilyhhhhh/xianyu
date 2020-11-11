<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 等options有数据了再传值-->
                <flightsFilters v-if="flightsData.options" :data=flightsData @setDAataList='setDAataList' />
                    <!-- 🚩🚩3. 分页组件 -->
                     <el-pagination
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="pageIndex"
                       :page-sizes="[5, 10, 15, 20]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="filterList.length">
                       <!-- 原来的总数量 -->
                     </el-pagination>
                
                <!--🚩🚩1. 航班头部布局 -->
                <flightsListHead/>
                
                
                <!-- 航班信息 -->
                <!-- 🚩🚩4.没有数据就不显示了 -->
                <div v-if="dataList.length>0">
                     <!--🚩🚩2. 航班列表 -->
                    <flightsItem v-for="(v,index) in dataList" :key="index" :data=v /> 
                </div>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
                <flightsAside/>

            </div>
        </el-row>
    </section>
</template>

<script>
import flightsListHead from '@/components/air/flightsListHead.vue'
import flightsItem from '@/components/air/flightsItem.vue'
import flightsFilters from '@/components/air/flightsFilters.vue'
import flightsAside from '@/components/air/flightsAside.vue'
import {airsList} from '@/myapi/user.js'

export default {
    data () {
        return {
            flightsData:{},   // 航班总数据
            // dataList: [],      //航班列表数据，循环渲染flightsItem组件，单独出来是因为要分页
            pageIndex: 1, // 当前页数
            pageSize: 5,  // 显示条数

            filterList: [], //存放筛选过后的数据
        }
    },
    components: {
        flightsListHead,flightsItem,flightsFilters,flightsAside
    },
     mounted () {
         this.getData ()
    },
    computed:{
        // 因为分页的数据是手算的，
        // 所以这里将分页数据计算函数封装成一个计算属性
        dataList(){
             // 因为这里面是页面进入时就执行, 不像之前可以在
             // 获取数据 .then 之后执行z
             // 加一个判断, 有数据,就切割, 没数据就返回默认空数组即可
            if(!this.filterList){
                return []
            }

            let start=(this.pageIndex-1)*this.pageSize
            let end=this.pageSize+start

            return this.filterList.slice(start,end)

        }
    },
    methods:{
        // 获取航班总数据
        async getData () {
           let res = await airsList(this.$route.query)   //   url上面的参数

           // 原来的数组，用于做分页列表总数total
           this.flightsData=res.data
        
           // 用来给flightsItem组件渲染航班列表
           // this.dataList = this.flightsData.flights;
   
           console.log('this.flightsData',this.flightsData);
           console.log('this.dataList',this.dataList);

        /* 缓存一份新的列表数据数据，这个列表不会被修改
        而 flightsData 会被修改，注意这里需要使用 ES9 的解构对象，或者
        Object.assign() 静态方法进行对象的复制，否则会出现引用赋值的现象，两个变量
        指向同一个对象 */
        
           this.filterList=[...this.flightsData.flights]
           console.log(this.filterList);
        },

        setDAataList(newList){
            this.filterList=newList
            console.log(this.filterList);

            
        },

         // 页面显示的条数改变时触发
         handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize=val
            this.pageIndex=1
            // this.setDAataList()
         },

         // 改变页码的时候触发
          handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pageIndex=val
            // this.setDAataList()
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