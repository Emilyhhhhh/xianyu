<template>
  <div>
    <!-- 这里相当于之前的app.vue -->
    <!-- <router-view></router-view> -->
    <UserHeader />
    <!--  -->
    <Nuxt />
    <UserFooter />

  </div>
</template>


<script>
import UserFooter from '@/components/user/UserFooter'
import UserHeader from '@/components/user/UserHeader'

export default {
  components:{
    UserHeader,UserFooter
  }

}
</script>

<style lang="less">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*{
  margin:0; 
  padding:0;
}
ul, li, ol{
  list-style:none;
}
a{
  text-decoration:none;
  color:inherit;
}

em,i{
  font-style: normal;
}
</style>