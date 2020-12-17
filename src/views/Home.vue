<template>
<div>
  home
<a-button v-debounce="debounceClick">防抖</a-button>
    <div class="btns">
      <!-- 显示 -->
      <a-button v-permission="'1'">有权限</a-button>
      <!-- 不显示 -->
      <a-button v-permission="'10'">无权限</a-button>
    </div>
    <div v-for="(m,index) in list" :key="index">
      <img :v-LazyLoad ="m" />
      <img :v-LazyLoad ="m"  :src="m" />
    </div>
    <!-- <img v-LazyLoad="../" /> -->
</div>
</template>
<script>
export default {
  data(){
    return{
      list:[
        'https://wx3.sinaimg.cn/mw690/005F4Uyxgy1glqn3rfw7nj62c0340kjn02.jpg',
        'https://wx4.sinaimg.cn/mw690/007mUHA7ly1glqt8qgwmjj30u0190k26.jpg',
        'https://wx4.sinaimg.cn/mw690/007mUHA7ly1glqt8qgwwgj30u019045v.jpg',
        'https://wx1.sinaimg.cn/mw690/006GSWy0gy1glqppmo0y4j30mi0u0np3.jpg',
        'https://ww3.sinaimg.cn/bmiddle/005ZupIhly1ghxmrr4kzvj326o2z8x6q.jpg'
      ]
    }
  },
  methods: {
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    },
    debounceClick () {
      console.log('只触发一次')
    },
  },
};
</script>

<style>
img{
  width: 400px;
  height: 500px;
}
</style>
