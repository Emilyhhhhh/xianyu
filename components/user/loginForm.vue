<template>
  <el-form :model="form"  :rules="rules" ref="ruleForm"  class="form">

  <el-form-item  class="form-item" prop='username'>
    <el-input 
        v-model="form.username" 
        placeholder="用户名/手机">
    </el-input>
  </el-form-item>

  <el-form-item  class="form-item" prop='password'>
    <el-input 
       type="password"
       v-model="form.password" 
       placeholder="密码" ></el-input>
  </el-form-item>
 
  <el-form-item class="form-item">
  <p class="form-text">
    <nuxt-link to="#">忘记密码</nuxt-link></p>
    <el-button type="primary" @click="submit()" class="submit">登录</el-button>
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
                username:'',
                password:''
            },
            // 表单规则：输入内容内初步提示，在整个表单验证，用prop指定某个需要校验规则
            rules: {
                username:{
                    required: true, 
                    message: '请输入用户名', 
                    trigger: 'blur' 
                },
                password:{
                     required: true, 
                    message: '请输入密码', 
                    trigger: 'blur' 
                }

            },
        }
    },
    methods: {
        async submit(){
            // 再次验证表单，如果格式不对，不发送请求
            this.$refs.ruleForm.validate((isvalidata)=>{
                if(isvalidata){
                    let res=await login(this.form)
                    console.log(res);
                }else{
                    
                }
            })

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