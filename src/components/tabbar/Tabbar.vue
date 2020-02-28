<template>
  <van-tabbar v-model="active" active-color="#ee0a24">
    <van-tabbar-item
            v-for="item in tabItems"
            :to="item.path"
            :key="item.name"
            :icon="item.icon"
    >{{item.name}}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
  import {Tabbar, TabbarItem} from 'vant'

  export default {
    name: "Tabbar",
    data() {
      return {
        active: 0,
        tabItems: [{
          name: '精选',
          pathName: 'home',
          path: '/',
          icon: 'shop-o'
        }, {
          name: '个人中心',
          pathName: 'user',
          path: '/user',
          icon: 'user-circle-o'
        }]
      }
    },
    watch: {
      '$route.name': function () {
        this.setActive(this.$route.name)
      }
    },
    created() {
      const activeTab = this.$route.name;
      this.setActive(activeTab)
    },
    methods: {
      setActive(name) {
        this.tabItems.forEach((item, index) => {
          if (item.pathName === name) {
            this.active = index
          }
        })
      }
    },
    components: {
      [Tabbar.name]: Tabbar,
      [TabbarItem.name]: TabbarItem
    }
  }
</script>

<style scoped>

</style>
