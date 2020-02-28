<template>
  <div>
    <!--    搜索框-->
    <van-search
            shape="round"
            placeholder="请输入关键词或口令搜索"
            v-model="searchText"
            @search="search"
    />

    <!--    轮播图-->
    <van-swipe :autoplay="3000" :height="120">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" width="100%"/>
      </van-swipe-item>
    </van-swipe>

    <!--    推荐-->
    <van-tabs v-model="active" style="margin-bottom: 50px;" swipeable sticky>
      <van-tab v-for="(item,index) in tabItems"
               :key="item.name"
               :title="item.title"
               @load="load()"
      >
        <van-list
                v-model="loading"
                finished-text="没有更多了"
                :finished="finished[index]"
                @load="load()"
        >
          <GoodsCard v-for="goods in items[item.name]"
                     :key="goods.id"
                     :goods="goods"
                     :platform="item.name"></GoodsCard>
        </van-list>
      </van-tab>
    </van-tabs>

    <!--    浮动按钮-->
    <!--    <FloatIcon></FloatIcon>-->
  </div>
</template>

<script>
  import {Tab, Tabs, List, Swipe, SwipeItem, Lazyload, Search} from 'vant';
  import GoodsCard from "@/components/goods/GoodsCard";
  import {goods_list} from '@/axios/api'
  import SearchBar from "../components/nav-bar/SearchBar";
  // import FloatIcon from "../components/float-icon/FloatIcon";

  export default {
    name: 'home',
    data() {
      return {
        searchText: '',
        active: 0,
        loading: false,
        finished: [false, false, false],
        tabItems: [{
          title: '淘宝',
          name: 'tb',
        }, {
          title: '京东',
          name: 'jd'
        }, {
          title: '拼多多',
          name: 'pdd'
        }],
        items: {
          tb: [],
          jd: [],
          pdd: []
        },
        images: [
          'http://img0.imgtn.bdimg.com/it/u=1276530402,3269839546&fm=26&gp=0.jpg',
          'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1989159217,3897255396&fm=26&gp=0.jpg'
        ]
      }
    },
    computed: {
      activeTabName() {
        return this.tabItems[this.active].name
      }
    },
    methods: {
      search() {
        this.$router.push({
          name: 'search', query: {'q': this.searchText}
        })
        this.searchText = ''
      },
      load() {
        let offset = this.items[this.activeTabName].length;
        goods_list({
          offset: offset,
          platform: this.activeTabName,
        }).then(res => {
          if (res.data.data.length == 0) {
            this.finished[this.active] = true;
          }
          res.data.data.map(item => {
            this.items[this.activeTabName].push(item)
          });
          this.loading = false;
        })
      },
    },
    components: {
      [GoodsCard.name]: GoodsCard,
      [SearchBar.name]: SearchBar,
      [Search.name]: Search,
      [Tabs.name]: Tabs,
      [Tab.name]: Tab,
      [List.name]: List,
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [Lazyload.name]: Lazyload
    }
  }

</script>

<style>

</style>
