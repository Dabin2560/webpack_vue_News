<template>
  <div class="EditDataClassBar">
    <div class="bars">
      <span class="eData_left">{{eData_left}}</span>
      <span class="eData_right">{{eData_right}}</span>
      <i class="iconfont iconjiantou1"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ["eData_left", "eData_right"]
};
</script>

<style scoped lang="less">
.EditDataClassBar {

  .bars {
    height: 50/360*100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px #ccc solid;
    .eData_right {
      flex: 1;
      text-align: right;
      margin-right: 10px;
      color: #ccc;
    }
    i {
      color: #ccc;
    }
  }
}
</style>