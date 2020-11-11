<template>
    <div class="filters">
        <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col :span="8">
                单程： 
                 {{data.info.departCity}} - {{data.info.destCity}} 
                / 
                {{data.info.departDate}}
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="runFilters">
                    <el-option
                    :label="v"
                    :value="v"
                    v-for="(v,i) in data.options.airport" :key='i'>
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="flightTimes"  placeholder="起飞时间" @change="runFilters">
                     <!-- 由于我们的筛选不经过后台, 这里的 value 可以随便定
                    只要后面写筛选, 根据这里的 value 值去过滤即可 -->
                    <el-option
                    :label="`${v.from}:00-${v.to}:00`"
                    :value="`${v.from},${v.to}`"
                    v-for="(v,i) in data.options.flightTimes" :key='i'>
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="company"  placeholder="航空公司" @change="runFilters">
                    <el-option
                    :label="v"
                    :value="v" v-for="(v,i) in data.options.company" :key='i'>
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <!-- 这个大中小型号没有数据，需要自己编 -->
                <el-select size="mini" v-model="airSize" placeholder="机型" @change="runFilters">
                    <el-option
                    :label="v.label"
                    :value="v.value"
                    v-for="(v,i) in sizeOptions" :key='i'>
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button 
                       type="primary" 
                       round 
                       plain 
                       size="mini" 
                       @click="handleFiltersCancel">
                撤销
    		</el-button>
        </div>
    </div>
</template>

<script>

export default {
    props: {
     data:{
        type:Object,
        default:{}
     }
    },
    data () {
        return {
            airport:'',
            flightTimes:'',
            company:'',
            airSize:'',
             sizeOptions: [
                    {
                        label: '大',
                        value: 'L'
                    },
                    {
                        label: '中',
                        value: 'M'
                    },
                    {
                        label: '小',
                        value: 'S'
                    }
                ]
        }
    },
    methods: {
        // 解决每次过滤都会使用原始数据, 每一个过滤器都会覆盖上一个过滤器的结果
        runFilters(){
            let flights=[...this.data.flights]
            console.log(flights);
            // 选了就会有值，有值就拿去跟数据对比，过滤出值一样的新数组
            if(this.airport){
                console.log(11);
                flights=this.handleAirport(flights)
                console.log(flights);
            }
            if(this.flightTimes){
               flights=this.handleFlightTimes(flights)
                console.log(flights);
            }
            if(this.company){
              flights=this.handleCompany(flights)
                console.log(flights);
            }
            if(this.airSize){
               flights=this.handleAirSize(flights)
                console.log(flights);
            }
            this.$emit('setDAataList',flights)

        }, 
        // 选择机场时候触发
        handleAirport(flights){
            console.log(flights);  //选的那个选项
            let newList=flights.filter(v=>{
                return v.org_airport_name===this.airport
            })
            console.log(newList);
            return newList
        },
// --------------------------------------------------------------

        // 选择出发时间时候触发
        handleFlightTimes(flights){
            // 分割选出来的时间：0-6
             const from = Number(this.flightTimes.split(',')[0])
             const to = Number(this.flightTimes.split(',')[1])
            console.log(from,to);

            let newList=flights.filter(v=>{
                // 过滤出 在上面分割时间内的数据：0<=time<=6
                let time=Number(v.dep_time.split(':')[0]) 
                console.log(time,typeof time);
                return time >= from && time < to
            })   
            console.log(newList);
            // this.$emit('setDAataList',newList)
            return newList
        },
// --------------------------------------------------------------
        // 选择航空公司时候触发
        handleCompany(flights){
            // 返回value=airline_name的新数组
            let newList=flights.filter(v=>{
                return v.airline_name===this.company
            })
            console.log(newList);
            // this.$emit('setDAataList',newList)
            return newList
        },
// --------------------------------------------------------------

        // 选择机型的时候触发
        handleAirSize(flights){
            console.log(flights);
            let newList=flights.filter(v=>{
                return v.plane_size===this.airSize
            })
            console.log(newList);
            // this.$emit('setDAataList',newList)
            return newList


        },
// --------------------------------------------------------------

        // 撤销条件时候触发
        handleFiltersCancel(flights){
            // 1. 清空所有筛选的选项
            this.airport='',
            this.flightTimes='',
            this.company='',
            this.airSize=''
             this.$emit('setDAataList',this.data.flights)

        },
    }

}
</script>

<style lang="less" scoped>
.filters{
    margin-bottom: 20px;
}
.filters-top{
    >div{
        /deep/ .el-select{

            margin-left: 10px;
        }
    }
}
</style>