// 
// 约定 引用方式为require
// 引入base
const base=require("./webpack_base")
// 合并webpack的配置  npm install --save-dev webpack-merge
const merge=require("webpack-merge")

// 
module.exports=merge(base,{
  // 声明当前的开发模式，production产品
  mode:"production",

})