//
// 引入vue npm i vue
import Vue from "vue";
// 引入App.vue 模版文件
import App from "@/App.vue";
// 引入vant_UI  和在拦截器里使用Toast方法
import Vant, { Toast } from "vant";
 
// 引入 axios
import axios from "axios"

// 导入 路由  npm i vue-router
import VueRouter from "vue-router";
  // 导入login页/Register页  在webpack_base （4.模块解析） @代表 src文件夹下 路径
  import Login from "@/page/Login.vue";
  import Register from "@/page/Register.vue";
  import Personal from "@/page/Personal.vue";


// 在 .vue 格式的模版中，需要routerLink/view的话，必须注册 插件
Vue.use(VueRouter);
// 注册 vant_UI
Vue.use(Vant)

// 把axios挂载到prototype原型上
Vue.prototype.$axios=axios;
// 基准路径，以后每次请求都会自动在前面加上该路径
axios.defaults.baseURL="http://localhost:3000";

// 创建路由设置
const routes=[
  {path:"/",component:Login},
  {path:"/login",component:Login},
  {path:"/register",component:Register},
  {path:"/personal",component:Personal},
];

// 3.创建对象
const router = new VueRouter({
  routes
});

// 路由卫士 页面跳转前的验证，（根据本地储存是否有匹配token来判断：之前登陆将user_id=id/token储存在本地）
// to:要跳转之后页面：去哪里   from：跳转之前的页面：来自哪里  next：必须调用next()，调用后才会执行跳转，可以重定向next("/login")
router.beforeEach((to,from,next)=>{
  // 先获取本地储存的token
  const hasToken=localStorage.getItem("token");
  // 判断是否需要登录权限的页面（个人中心/ ：涉及 个人 相关的页面，“非公共页面/不用登陆都可查看的页面”）
  if(to.path==="/personal"){
    // 判断有无token
    if(hasToken){
      // 正常下一步 跳转
      next()
      // 其他 无token，则跳转到登录页
    }else{
      next("/login")
    }
  }else{
    // 跳转到其他不用登陆的普通公共页
    next();
  }
})

// axios的拦截器，拦截响应（因为需要拦截所有页面的错误请求，因此需要在main.js）
axios.interceptors.response.use(res=>{
  // 解构赋值保存 message和状态码
  const {message,statusCode}=res.data;
  // 判断状态码
  if(message && statusCode== 401){
    // 上面引入vant 使用Toast.fail 渲染 错误信息
    Toast.fail(message+statusCode);
  }
  // 判断token
  if(message==="用户信息验证失败" && statusCode===401){
    router.push("/login")
  }
  // 打印res
  // console.log("---",res)
  return res;
},function (err) {
  return Toast.fail("网络错误！")
  }
)




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
