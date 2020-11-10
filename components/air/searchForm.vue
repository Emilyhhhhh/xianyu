<template>
   <div class="search-form">

        <!-- 头部tab切换 -->
        <el-row type="flex" class="search-tab">
            <span v-for="(item, index) in tabs" :key="index"
            @click="handleSearchTab(index)"
            :class="{active: index === currentTab}">
                <i :class="item.icon"></i>{{item.name}}
            </span>
        </el-row>
        <!-- form表单 label-width表单域标签的宽度-->
                <el-form class="search-form-content" ref="form" label-width="80px">
            <el-form-item label="出发城市">
                <!-- fetch-suggestions 返回输入建议的方法 -->
                <!-- select 点击选中建议项时触发 -->
                <!-- autocomplete 是一个可带输入建议的输入框组件 -->
                <el-autocomplete
                :fetch-suggestions="queryDepartSearch"
                placeholder="请搜索出发城市"
                @select="handleDepartSelect"
                class="el-autocomplete"
                v-model="form.departCity"
                ></el-autocomplete>
            </el-form-item>
          <el-form-item label="到达城市">
                <el-autocomplete
                :fetch-suggestions="queryDestSearch"
                placeholder="请搜索到达城市"
                @select="handleDestSelect"
                class="el-autocomplete"
                v-model="form.destCity"
                ></el-autocomplete>
            </el-form-item>
           <el-form-item label="出发时间">
                <!-- change 用户确认选择日期时触发 -->
                <el-date-picker type="date" 
                placeholder="请选择日期" 
                style="width: 100%;"
                @change="handleDate"
                v-model="form.departDate">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="">
                <el-button style="width:100%;" 
                type="primary" 
                icon="el-icon-search"
                @click="handleSubmit">
                    搜索
                </el-button>
            </el-form-item>
            <div class="reverse">
                <span @click="handleReverse">换</span>
            </div> 
        </el-form>  

      </div>
</template>

<script>
import moment from "moment";
import {airsSearch} from '@/myapi/user.js'
export default {
    data () {
        return {
            tabs:[
                {icon: "iconfont icondancheng", name: "单程"},
                {icon: "iconfont iconshuangxiang", name: "往返"}
            ],
            currentTab:0,
            form:{
                departCity: "", // 出发城市
                departCode: "", // 出发城市代码
                departDate: "", // 日期字符串
                destCity: "",  // 到达城市
                destCode: "",  // 到达城市代码
            }
        }
    },
    methods:{
        // 🚩🚩1.头部tab切换
        handleSearchTab(index){
            this.currentTab=index
             if(index==1){
                this.$confirm('目前暂不支持往返，请使用单程选票!', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
        })
            }

        },
// -------------------------------------------------
        // 🚩🚩2.出发城市输入框获得焦点时触发
        // value当前输入值  callback输出列表的回调
        queryDepartSearch(value, callback) {
            // if(value=='') return
            // 调用发送请求
           this.airsSearchList(value,callback)

              
      },

      // 出发城市下拉选择时触发
      // 这里是用户选择了其中一个选项之后会触发的事件
      // 可以接收到用户选择选项的对象本身
      // 不单单是 value ,而是整个对象, 可以进行后续操作
      handleDepartSelect(item) {
          this.form.departCity = item.value;
          this.form.departCode = item.sort;
      },
// -------------------------------------------------
       // 🚩🚩3.到达城市输入框获得焦点时触发
        // value 是选中的值，cb是回调函数，接收要展示的列表
        queryDestSearch(value, callback) {
            //  if(value=='') return
            // 调用发送请求
           this.airsSearchList(value,callback)
        
      },

      // 到达城市下拉选择时触发
      handleDestSelect(item){
          this.form.destCity = item.value;
          this.form.destCode = item.sort;
      },

    //   // 封装搜索实时机票城市
     async airsSearchList(value,callback){
        //  if(value=='') return
          let res=await airsSearch(value)
             console.log(res);

             const arr=res.data.data.map(v=>{
              // 🚩🚩🚩 这里注意不要拼接错误，这里的参数后期都要做的，参数平级
                 return {...v,value:v.name.replace('市','')}
                 })
            console.log(arr);
            callback(arr)
      },
// ------------------------------------------------------------
      //🚩🚩4.确认时期时触发
      handleDate(value){
          this.form.departDate=moment(value).format("YYYY-MM-DD")
      },

// ------------------------------------------------------------
      // 🚩🚩5.触发和目标城市切换时触发
        handleReverse(){
            const { departCity, departCode, destCity, destCode} = this.form;
            this.form.departCity = destCity;
            this.form.departCode = destCode;
            this.form.destCity = departCity;
            this.form.destCode = departCode;
        },

      // 🚩🚩6. 提交表单
      handleSubmit(){
          console.log(this.form);
        //  提交表单时验证 ,,验证非空
          const rules={
                departCity: {
                    value: this.form.departCity, 
                    message: "请选择出发城市"
                }, // 出发城市
 
                departDate: {
                    value: this.form.departDate, 
                    message: "请选择出发时间"
                }, // 日期字符串
                destCity: {
                    value: this.form.destCity, 
                    message: "请选择到达城市"
                },  // 到达城市
          }

          let valid=true   //表单验证结果
                    
                Object.keys(rules).forEach(v => {
                    // 只要有一个结果不通过，就停止循环
                    if(!valid) return;
                    const item = rules[v];
                    console.log(item);

                    // 数据字段为空
                    if(!item.value){
                        valid = false;

                        this.$confirm(item.message, '提示', {
                            confirmButtonText: '确定',
                            showCancelButton: false,
                            type: 'warning'
                        })
                    }
                });

                // 不通过验证，不需要往下执行
                if(!valid) return;

          // 带上当前的数据跳转到结果页面
                // this.$router('/air/flights?departCity=xxx')
                // 拼接会非常麻烦

                // 如果要从 url 上面获取问号参数
                // this.$route.query 问号参数获取
                // this.$route.params 动态路由参数
                // 其实在跳转的时候, 也能用query作为数据进行跳转
                // 将本来字符串变成对象即可
               this.$router.push({
                    path: "/air/flights",
                    query: this.form
                })
      }
    }

}
</script>


<style scoped lang="less">
.search-form{
    border:1px #ddd solid;
    border-top:none;
    width:360px;
    height:350px;
    box-sizing: border-box;
}

.search-tab{
  span{
    display: block;
    flex:1;
    text-align: center;
    height:48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top:3px #eee solid;
    background:#eee;
  }

  .active{
    border-top-color: orange;
    background:#fff;
  }

  i{
    margin-right:5px;
    font-size: 18px;

    &:first-child{
      font-size:16px;
    }
  }
}

.search-form-content{
  padding:15px 50px 15px 15px;
  position: relative;

  .el-autocomplete{
    width: 100%;
  }
}

.reverse{
  position:absolute;
  top: 35px;
  right:15px;

  &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:-35px;
      width:25px;
      height:1px;
      background:#ccc;
  }

  &:after{
      top:0;
    }

    &:before{
      top:60px;
    }

  span{
    display: block;
    position:absolute;
    top: 20px;
    right:0;
    font-size:12px;
    background: #999;
    color:#fff;
    width:20px;
    height:20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:10px;
      width:1px;
      height:20px;
      background:#ccc;
    }

    &:after{
      top:-20px;
    }

    &:before{
      top:20px;
    }
  }
}
</style>