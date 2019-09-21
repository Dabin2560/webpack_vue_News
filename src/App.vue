<template>
  <div class="box">
    <p class="red">1234567890</p>
    <!--  -->
    <router-link to="/login">登录页</router-link>
    <router-link to="/register">注册页</router-link>
    <!--  -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
  .red {
    color:red
  }
</style>