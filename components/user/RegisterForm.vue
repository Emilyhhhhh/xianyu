<template>
  <el-form :model="form"  :rules="rules" ref="ruleForm"  class="form">
<!-- 用户名 -->
  <el-form-item  class="form-item" prop='username'>
    <el-input 
        v-model="form.username" 
        placeholder="用户名/手机"  @focus="clearRules('username')">
    </el-input>
  </el-form-item>
<!-- 验证码 -->
  <el-form-item  class="form-item" prop='username'>
    <el-input 
        v-model="form.captcha" 
        placeholder="验证码"  @focus="clearRules('username')">
     <template slot="append">
    <el-button >发送验证码</el-button>
     </template>
    </el-input>
  </el-form-item>
<!-- 昵称 -->
  <el-form-item  class="form-item" prop='username'>
    <el-input 
        v-model="form.nickname" 
        placeholder="昵称"  @focus="clearRules('username')">
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
  <el-form-item  class="form-item" prop='password'>
    <el-input 
       type="password"
       v-model="form.checkPassword" 
       placeholder="确认密码" @focus="clearRules('password')"></el-input>
  </el-form-item>

  <el-form-item class="form-item">
    <el-button type="primary" @click="handleRegSubmit()" class="submit">注册</el-button>
  </el-form-item>

</el-form>
</template>

<script>
import {login} from '@/myapi/user.js'
export default {
    data () {
        return {
            // 表单数据
            form:{
                username:'',//用户名/手机
                password:'', //登录密码
                checkPassword:'',//确认密码
                nickname:'', //昵称
                captcha:'',  //手机验证码
            },
            // 表单规则：输入内容内初步提示，在整个表单验证，用prop指定某个需要校验规则
            rules: {
                username:[{
                    required: true, 
                    message: '请输入用户名', 
                    trigger: 'blur' 
                },
                 {
                    pattern:   /^.{10,13}$/,   //任意5-8个字符
                    message: '请输入10到13位账号', 
                    trigger: 'blur' 
                    },
                ],
                password:[
                    {
                     required: true, 
                    message: '请输入密码', 
                    trigger: 'blur' 
                    },
                    {
                    pattern:   /^.{5,8}$/,   //任意5-8个字符
                    message: '请输入任意5-8位密码', 
                    trigger: 'blur' 
                    },
                ]

            },
        }
    },
    methods: {
        clearRules(pp){
            this.$refs.ruleForm.clearValidate(pp)
        },
         handleRegSubmit(){
           console.log(this.form);
          

        }
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