<template>
  <div class="box">
    <div class="profile" @click="settings">
      <!-- $axios.defaults.baseURL在main.js中已设置为 http://localhost:3000 -->
      <!-- infos.head_img 保存的返回数据，下的后台头像信息 -->
      <!-- 需要添加if判断，若是本地图片/服务器上的默认图片 -->
      <img :src="infos.head_img" alt="" />
      <!-- ../../static/profile.jpg -->
      <div class="infos">
        <i class="iconfont iconxingbienan"></i>
        <span class="info_name">{{ infos.nickname }}</span>
        <span class="info_date">2019-9-24</span>
      </div>
      <i class="iconfont iconjiantou1"></i>
    </div>
    <!-- 引入条形按钮 -->
    <PersonalClassBar data_left="我的关注" data_right="关注的用户" @click="goMyFocus"/>
    <PersonalClassBar data_left="我的跟帖" data_right="跟帖/回复" @click="goFollowTip"/>
    <PersonalClassBar data_left="我的收藏" data_right="文章/视频" />
    <PersonalClassBar data_left="设置" @click="settings" />
    <PersonalClassBar data_left="退出" @click="logOut"/>
                                      
    <!-- @click="logOut" -->
  </div>
</template>

<script>
// 引入 调用PersonalClassBar.vue 条形按钮
import PersonalClassBar from "@/components/PersonalClassBar";

export default {
  // 子组件数据
  data() {
    return {
      // 保存获取返回的res.data
      infos:{},
    }
  },
  // 注册组件
  components:{
    PersonalClassBar
  },
  methods: {
    // 点击退出登录，则清除本地储存的token和id
    logOut(){
      localStorage.removeItem("user_id");
      localStorage.removeItem("token");
      // replace 替换上一个页面 （首页-个人中心（点击退出）-登录）→ 清除token，replace后，（首页-登录）
      this.$router.replace("/login");
    },
    settings(){
      this.$router.push("/editData")
    },
    goMyFocus(){
      this.$router.push("/myFocus")
    },
    goFollowTip(){
      this.$router.push("/followTip")
    },
    
  },
  // 获取本地储存的 token和user_id
  mounted() {
    // 请求接口资料
    this.$axios({
      // 拼接路径 获取后台数据的id  /user/id
      url:"/user/"+localStorage.getItem("user_id"),
      // 添加头信息
      headers:{
        // Authorization授权 将储存到本地的token添加到headers信息中
        Authorization:localStorage.getItem("token")
      }
    }).then(res=>{
      // console.log(res)
      const {data}=res.data;
      // console.log(data)
      // 保存返回的res.data到 vue数据 infos
      // this.infos=data;
      // console.log(this.infos)
      // ------------------------
      // 判断获取到的返回信息中，有无head_img，
      // if(data.head_img){
        // 有则显示这个服务器head_img信息，
        // $axios.defaults.baseURL在main.js中已设置为 http://localhost:3000
        
        // this.infos.head_img=this.$axios.defaults.baseURL + data.head_img;  // this.infos.head_img;
      // }else{
        // 若无则为本地静态图像
        // this.infos.head_img="./static/profile.jpg"  // ./static/profile.jpg
        
      // }
      // --------------------
      if(data){
        this.infos=data;
        // 如果用户有头像
        if(data.head_img){
          this.infos.head_img=this.$axios.defaults.baseURL + data.head_img;
        }else{
          // 无，则启用本地静态文件夹的 默认头像
          this.infos.head_img="./static/profile.jpg"
        }
      }else{}
    })
  },
  
  
};
</script>

<style scoped lang="less">
//
.box {
  
  .profile {
    display: flex;
    padding: 20px 15px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 3px #ddd solid;
    img {
      width: 70/360 * 100vw;
      border-radius: 50px;
    }
  }
  .infos {
    flex: 1;
    padding: 0 15px;
    i {
      color: #75b9eb;
    }
    .info_date {
      display: block;
      margin-top: 5px;
      color: #666;
    }
  }
  .iconjiantou1 {
    color: #666;
  }
}
</style>