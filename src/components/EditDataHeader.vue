<template>
  <div class="editHeader">
    <!-- @click="$router.back()"点击返回上一页 -->
    <i class="iconfont iconjiantou2" @click="$router.back()"></i>
    <span class="editTitle">{{title}}</span>
    <i></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  props:["title"],
};
</script>

<style scoped lang="less">
.editHeader {
  display: flex;
  // height: 60/360*100vw;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  i {
    padding: 0 10px;
    color: #666;
  }
  .editTitle {
    flex: 1;
    text-align: center;
    font-size: 15px;
    font-weight: 700;
  }
}
</style>