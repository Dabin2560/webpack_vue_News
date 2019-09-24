<template>
  <input
    class="uNameInput"
    :class="{
    success: status==='success',
    error: status==='error'}"
    :value="value"
    :placeholder="placeholder"
    @input="userNameVal"
    @change="handleChange"
  />
</template>

<script>
export default {
  data() {
    return {
      status: "",
    };
  },
  props: ["value", "placeholder", "name", "rule","err_message"],
  methods: {
    // 输入触发，获取input的 value值
    userNameVal(event) {
      // 解构赋值
      const { value } = event.target;
      // console.log(event.target.value)
      // 触发父组件的input事件，并将value传过去                                                                   
      this.$emit("input", value);
      //
      // 判断
      if (this.rule) {
        if (this.rule.test(value)) {
          this.status = "success";
        } else {
          this.status = "error";
        }
      }
    },
    // 输入框失去焦点时候触发
    handleChange() {

      if (this.err_message && this.status === "error") {
        // alert(this.err_message);
        this.$toast.fail(this.err_message);
      }
    }
  }
};
</script>

<style lang="less" scoped>
// scoped 属性是一个布尔属性。
// 如果使用该属性，则样式仅仅应用到 style 元素的父元素及其子元素。
.uNameInput {
  width: 100%;
  height: 50 / 360 *100vw;
  border: none;
  border-bottom: 1px solid #666;
  box-sizing: border-box;
  padding: 15px 0;
  font-size: 18px;
  border-radius: 0;
  text-indent: 0.5em;
}
.success {
  border-bottom-color: green;
}
.error {
  border-bottom-color: #d71e08;
}



</style>