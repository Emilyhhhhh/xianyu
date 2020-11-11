<template>
<div>
    <div class="flight-item"  @click="isshow=!isshow">
        <div >
            <!-- 显示的机票信息 -->
            <el-row type="flex" align="middle" class="flight-info" >
                <el-col :span="6">
                    <span>{{data.airline_name}} </span>{{data.flight_no}}
                </el-col>
                <el-col :span="12">
                    <el-row type="flex" justify="space-between" class="flight-info-center">
                        <el-col :span="8" class="flight-airport">
                             <!-- 起飞时间-->
                            <strong>{{data.dep_time}}</strong>
                            <span>{{data.org_airport_name+data.org_airport_quay}}</span>
                        </el-col>
                        <el-col :span="8" class="flight-time">
                             <!-- 起飞时间和到达时间的间隔：需要手动计算-->
                            <!-- <span>2时20分</span> -->
                            <span>{{rankTime}}</span>
                        </el-col>
                        <el-col :span="8" class="flight-airport">
                            <strong>{{data.arr_time}}</strong>
                             <!-- 到达时间-->
                            <span>{{data.dst_airport_name+data.dst_airport_quay}}</span>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6" class="flight-info-right">
                    ￥<span class="sell-price">{{price}}</span>起
                </el-col>
            </el-row>
        </div>
        <div class="flight-recommend" v-if="isshow">
            <!-- 隐藏的座位信息列表 -->
            <el-row type="flex"  justify="space-between" align="middle">
                <el-col :span="4">低价推荐</el-col>
                <el-col :span="20">
                    <!--🚩🚩🚩 遍历多条信息 -->
                    <el-row type="flex" justify="space-between" align="middle" class="flight-sell" v-for="(item, index) in data.seat_infos"
                    :key="index" >
                        <el-col :span="16" class="flight-sell-left">
                            <span>{{item.name}}</span> | {{item.supplierName}}
                        </el-col>
                        <el-col :span="5" class="price">
                            ￥{{item.org_settle_price}}
                        </el-col>
                        <el-col :span="3" class="choose-button">
                            <el-button 
                            type="warning" 
                            size="mini">
                            选定
                            </el-button>
                            <p v-if="item.nums!='A'">剩余：{{item.nums}}</p>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>
    </div>
</template>

<script>

export default {
    // props:['data'],

    props:{
        // 父组件传入的数据
        data: {
            type: Object,
            // 默认是空数组
            default: {}
        }},

    data () {
        return {
            isshow:false
        }
    },
    computed:{
        // 计算间隔时间
        rankTime(){
            // 拆分时间
            let dep= this.data.dep_time.split(':')
            let arr= this.data.arr_time.split(':')
            // console.log(dep,arr);
            // 统计分钟
            let depVal=Number(dep[0])*60+Number(dep[1])   //["19", "55"]   1195
            let arrVal=Number(arr[0])*60+Number(arr[1])  //["22", "20"]
            // console.log(depVal,arrVal);

            // 到达时间-出发时间
            let dis=arrVal-depVal
            // console.log(dis);  //145

            if(dis<0){
                dis=arrVal+24*60-depVal
                // console.log(dis);

            }
            return `${Math.floor(dis / 60)}时${dis % 60}分`
        },

        // 计算最低票价，儿童票
        price(){
            let steerage=this.data.seat_infos[0].org_settle_price_child
            for(let v in this.data.seat_infos){
                console.log(11111111);
                if(v.org_settle_price_child<steerage){
                    console.log(111);
                    steerage=v.org_settle_price_child
                }
                return steerage
            }
        }
    }
}
</script>

<style scoped lang="less">
    .flight-item{
        border:1px #ddd solid;
        margin-bottom: 10px;

        .flight-info{
            padding:15px;
            cursor: pointer;

            > div{
                &:first-child, &:last-child{
                    text-align: center;
                }
            }
        }

        .flight-info-center{
            padding:0 30px;
            text-align: center;

            .flight-airport{
                strong{
                    display: block;
                    font-size:24px;
                    font-weight: normal;
                }
                span{
                    font-size: 12px;
                    color:#999;
                }
            }

            .flight-time{
                span{
                    display: inline-block;
                    padding:10px 0;
                    border-bottom: 1px #eee solid;
                    color:#999;
                }
            }
        }

        .flight-info-right{
            
            .sell-price{
                font-size: 24px;
                color:orange;
                margin:0 2px;
            }
        }
    }

    .flight-recommend{
        background: #f6f6f6;
        border-top:1px #eee solid;
        padding:0 20px;

        .flight-sell{
            border-bottom:1px #eee solid;
            padding:10px 0;

            &:last-child{
                border-bottom: none;
            }

            .flight-sell-left{
                font-size: 12px;
                span{
                    color:green;
                }
            } 

            .price{
                font-size: 20px;
                color:orange;
            }

            .choose-button{
                text-align: center;
                color:#666;
                button{
                    display: block;
                    width:100%;
                    margin-bottom:5px;
                }
            }
        }
    }
</style>