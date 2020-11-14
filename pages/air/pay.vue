<template>
    <div class="container">
        <div class="main">
            <div class="pay-title">
                支付总金额 <span class="pay-price">￥ {{payData.price}}</span>
            </div>
            <div class="pay-main">
                <h4>微信支付</h4>
                <el-row type="flex" 
                justify="space-between" 
                align="middle"
                class="pay-qrcode">
                    <div class="qrcode">
                        <!-- 二维码 -->
                        <canvas id="qrcode-stage"></canvas>
                        <p>请使用微信扫一扫</p>
                        <p>扫描二维码支付</p>
                    </div>
                    <div class="pay-example">
                        <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt="">
                    </div>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
    data () {
        return {
            timer:null,
            payData:{},
            
        }
    },
    // mounted(){
    //     // userInfo在页面加载完才赋值，一开始没有token，要等一下
    //     // setTimeout(v=>{
    //     //     this.$axios({
    //     //         url:'airorders/'+this.$route.query.id,
    //     //         headers:{
    //     //             Authorization:'Bearer '+this.$store.state.userstore.userInfo.token
    //     //         }
    //     //     }).then(res=>{
    //     //         console.log(res);
    //     //         // price 用于展示
    //     //         const {payInfo, price} = res.data;
    //     //         this.price=price

    //     //          // 生成二维码到canvas
    //     //         const stage = document.querySelector("#qrcode-stage");
    //     //         QRCode.toCanvas(stage, payInfo.code_url , {
    //     //             width: 200

    //     //         });
    //     //     })
    //     // },200)
    // },
    watch: {
        'this.$store.state.userstore.userInfo.token':{
            handler : function() {
                if(this.$store.state.userstore.userInfo.token){
                    console.log(this.$store.state.userstore.userInfo.token);
                    this.$axios({
                    url:'airorders/'+this.$route.query.id,
                    headers:{
                        Authorization:'Bearer '+this.$store.state.userstore.userInfo.token
                    }
                }).then(res=>{
                    console.log(res);
                    // price 用于展示
                    // const {payInfo, price} = res.data;
                    this.payData=res.data;
    
                    // 生成二维码到canvas
                    const stage = document.querySelector("#qrcode-stage");
                    QRCode.toCanvas(stage, this.payData.payInfo.code_url , {
                        width: 200
                    });

                      
                        this.checkPay()
                      
                })
                }
            },
            immediate:true  
            //watch时有一个特点，就是当值第一次绑定时，不会执行监听函数，最初绑定值的时候也执行函数

        }
    },
    methods: {
        // 支付结果轮询
        checkPay(){
            this.$axios({
                url:'airorders/checkpay',
                method:'post',
                data:{
                    id:this.$route.query.id,
                    nonce_str: this.price,  //支付接口返回的订单金额
                    out_trade_no:  this.payData.payInfo.order_no //订单编号
                },
                headers:{
                        Authorization:'Bearer '+this.$store.state.userstore.userInfo.token
                    }
            }).then(res=>{
                console.log(res.data);
                if(res.data.statusTxt=="订单未支付"){
                    setInterval(() => {
                        this.checkPay()
                    }, 8000);
                }else{
                     this.$message.success('订单支付成功')
                   

                }
            })
        }
    }

}
</script>

<style scoped lang="less">
.container{
    background:#f5f5f5;
    padding: 30px 0;

    .main{
        width:1000px;
        margin:0 auto;

        .pay-title{
            text-align: right;
            span{
                font-size:28px;
                color:orangered;
            }
        }

        .pay-main{
            background:#fff;
            margin-top:10px;
            border-top: 5px orange solid;
            padding:30px;

            h4{
                font-size: 28px;
                font-weight: normal;
                margin-bottom: 10px;
            }

            .pay-qrcode{
                padding:0 80px;
            }

            .qrcode{
                border:1px #ddd solid;
                padding:15px;
                height: fit-content;

                #qrcode-stage{
                    width:200px;
                    height:200px;
                    margin-bottom: 10px;
                }

                p{
                    line-height: 2;
                    text-align: center;
                }
            }
        }
    }
}
</style>