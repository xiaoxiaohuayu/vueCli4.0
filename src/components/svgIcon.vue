
<template>
  <svg class="svg-icon svg"
       aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
/**
 * 此组件是将svg的矢量图转化为vue组件使用起来方便,注册为全局组件
    <svg-icon name='email'></svg-icon>
 * 
 */
export default {
  name: 'svgIcon',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.name}`
    }
  },
  mounted() {
    // console.log(this.iconClass = 'email')
  },
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>