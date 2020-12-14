import svgIcon from "@/components/svgIcon";
import Vue from "vue";
// 注意需要插件 npm i -D svg-sprite-loader
// 注册到全局
Vue.component("svg-icon", svgIcon);

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context("./svg", false, /\.svg$/);
// console.log(req,'req',requireAll(req))
requireAll(req);