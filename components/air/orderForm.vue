<template>
    <div class="main">
        <div class="air-column">
            <h2>乘机人</h2>
            <!-- medel  表单数据对象 -->
            <el-form class="member-info" :model="{users}" ref="usersForm" style="border-bottom:15px">
                <div class="member-info-item" v-for="(value,index) in users" :key='index'>

                    <!--需求：从users里找到每一个username 绑定rules 
                        遍历users得到每一条value 
                        prop是定义需要规则的键 也就是users.username去找到值
                        从users里找到每一个username   users.value.username
                        value=users[index]
                    -->

                    <el-form-item label="乘机人姓名" :prop="`users[${index}].username`" :rules="[{
                    required: true,        
                    message: '请输入乘机人姓名', 
                    trigger: 'blur' 
                }]" >
                      
                        <el-input v-model="value.username" placeholder="请输入姓名" class="input-with-select">
                            <el-select 
                            slot="prepend" 
                            value="1" 
                            placeholder="请选择">
                                <el-option label="成人" value="1"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="证件类型" :prop="`users[${index}].id`" :rules="[{
                    required: true, 
                    message: '请输入证件号码', 
                    trigger: 'blur' 
                }]" >
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
          <!-- ---------------------保险-------------------------------   -->
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
          <!-- ------------------------联系人----------------------------   -->
        <div class="air-column">
            <h2>联系人</h2>
            <div class="contact">
                <el-form label-width="80px" :rules="rules" ref="columnForm" :model="{contactName,contactPhone,captcha}">
                    <el-form-item label="姓名" prop="contactName">
                        <el-input v-model="contactName" @focus="clearRules('contactName')"></el-input>
                    </el-form-item>

                    <el-form-item label="手机" prop="contactPhone">
                        <el-input placeholder="请输入内容" @focus="clearRules('contactPhone')" v-model="contactPhone">
                            <template slot="append">
                            <el-button @click="handleSendCaptcha">发送验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="验证码" prop="captcha">
                        <el-input v-model="captcha" @focus="clearRules('captcha')"></el-input>
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
                    username:'xioabi',
                    id:'4416555555555555'
                }
            ],
            insurances:[],     //保险id
            contactName:'xiaobai',     //联系人名字
            contactPhone:'13777777777',    //电话
            invoice:false,      //是否需要发票
            captcha:'000000',
            rules:{
                contactName:[{
                    required: true, 
                    message: '请输入联系人名字', 
                    trigger: 'blur' 
                }],

                 contactPhone:[{
                    required: true, 
                    message: '请输入联系人电话', 
                    trigger: 'blur' 
                }],
                 captcha:[{
                    required: true, 
                    message: '请输入验证码', 
                    trigger: 'blur' 
                }],
            }


        }
    },
    methods: {
         // 1.聚焦时清除规则
        clearRules(pp){
            this.$refs.columnForm.clearValidate(pp)
        },
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
            // 正则规则语法：规则.test(需要验证的字符)
          let regexp= /^1[3456789]\d{9}$/
          if(!regexp.test(this.contactPhone)){
            return this.$message.error('请输入正确的手机号')
          }
            let res = await captchas(this.contactPhone)
            if(res.status==200){
                this.$message.success('验证码发送成功')
            }
             console.log(res);
        },
        // 提交订单
         handleSubmit(){
            //  this.$refs.usersForm.validate((isValid) => {
            //       console.log(isValid);
            //         if (isValid) {
            //             this.$refs.columnForm.validate((isValid) => {
            //                 if (isValid) {
            //                 }
            //             })
            //         }
            // })
         Promise.all([
             this.$refs.usersForm.validate(),
             this.$refs.columnForm.validate()
         ]).then(res=>{
              // 因为 Promise.all 传入了两个元素组成的数组
              // 所以 res 也是一个数组对应,上面promise 的结果
             if(res[0]&&res[1]){
                   console.log("两个表单都交验完了, 应该发请求");
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
                                //  console.log(this.data);
                                //  console.log(data);

                                //提交完了需要等一段时间
                                this.$message.success({
                                    message:'正在生成订单！请稍等',
                                    duration:1000})

                                //  发送请求
                                this.$axios({
                                    url:'/airorders',
                                    method:'post',
                                    //  Bearer是JWT定义的规范
                                    headers:{
                                        Authorization:'Bearer '+this.$store.state.userstore.userInfo.token
                                    },
                                    data
                                }).then(res=>{
                                    console.log(res);
                                    this.$message.success(res.data.message)
                                    let id=res.data.data.id
                                    //跳转到付款页
                                    this.$router.push({
                                        path:'/air/pay',
                                        query:{id}
                                    })
                                })

             }
         })

        

         }
            
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

    // 显示错误时，出现文字的下边距
    // .member-info /deep/ .el-form-item{
    //     margin-bottom:0;
    // }

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