<template>
    <div class="filters">
        <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col :span="8">
                单程： 
                广州 - 上海 
                / 
                2019-06-17
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
                    label="大"
                    value="大">
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

<style>

</style>