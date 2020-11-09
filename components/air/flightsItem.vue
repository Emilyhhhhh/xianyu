<template>
<div>
    <div class="flight-item" v-for="(v,index) in dataList" :key="index">
        <div>
            <!-- 显示的机票信息 -->
            <el-row type="flex" align="middle" class="flight-info">
                <el-col :span="6">
                    <span>{{v.airline_name}} </span>{{v.flight_no}}
                </el-col>
                <el-col :span="12">
                    <el-row type="flex" justify="space-between" class="flight-info-center">
                        <el-col :span="8" class="flight-airport">
                            <strong>{{v.dep_time}}</strong>
                            <span>{{v.org_airport_name+v.org_airport_quay}}</span>
                        </el-col>
                        <el-col :span="8" class="flight-time">
                            <span>2时20分</span>
                        </el-col>
                        <el-col :span="8" class="flight-airport">
                            <strong>{{v.arr_time}}</strong>
                            <span>{{v.dst_airport_name+v.dst_airport_quay}}</span>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6" class="flight-info-right">
                    ￥<span class="sell-price">{{v.seat_infos[0].org_settle_price_child}}</span>起
                </el-col>
            </el-row>
        </div>
        <div class="flight-recommend">
            <!-- 隐藏的座位信息列表 -->
            <el-row type="flex"  justify="space-between" align="middle">
                <el-col :span="4">低价推荐</el-col>
                <el-col :span="20">
                    <el-row type="flex" justify="space-between" align="middle" class="flight-sell">
                        <el-col :span="16" class="flight-sell-left">
                            <span>{{v.seat_infos[0].name}}</span> | {{v.seat_infos[0].supplierName}}
                        </el-col>
                        <el-col :span="5" class="price">
                            ￥{{v.seat_infos[0].org_settle_price}}
                        </el-col>
                        <el-col :span="3" class="choose-button">
                            <el-button 
                            type="warning" 
                            size="mini">
                            选定
                            </el-button>
                            <p>剩余：{{v.seat_infos[0].discount}}</p>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>
    </div>
</template>

<script>
import {airsList} from '@/myapi/user.js'
export default {
    data () {
        return {
            flightsData:{},   // 航班总数据
            dataList: [],      //航班列表数据，循环渲染flightsItem组件，单独出来是因为要分页
        }
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