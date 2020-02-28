<template>
  <van-nav-bar
          title="商品详情"
          left-arrow
          :fixed="true"
          @click-left="onClickLeft"
  >
    <div slot="title">
      <van-search
              placeholder="搜索更多商品.."
              v-model="searchText"
              @search="$emit('onSearch',searchText)"
              @focus="toSearch"
      />
    </div>
  </van-nav-bar>
</template>

<script>
  import {Search, NavBar} from 'vant';

  export default {
    name: "SearchBar",
    data() {
      return {
        searchText: this.$route.query.q
      }
    },
    activated() {
      this.searchText = this.$route.query.q
    },
    methods: {
      onClickLeft() {
        let numberOfEntries = window.history.length;
        if (numberOfEntries === 1) {
          this.$router.replace({
            name: 'home'
          })
        } else {
          this.$router.go(-1)
        }
      },
      toSearch() {
        if (this.$router.currentRoute.name !== 'search') {
          this.$router.push({
            name: 'search'
          })
        }
      }
    },
    components: {
      [Search.name]: Search,
      [NavBar.name]: NavBar
    }
  }
</script>

<style scoped>

  .van-nav-bar .van-icon {
    color: black;
  }

  .van-nav-bar__title {
    max-width: 80%;
  }

  .van-search {
    padding: 6px 12px;
  }

  .van-search__content {
    border-radius: 20px;
  }
</style>
