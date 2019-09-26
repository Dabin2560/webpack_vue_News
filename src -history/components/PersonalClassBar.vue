<template>
  <div class="box2" @click="$emit('click', $event)">
              <!--  @click="$emit('click', $event)" -->
    <div class="bars">
      <span class="data_left">{{ data_left }}</span>
      <span class="data_right">{{ type==='password'? '*****':data_right }}</span>
      <i class="iconfont iconjiantou1"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data_left", "data_right","type"]
};
</script>

<style scoped lang="less">
.box2 {
  padding-left: 20px;
  .bars {
    display: flex;
    height: 50/360 * 100vw;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px #ccc solid;
    padding-right: 10px;
    .data_right {
      flex: 1;
      font-size: 14px;
      color: #bbb;
      text-align: right;
      padding-right: 10px;
    }
    i {
      color: #ccc;
    }
  }
}
</style>