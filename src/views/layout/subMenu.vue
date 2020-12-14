<template>
  <div>
    <!-- <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
      <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button> -->
    <a-menu
      :default-selected-keys="['1']"
      :default-open-keys="['1']"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
      @click="handleClick"
    >
      <template v-for="item in list">
        <a-menu-item v-if="!item.children" :key="item.key">
          <a-icon :type="item.svg" />
          <span>{{ item.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.key" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import { Menu } from 'ant-design-vue';
const SubMenu = {
  template: `
      <a-sub-menu :key="menuInfo.key" v-bind="$props" @titleClick="titleClick" v-on="$listeners">
        <span slot="title">
          <a-icon :type="menuInfo.svg" />
          <span  @click='routerClick(menuInfo)'>{{ menuInfo.title }}</span>
        </span>
        <template v-for="item in menuInfo.children">
          <a-menu-item v-if="!item.children" :key="item.key">
            <a-icon :type="item.svg" />
            <span @click='routerClick(item)'>{{ item.title }}</span>
          </a-menu-item>
          <sub-menu v-else :key="item.key"  :menu-info="item" />
        </template>
      </a-sub-menu>
    `,
  name: 'SubMenu',
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    titleClick(e){
        console.log(e,'递归')
    },
    routerClick(item){
        console.log(item,'dianji')
        console.log(this,'this')
        this.$router.push(item.path)
    }
  },
};
export default {
  components: {
    'sub-menu': SubMenu,
  },
  data() {
    return {
      collapsed: false,
          list: [
              {
                  key:'1',
                  title:'一级',
                  path:'/',
                  svg:'mail'
              },
              {
                    key: '2',
                    title: '二级',
                    path:'/home',
                    svg:'desktop',
                    children: [
                    {
                        key: '2.1',
                        title: '三级',
                        path:'/about',
                        svg:'euro',
                        children: [
                            { 
                                key: '2.1.1',
                                title: '四级' ,
                                path:'/home',
                                svg:'coffee'
                            }
                        ],
                    },
                    ],
              }
          ],
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    handleClick(e){
        console.log('handleClick', e);
    },
  },
};
</script>
