<template>
  <div class="chunk">
    <div class="chunk_left">
      <p class="title">
        {{posts.title}}
      </p>
      <div class="info">
        <span>{{posts.user.nickname}}</span>
        <span>{{posts.comment_length}}跟帖</span>
      </div>
    </div>
    <div class="chunk_right">
      <img :src="posts.cover[0].url" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  props:["posts"],
  methods: {
    
  },
  mounted() {
    
  },
};
</script>

<style scoped lang="less">
.chunk {
  padding: 20px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .chunk_left {
    flex: 1;
    .title {
      font-size: 14px;
      line-height: 1.5;
      text-indent: 1em;
      margin-bottom: 5px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .info {
      font-size: 12px;
      color: #999;
      
    }
  }
  .chunk_right {
    img {
      display: block;
      width: 120 / 360 * 100vw;
      height: 80 / 360 * 100vw;
      object-fit: cover;
    }
  }
}
</style>