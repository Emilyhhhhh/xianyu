<template>
    <div class="main">
        <div class="air-column">
            <h2>乘机人</h2>
            <el-form class="member-info">
                <div class="member-info-item" v-for="(value,index) in users" :key='index'>

                    <el-form-item label="乘机人姓名">
                        <el-input v-model="value.username" placeholder="请输入姓名" class="input-with-select">
                            <el-select 
                            slot="prepend" 
                            value="1" 
                            placeholder="请选择">
                                <el-option label="成人" value="1"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="证件类型">
                        <el-input 
                         v-model="value.id"
                        placeholder="请输入证件号码"  class="input-with-select">
                            <el-select 
                            slot="prepend" 
                            value="1"           
                            placeholder="请选择">
                                <el-option label="身份证" value="1" :checked="true"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <span class="delete-user" @click="handleDeleteUser(index)">-</span>
                </div>
            </el-form>

            <el-button class="add-member" type='primary' @click="handleAddUsers">添加乘机人</el-button>
        </div>
            
        <div class="air-column">
            <h2>保险</h2>
            <div>
                <el-checkbox-group v-model="insurances">
                  <div class="insurance-item" v-for="(item,index) in data.insurances" :key="index">
                    <el-checkbox 
                    :label="item.id" 
                    border>
                    {{item.type}}：￥{{item.price}}/份× {{users.length}}  最高赔付 {{item.compensation}}
                    </el-checkbox> 
                  </div>
                </el-checkbox-group>
            </div>
        </div>

        <div class="air-column">
            <h2>联系人</h2>
            <div class="contact">
                <el-form label-width="60px">
                    <el-form-item label="姓名">
                        <el-input v-model="contactName"></el-input>
                    </el-form-item>

                    <el-form-item label="手机">
                        <el-input placeholder="请输入内容"  v-model="contactPhone">
                            <template slot="append">
                            <el-button @click="handleSendCaptcha">发送验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="验证码">
                        <el-input v-model="captcha"></el-input>
                    </el-form-item>
                <el-checkbox  v-model="invoice">是否需要发票
                    </el-checkbox> 
                </el-form>   
                <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
            </div>
        </div>
    <span style="display:none">{{totalPrice}}</span>
    </div>
</template>

<script>
import {captchas} from '@/myapi/user.js'
export default {
    props: ['data'],
    data () {
        return {
            users:[
                // 乘机人信息
                // 乘机人应该是一个数组
                // 里面的每个对象都是一个乘机人
                // 添加删除的实话, 只需要 push / splice
                {
                    username:'xiaobai',
                    id:'441611111111111111'
                }
            ],
            insurances:[],     //保险id
            contactName:'xiaobai',     //联系人名字
            contactPhone:'13722222222',    //电话
            invoice:false,      //是否需要发票
            captcha:'000000'
        }
    },
    methods: {
        // 移除乘机人
        handleDeleteUser(index){
            // console.log(index);
            this.users.splice(index,1)

        },
        // 添加乘机人
        handleAddUsers(){
            console.log(this.users);
            // this.users.push({
            //     username:'',
            //     id:''
            // })
            this.users=[
                ...this.users,
                {
                   username:'',
                    id:'' 
                }
            ]
        },
        // 发送验证码
        async handleSendCaptcha(){
             let res = await captchas(this.contactPhone)
             console.log(res);
        },
        // 提交订单
         handleSubmit(){
             let data= {
                 users:this.users,
                insurances:this.insurances,    
                contactName:this.contactName,   
                contactPhone:this.contactPhone,    
                invoice:this.invoice,     
                captcha:this.captcha,
                seat_xid:this.$route.query.seat_xid,
                air:this.$route.query.id
             }
             console.log(this.data);
             console.log(data);
            //  发送请求
             this.$axios({
                 url:'/airorders',
                 method:'post',
                 headers:{
                     Authorization:'Bearer '+this.$store.state.userstore.userInfo.token
                 },
                 data
             }).then(res=>{
                 console.log(res);
                 this.$message.success(res.data.message)

             })
        },
    },

    computed:{
        totalPrice(){
            let res=0
            // 机票价格=机票*人数
            res=this.data.seat_infos.org_settle_price*this.users.length
            console.log(res);

            //保险价格=保险*人数
            //几个id就是几份保险，人数是绑定式的，一般要买都买  不买都不买
           this.insurances.forEach(id=>{
            //    第一层取到选中的保险id
               this.data.insurances.forEach(dataId=>{
                //    遍历原始数据的id
                   if(dataId.id==id){

                    res+=dataId.price*this.users.length
                   }
               })
           })
            console.log(res);


            this.$emit('totalPrice',res)
            return res
        }

    }

}
</script>
<style scoped lang="less">
    .air-column{
        border-bottom:1px #ddd dashed;
        padding-bottom: 20px;   
        margin-bottom: 20px;
    }

    .air-column h2{
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: normal;
    }

    /deep/ .el-select .el-input {
        width: 130px;
    }

    .input-with-select{
        width:590px;
    }

    .input-with-select /deep/  .el-input-group__prepend {
        background-color: #fff;
    }
    .member-info /deep/ .el-form-item{
        margin-bottom:0;
    }

    .member-info-item{
        border-bottom:1px #eee dashed;
        padding-bottom: 20px;
        position: relative;

        &:first-child{
            .delete-user{
                display: none;
            }
        }
    }

    .add-member{
        margin-top:20px;
    }

    .delete-user{
        display: block;
        background:#ddd;
        width:16px;
        height:16px;
        font-size:14px;
        text-align: center;
        line-height: 16px;
        color:#fff;
        cursor: pointer;
        border-radius: 50px;
        position:absolute;
        right:-30px;
        top:50%;
    }

    .insurance{
        > div{
            margin-top:10px;
        }
    }

    .insurance-item{
        margin-bottom: 20px;
    }

    .contact{
        /deep/ .el-input{
            width:50%;
        }
    }

    .submit{
        margin: 50px auto;
        display: block;
        width:250px;
        height:50px;
    }
</style>