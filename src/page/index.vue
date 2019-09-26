<template>
  <div>
    <!-- 页面头部 -->
    <div class="header">
      <i class="iconfont iconnew logo"></i>
      <div class="search">
        <i class="iconfont iconsearch"></i>
        <span>搜索新闻</span>
      </div>
      <router-link to="/Personal">
        <i class="iconfont iconwode myCenter"></i>
      </router-link>
    </div>
    <!-- 页面tab栏  -->
    <van-tabs v-model="active" sticky swipeable>
      <!-- title: 要显示的内容 -->
      <van-tab v-for="(item, index) in categories" :key="index" :title="item.name">
        
          <indexChunk v-for="(item,index) in posts" :key="index" :posts="item"/>

      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import indexChunk from "@/components/indexChunk.vue";
export default {
  data() {
    return {
      // 判断 当前默认的栏目, 没有登录应该0，有登录等于1, 最终的效果为了默认显示头，验证是否有token，控制显示 关注
      active: localStorage.getItem("token") ? 1 : 0,
      categories: [],
      cid: 999,
      posts: []
    };
  },
  methods: {},
  watch: {
    active() {
      // 监控active值变化，获取当前分类的 id
      this.cid = this.categories[this.active].id;
      // console.log(this.cid);
    }
  },
  mounted() {
    const config = {
      url: "/category"
    };
    // 判断是否有token，有则加上token验证
    if (localStorage.getItem("token")) {
      config.headers = {
        Authorization: localStorage.getItem("token")
      };
    }
    // 请求栏目数据
    this.$axios(config).then(res => {
      const { data } = res.data;
      // 保存栏目列表
      this.categories = data;
      // console.log(this.categories);
    });
    // 请求文章列表
    this.$axios({
      url: `/post?category=${this.cid}`
    }).then(res => {
      const { data } = res.data;
      // 保存栏目列表
      this.posts = data;
      console.log(this.posts);
      
    });
  },
  // 注册组件
  components: {
    indexChunk
  }
};
</script>

<style scoped lang="less">
.header {
  height: 60/360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f00;
  padding: 0 10px;
  .logo {
    font-size: 60/360 * 100vw;
    color: #fff;
  }
  .search {
    flex: 1;
    text-align: center;
    line-height: 32 / 360 * 100vw;
    height: 35 / 360 * 100vw;
    margin: 0 10px;
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.5);
    i,
    span {
      font-size: 14px;
      color: #fff;
      margin: 0 2px;
    }
  }
  .myCenter {
    font-size: 25/360 * 100vw;
    color: #fff;
    padding: 0 5px;
  }
}
/deep/ .van-tabs__nav {
  background: #f6f6f6;
}

/deep/ .van-tabs__line {
  width: 40px;
  height: 2px;
}
</style>