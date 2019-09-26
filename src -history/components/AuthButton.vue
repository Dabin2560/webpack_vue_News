<template>
  <button class="btn" @click="handleClick">{{ text }}</button>
</template>

<script>
export default {
  props:["text",],
  methods: {
  handleClick(event){
    this.$emit("click",event)
  },

},

}
</script>

<style scoped lang="less">
  .btn {
    width: 100%;
    height: 50 / 360 * 100vw;
    border-radius: 50px;
    background: #d71e08;
    color:#fff;
    text-align: center;
    line-height: 50 / 360 * 100vw;

  }
</style>