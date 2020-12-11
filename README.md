# and-design-vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
https://juejin.cn/post/6901466994478940168
https://github.com/staven630/vue-cli4-config
https://staven630.github.io/vue-cli4-config/

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
## 文件说明
```.env``` 本地环境变量 
```.env.production``` 正式环境上的环境变量
```.env.crm ``` 其他环境的服务器
    通过在 package.json 里的 scripts 配置项中添加–mode xxx 来选择不同环境 eg:

```
"scripts": {
  "build": "vue-cli-service build",
  "crm": "vue-cli-service build --mode crm"
}
// js代码中使用环境变量
    console.log("BASE_URL: ", process.env.BASE_URL);
    console.log("VUE_APP_API: ", process.env.VUE_APP_API);

