<template>
  <a-layout id="components-layout-demo-responsive">
    <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
    >
      <div class="logo" />
      <!-- <a-menu
            :default-selected-keys="['1']"
            :default-open-keys="['2']"
            mode="inline"
      > -->
            <sub-menu-item></sub-menu-item>
      <!-- </a-menu> -->
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }" />
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="textAlign: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
// import subMenu from './subMenu'
import SubMenuItem from './subMenu.vue';
export default {
    components:{
        SubMenuItem
    },
    data(){
        return{
            // openKeys:['2']
        }
    },
    methods: {
        handleClick(e){
            console.log('handleClick', e);
        },
        titleClick(e){
            console.log('titleClick', e);
        },
        onCollapse(collapsed, type) {
        console.log(collapsed, type);
        },
        onBreakpoint(broken) {
        console.log(broken);
        },
    },
};
</script>

<style>
#components-layout-demo-responsive .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
