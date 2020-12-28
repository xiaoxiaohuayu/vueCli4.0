const path = require("path");
// const { config } = require("vue/types/umd");
const webpack = require("webpack");
const resolve = dir => path.join(__dirname, dir);
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV); //本地还是生产的判断
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin; //分析插件
const CompressionWebpackPlugin = require("compression-webpack-plugin");//gzip插件
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;//gzip的压缩类型匹配
/*
    解压插件测试
    开始
*/
// const inly = require('inly');
// const fs = require('fs');
// const cwd = process.cwd();
// console.log(cwd)
// const name = '1.jpeg.zip';
// const to = cwd + '/';
// const from = path.join(cwd, name);

// const extract = inly(from, to);

// extract.on('file', (name) => {
//     console.log(name);
// });

// extract.on('progress', (percent) => {
//     console.log(percent + '%');
// });

// extract.on('error', (error) => {
//     console.error(error);
// });

// extract.on('end', () => {
//     console.log('done');
// });
/*
    结束
*/
module.exports = {
    // publicPath:'/',
  publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : "./", // 默认'/'，部署应用包时的基本 URL
  outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  assetsDir: "", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  chainWebpack: config => {
          // config.resolve.alias.set('@ant-design/icons/lib/dist$',path.resolve(__dirname, './src/tools/icons.js'))
    // 添加别名
    config.resolve.alias
      .set("vue$", "vue/dist/vue.esm.js")
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@views", resolve("src/views"))
      .set("@router", resolve("src/router"))
      .set("@store", resolve("src/store"))
      .set("@httpGather", resolve("src/libs/httpGather.js"))
      // .set("@layouts", resolve("src/layouts"))
      // .set("@static", resolve("src/static"));
      //将svg进行组件化处理,现将组件库或者svg的文件引入进来，通过svg-sprite-loader插件来处理，
      const svgRule = config.module.rule("svg");
      svgRule.uses.clear();
      svgRule.exclude.add(/node_modules/);
      svgRule
        .test(/\.svg$/)
        .use("svg-sprite-loader")
        .loader("svg-sprite-loader")
        .options({
          symbolId: "icon-[name]"
        });
  
      const imagesRule = config.module.rule("images");
      imagesRule.exclude.add(resolve("src/icons"));
      config.module.rule("images").test(/\.(png|jpe?g|gif|svg)(\?.*)?$/);
    // 图片压缩的插件
      if (IS_PROD) {
        config.module
          .rule("images")
          .use("image-webpack-loader")
          .loader("image-webpack-loader")
          .options({
            mozjpeg: { progressive: true, quality: 65 },
            optipng: { enabled: false },
            pngquant: { quality: [0.65, 0.9], speed: 4 },
            gifsicle: { interlaced: false }
            // webp: { quality: 75 }
          });
      }
      //分析插件
      if (IS_PROD) {
        config
          .plugin('webpack-bundle-analyzer')
          .use(BundleAnalyzerPlugin);
      }
      //Moment 会有多国语言 这里我们只保留中文，会减少体积 其实这个并不是最优的解决方案，在网上有个day.js很小满足Moment所有API
      config
      .plugin('ContextReplacementPlugin')
      .use(webpack.ContextReplacementPlugin, [/moment[/\\]locale$/, /zh-cn/])
  },
  configureWebpack: {
    resolve: {
      alias: {
        // '@ant-design/icons/lib/dist$': path.resolve(__dirname, './src/tools/icons.js'),
      },
    },
      //开启gzip压缩
    plugins:[
      new CompressionWebpackPlugin({
          // filename: "[path].gz[query]",
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          deleteOriginalAssets: false
      })
    ]
  },
//代理设置
devServer: {
    // overlay: { // 让浏览器 overlay 同时显示警告和错误
    //   warnings: true,
    //   errors: true
    // },
    // open: false, // 是否打开浏览器
    // host: "localhost",
    // port: "8080", // 代理端口
    // https: false,
    // hotOnly: false, // 热更新
    proxy: {
      "/login": {
        target:
          "http://dev.yimashuchi.com:85/", // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        // pathRewrite: {
        //   "^/api": "/"
        // }
      },
      "/info": {
        target:
          "http://dev.yimashuchi.com:85/", // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
      }
    }
  },
    lintOnSave:false,//禁止esLint检查
    css:{
        loaderOptions:{
            sass:{
                data:`@import '@/styles/variable.scss';@import '@/styles/minxins.scss';@import '@/styles/main.scss'`
            }
        }
    }
}