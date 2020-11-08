<template>
<!-- form整个表单，用于数据提取或渲染，rules设置校验规则 -->
  <el-form :model="form"  :rules="rules" ref="ruleForm"  class="form">
<!-- prop告诉这个文本框是按rules的哪条规则校验的，v-model绑定表单的属性 -->
  <el-form-item  class="form-item" prop='username'>
    <el-input 
        v-model="form.username" 
        placeholder="用户名/手机"  @focus="clearRules('username')">
    </el-input>
  </el-form-item>

  <el-form-item  class="form-item" prop='password'>
    <el-input 
       type="password"
       v-model="form.password" 
       placeholder="密码" @focus="clearRules('password')"></el-input>
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
                username:'13800138000',
                password:'123456'
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
        // handleLoginSubmit() {
        //         // 发送登录请求前, 需要一次性校验整个表格
        //         // 1. 拿到表格对象
        //         // 2. 使用 elmentui 的函数校验表格
        //         // 3. 合法输入则发送请求
        //         // this.$refs.form.validate((isValid, obj)=>{})
        //         // 可以是回调也可以作为 promise
        //         this.$refs.form
        //             .validate()
        //             .then((isValid) => {
        //                 if (isValid) {
        //                     console.log("应该发送请求 ");
        //                     console.log(this.form);
        //                     this.$axios({
        //                       url: '/accounts/login',
        //                       method: 'post',
        //                       data: this.form
        //                     }).then(res=>{
        //                       console.log(res.data);
        //                       if (res.data.token) {
        //                         this.$message.success('登录成功')
        //                       }
        //                     })
        //                 }
        //             })
        //             .catch((err) => {
        //                 console.log("不可以发请求 ");
        //                 console.log(err);
        //             });
        // },
         submit(){
            // 再次验证表单，如果格式不对，不发送请求
            this.$refs.ruleForm.validate(async(isvalidata)=>{
                let res
                console.log(isvalidata);
                if(isvalidata){
                    res=await login(this.form)
          
                    if(res.data.token){
                        this.$message.success("登录成功");
                        //将结果发送到刚刚新建的vuex中，存储，实现状态持久化，不然刷新之后数据就没了
                        this.$store.commit('userstore/setUserInfo',res.data)
                        console.log(res.data);
                        this.$router.push('/')


                    }else{
                        console.dir(Error);
                    }
                }else{
                        console.dir(Error) ;
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