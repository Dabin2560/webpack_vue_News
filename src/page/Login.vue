<template>
  <!-- login页面 -->
  <div class="loginPage">
    <!-- 关闭按钮 -->
    <div class="close">
      <span class="iconfont iconicon-test"></span>
    </div>
    <!-- logo -->
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <!-- 输入框 -->
    <!-- 动态获取数据 -->
    <div class="formText">
      <AuthInput
        :value="form.username"
        placeholder="用户名/手机号码"
        @input="handleVal"
        :rule="/^1[0-9]{4,10}$/"
        err_message="手机号码格式有误"
      ></AuthInput>
      <!--  -->
      <!-- 密码框 -->
      <AuthInput
        type="password"
        placeholder="密码"
        v-model="form.password"

        :rule="/^[0-9a-zA-Z]{3,12}$/"
        err_message="密码格式有误"
        ></AuthInput>
    </div>
    <p class="tips">没有账号? 
      <router-link to="register">去注册</router-link>
    </p>
    <AuthButton text="登录" @click="handleSubmit"></AuthButton>
  </div>
</template>

<script>
// 导入封装的 输入框 组件
import AuthInput from "@/components/AuthInput";
// 导入封装的 登录/注册 按钮
import AuthButton from "@/components/AuthButton";


export default {
  // 数据
  data() {
    return {
      form: {
        username: "",
        password: "",

      }
    };
  },
  // 注册组件
  components: {
    AuthInput,
    AuthButton,
  },
  // 业务逻辑
  methods: {
    // 获取input的value值
    handleVal(value) {
      // 存入数据中
      this.form.username = value;  
    },
    // axios 通过下载/引入/注册/（挂载到vue原型上，方便$axios）
    // 提交表单
    handleSubmit(){
      this.$axios({
        url:"/login",
        method:"POST", // 请求类型get/post method：类似juurey.ajax的 type
        data:this.form,
      }).then(res=>{  // then然后 类似于juqery.ajax的 success 函数
      // 常规获取 后台成功/错误信息
      // let message=res.data.message
      // 解构赋值
      // console.log(res)
      const {message}=res.data;
      // 判断 成功，重定向跳转到首页
      if(message==="用户不存在"){
        this.$router.push("") // 暂无首页  先为/
      }

      })
    }
  },

};
</script>

<style lang="less" scoped>
// 以less方式解析 👆

.loginPage {
  padding: 20px;
  .tips {
    text-align: right;
    margin: 20px 0;
    a {
      color: #d81e06;
    }
  }
}
.close {
  span {
    font-size: 27 /360 * 100vw;
  }
}
.logo {
  display: flex;
  justify-content: center;
  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}
</style>