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
                <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
                    <el-option
                    :label="v"
                    :value="v"
                    v-for="(v,i) in data.options.airport" :key='i'>
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="flightTimes"  placeholder="起飞时间" @change="handleFlightTimes">
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
                <el-select size="mini" v-model="company"  placeholder="航空公司" @change="handleCompany">
                    <el-option
                    :label="v"
                    :value="v" v-for="(v,i) in data.options.company" :key='i'>
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
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
        handleAirport(){},
        handleFlightTimes(){},
        handleCompany(){},
        handleAirSize(){},
        handleFiltersCancel(){},
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