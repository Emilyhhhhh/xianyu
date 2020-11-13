<template>
      <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <div class="main">
                <orderForm v-if="formData.insurances" :data='formData' @totalPrice='priceChange' />
                
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <orderAside v-if="formData.insurances" :data='formData' :totalPrice='totalPrice' />
            </div>
        </el-row>
    </div>
</template>

<script>
import orderForm from '@/components/air/orderForm.vue'
import orderAside from '@/components/air/orderAside.vue'
export default {
    components: {
        orderForm,orderAside
    },
    data () {
        return {
            //机票信息
            formData:{},
            totalPrice:''
 
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
            this.formData=res.data
            console.log('res',res);
            console.log('传过去的数据',this.formData);
        })
    },   
    methods: {
        priceChange(price){
            this.totalPrice=price
        }

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