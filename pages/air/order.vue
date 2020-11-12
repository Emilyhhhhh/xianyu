<template>
      <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <div class="main">
                <orderForm :data='infoData' />
                
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                          
            </div>
        </el-row>
    </div>
</template>

<script>
import orderForm from '@/components/air/orderForm.vue'
export default {
    components: {
        orderForm
    },
    data () {
        return {
            //机票信息
            infoData:{
                insurances:[]    //初始化保险数据
            }
        }
    },
    mounted () {

        this.$axios({
            url: '/airs/'+this.$route.query.id,
            params:{
                id:this.$route.query.id,
                seat_xid:this.$route.query.seat_xid
            }
        // 注意data传参的格式，不然会报400
        }).then(res=>{
            this.insurances=res.data
            console.log(res);
            console.log(this.insurances);
        })

    }

}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>