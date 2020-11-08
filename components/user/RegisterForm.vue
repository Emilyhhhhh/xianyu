<template>
  <el-form :model="form"  :rules="rules" ref="ruleForm"  class="form">
<!-- 用户名 -->
  <el-form-item  class="form-item" prop='username'>
    <el-input 
        v-model="form.username" 
        placeholder="用户名/手机"  @focus="clearRules('username')" >
    </el-input>
  </el-form-item>
<!-- 验证码 -->
  <el-form-item  class="form-item" prop='captcha'>
    <el-input 
        v-model="form.captcha" 
        placeholder="验证码"  @focus="clearRules('captcha')">
     <template slot="append">
    <el-button @click="handleSendCaptcha">发送验证码</el-button>
     </template>
    </el-input>
  </el-form-item>
<!-- 昵称 -->
  <el-form-item  class="form-item" prop='nickname'>
    <el-input 
        v-model="form.nickname" 
        placeholder="昵称"  @focus="clearRules('nickname')">
    </el-input>
  </el-form-item>
<!-- 密码 -->
  <el-form-item  class="form-item" prop='password'>
    <el-input 
       type="password"
       v-model="form.password" 
       placeholder="密码" @focus="clearRules('password')"></el-input>
  </el-form-item>

<!-- 确认密码 -->
  <el-form-item  class="form-item" prop='checkPassword'>
    <el-input 
       type="password"
       v-model="form.checkPassword" 
       placeholder="确认密码" @focus="clearRules('checkPassword')"></el-input>
  </el-form-item>

  <el-form-item class="form-item">
    <el-button type="primary" @click="handleRegSubmit()" class="submit">注册</el-button>
  </el-form-item>

</el-form>
</template>

<script>
import {register,captchas} from '@/myapi/user.js'
export default {
    data () {
      //由于校验函数只是在data使用，可以直接写在data中
      // value 输入的内容
      // 校验完成就需要执行
            // 1. 如果校验合法, 直接执行, 没有参数
            // 2. 如果不合法, 就要带上一个错误对象参数 new Error('两次密码必须相同')
      // 确认密码
      const validatePass=(rule,value,callback)=>{
        if(value===''){
          callback(new Error('请再次输入密码'))
        }else if(value !== this.form.password){
          callback(new Error('两次输入密码不一致'))
        }else{
          callback()
        }
      }
        return {
            // 表单数据
            form:{
                username:'18819435342',//用户名/手机
                password:'123456', //登录密码
                checkPassword:'123456',//确认密码
                nickname:'小白', //昵称
                captcha:'000000',  //手机验证码
            },
            // 表单规则：输入内容内初步提示，在整个表单验证，用prop指定某个需要校验规则
            rules: {
              checkPassword:[
                {
                    validator: validatePass,   //校验密码
                    trigger: 'blur' 
                    },
                ],
                // ---------------------------------
                username:[{
                    required: true, 
                    message: '请输入用户名', 
                    trigger: 'blur' 
                },
           // ---------------------------------
                //  {
                //     pattern:   /^1[3456789]\d{9}$/,   //任意5-8个字符
                //     message: '请输入10到13位账号', 
                //     trigger: 'blur' 
                //     },
                ],
           // ---------------------------------
                password:[
                    {
                     required: true, 
                    message: '请输入密码', 
                    trigger: 'blur' 
                    },
                    // {
                    // pattern:   /^.{5,8}$/,   //任意5-8个字符
                    // message: '请输入任意5-8位密码', 
                    // trigger: 'blur' 
                    // },
                ],
                // ---------------------------------
                nickname:[
                  {
                     required: true, 
                    message: '请输入昵称', 
                    trigger: 'blur' 
                    },
                ],
                // ---------------------------------
                captcha:[
                  {
                     required: true, 
                    message: '请输入手机验证码', 
                    trigger: 'blur' 
                    },
                ]

            },
        }
    },
    methods: {
      // 1.聚焦时清除规则
        clearRules(pp){
            this.$refs.ruleForm.clearValidate(pp)
        },

     // 2.发送验证码
     async handleSendCaptcha(){
          // 正则规则语法：规则.test(需要验证的字符)
          let regexp= /^1[3456789]\d{9}$/
          if(!regexp.test(this.form.username)){
            return this.$message.error('请输入正确的手机号')
          }
          console.log(this.form.username);
          let res=await captchas(this.form.username)
          console.log(res);
          if (res.data.code) {
            this.$message.success('成功获取验证码:' + res.data.code)
            }
        },
      
      // 3.点击注册
      handleRegSubmit(){
         console.log(this.form);
        //  再次验证表单
         this.$refs.ruleForm.validate(async(isvalidate)=>{
           let res
           if(isvalidate){
            //  注册请求的参数不需要确认密码，所以使用剩余运算符去掉
             let {checkPassword,...data}=this.form
             res=await register(data)
             console.log(res);
             if (res.data.token) {
            this.$message.success('注册成功' )
            this.$emit('toLogin')

            }
           }
         })
      },
    }

}
</script>


<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>