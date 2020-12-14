// @/src/assets/icons.js  干掉无用的图标,减少体积。 需要在vue.config.js配置
// 在使用一些比较大的组件的时候 可以考虑在页面内引入然后加载，可以增加渲染速度 比如：
/**
 *
 <script>
import { DatePicker } from 'ant-design-vue';
export default {
  components: {
    ADatePicker: DatePicker,
  },
}
</script>

 */
export { default as LoadingOutline } from '@ant-design/icons/lib/outline/LoadingOutline';
