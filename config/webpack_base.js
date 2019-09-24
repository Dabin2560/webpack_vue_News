// 导入path核心模块
const path = require("path");

// 导入生成html插件  npm install --save-dev html-webpack-plugin
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 导入清除dist文件夹插件  npm install --save-dev clean-webpack-plugin
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

//  导入提取样式的webpack插件, Extract提取  npm install extract-text-webpack-plugin@next --save-dev  注意：@next是下载最新版本
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// 引入vue-loader插件  npm install --save-dev vue-loader vue-template-compiler vue-style-loader
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 引入打包文件夹的插件copy-webpack-plugin   先命令下载 npm install copy-webpack-plugin --save-dev
const CopyPlugin=require("copy-webpack-plugin")


// 暴露数据
module.exports = {
  // 预防以后的多文件，以多文件方式配置
  // 1.设置的入口文件
  entry: {
    main: "./src/main.js"
  },
  // entry: './src/index.js',  // 对比仅单文件

  // 2.设置输出文件
  output: {
    // 设置输出文件名
    filename: "[name].main.js",
    // 设置输出文件到 的绝对路径,__diename:找到当前文件的根路径来查找设置
    // path:path.resolve("dist")  // 同下
    path: path.resolve(__dirname, "../dist")

    // filename: 'main.js',  // 对比单文件输出，path同上
  },
  // 3.提取公共模块配置（不用下载 装载loader / 程序插件plugin）
  optimization: {
    splitChunks: {
      chunks: 'all' // 提取所有文件的共同模块
    },
  },
  // 4.添加模块解析（不用下载 装载loader / 程序插件plugin）
  resolve: {
    alias: {
      // 4.1 以后@符号就是src目录
      '@': path.resolve(__dirname, "../src"),
    },
    // 4.2 省略导入模块时的后缀名。.jsx / .scss / ...
    extensions: ['.js', '.json', '.vue']
  },

  // plugins插件  最上面 require导入，在这里调用一下
  plugins: [
    // 1.调用清除dist打包目录插件 
    new CleanWebpackPlugin(),

    // 2.提取css到指定目录
    new ExtractTextPlugin("style/styleLess.css"),

    // 3.自动生成html
    new HtmlWebpackPlugin({
      template: "public/index.html"
    }),

    // 4.调用vue加载器插件
    new VueLoaderPlugin(),

    // 调用复制文件夹的插件
    new CopyPlugin([
      // 从目录下复制static文件夹到dist目录  dist/static（因为打包给后端的dist文件，可能没有静态，也可以手动拷贝：不装这个）
      {from:'static',to:"static"},
    ]),

  ],

  // module模块
  module: {
    // 1. 制定规则 判断格式以 .css .less结尾
    // 加载 less（若使用到less些样式） css   npm install --save-dev less less-loader  / npm install --save-dev style-loader css-loader
    rules: [{
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          // 若在webpack中使用vue，则 👇 修改为vue-style-loader
          fallback: "style-loader",
          use: ["css-loader", "less-loader"],
        }),
      },
      // ----👇----在webpack中使用vue----------
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
      // 👆  👇  声明vue的 和需要.css的（vue模版中有<style>,必须添加 。css的）
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          // 若在webpack中使用vue，则 👇 修改为vue-style-loader
          fallback: "vue-style-loader",
          use: ["css-loader"],
        }),
      },
      // ----上----在webpack中使用vue----------

      // 处理 图片 文件类型
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: "file-loader",
          options: {
            publicPath: "./images",
            outputPath: "images",
          },
        }, ],
      },
    ],
  },
  
} // 👈 半截花括号为 module.exports = {}