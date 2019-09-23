// 
// 约定 引用方式为require
// 引入base
const base=require("./webpack_base")
// 合并webpack的配置  npm install --save-dev webpack-merge
const merge=require("webpack-merge")

// 
module.exports=merge(base,{
  // 声明当前的开发模式，development开发
  mode:"development",
  // 生成映射源代码文件（用于error的指向源头）
  devtool:"source-map",
  // 设置开发服务配置
  devServer:{
    port:8888, // 默认端口8080
    stats:"errors-only", // 仅打印报错信息
    host:"0.0.0.0" // 支持手机事件访问
  },

})