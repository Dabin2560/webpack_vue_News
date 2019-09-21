//
// 引入vue npm i vue
import Vue from "vue";
// 引入App.vue 模版文件
import App from "@/App.vue";


// 导入 路由  npm i vue-router
import VueRouter from "vue-router";
  // 导入login页/Register页
  import Login from "./page/Login.vue";
  import Register from "./page/Register.vue";

// 在 .vue 格式的模版中，需要routerLink/view的话，必须注册 插件
Vue.use(VueRouter);

// 创建路由设置
const routes=[
  {path:"/",component:Login},
  {path:"/login",component:Login},
  {path:"/register",component:Register},
];

// 创建对象
const router = new VueRouter({
  routes
})

new Vue({
  el:"#app",
  // 4.
  router,
  // data:{

  // },
  render(createElement){
    return createElement(App)
  },
  methods: {
    
  },
})
