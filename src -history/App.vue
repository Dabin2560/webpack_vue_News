<template>
  <div class="box" id="app">
    <!-- <p class="red">1234567890</p> -->
    <!--  -->
    <!-- <router-link to="/login">登录页</router-link> -->
    <!-- <router-link to="/register">注册页</router-link> -->
    <!-- 组件渲染 占位符 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style>
/* 引入vant_UI 的CSS */
@import url("../node_modules/vant/lib/index.css");
/* url 形式引入字体图标 */
@import url("http://at.alicdn.com/t/font_1426139_h6vn3jbl5q.css");

/* 公共样式 */
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: inherit;
}
a:hover {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
ul,
li,
ol {
  list-style: none;
}
i,
em {
  font-style: normal;
}
</style>