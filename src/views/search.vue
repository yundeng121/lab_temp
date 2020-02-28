<template>
  <div>
    <SearchBar
            @onSearch="onSearch"></SearchBar>
    <van-tabs v-model="activeTabName" style="margin-top: 45px"
              @change="onChangeTab"
              swipeable sticky>
      <van-tab v-for="item in tabItems"
               :key="item.name"
               :name="item.name"
               :title="item.title"
      >
        <GoodsCard v-for="goods in items[item.name]"
                   :key="goods.id"
                   :goods="goods"
                   :platform="item.name"></GoodsCard>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
  import {Cell, Tab, Tabs} from 'vant';
  import SearchBar from "../components/nav-bar/SearchBar";
  import {decode_goods_pw, goods_search} from "../axios/api";
  import GoodsCard from "../components/goods/GoodsCard";

  export default {
    name: "search",
    data() {
      return {
        searchText: this.$route.query.q,
        activeTabName: 'tb',
        pwMode: false,//pw 口令和正常
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
        }
      }
    },
    watch: {
      searchText() {
        for (let key in this.items) {
          if (key !== this.activeTabName)
            this.items[key] = []
        }
      }
    },
    activated() {
      document.getElementsByTagName("input")[0].focus()
      if (this.searchText.length > 0) {
        this.onSearch(this.searchText)
      }
    },
    mounted() {
      document.getElementsByTagName("input")[0].setAttribute('autofocus', 'autofocus')
    },
    methods: {
      onChangeTab(tab) {
        if (this.items[tab].length === 0 && this.searchText) {
          this.onSearch(this.searchText)
        }
      },
      onSearch(searchText) {
        if (searchText.length > 10) {
          decode_goods_pw({
            short_url: searchText
          }).then(res => {
            console.log(res);
            if (res.data.data) {
              this.searchText = ''
              this.$router.push({
                name: 'goods_detail',
                params: {
                  platform: res.data.data.platform,
                  id: res.data.data.goods_id
                }
              })
            }
          })
        } else {
          goods_search({
            platform: this.activeTabName,
            q: searchText
          }).then(res => {
            this.transform(res.data.data)
          })
        }
      },
      transform(data) {
        switch (this.activeTabName) {
          case "tb":
            this.items.tb = data.map(item => {
              item.id = item.item_id
              item.commission_rate /= 100.0
              item.thumbnail = item.pict_url
              return item
            });
            break;
          case 'jd':
            this.items.jd = data.map(item => {
              item.id = item.skuId
              item.sku_id = item.skuId
              item.discount = item.couponInfo.couponList.length > 0 ? item.couponInfo.couponList[0].discount : 0
              item.sku_name = item.skuName
              item.shop_name = item.shopInfo.shopName
              item.thumbnail = item.imageInfo.imageList[0].url
              item.price = item.priceInfo.price
              item.commission = item.commissionInfo.commission
              item.commission_share = item.commissionInfo.commissionShare
              return item
            });
            break;
          case 'pdd':
            this.items.pdd = data.map(item => {
              item.min_group_price /= 100
              item.thumbnail = item.goods_thumbnail_url
              item.min_normal_price /= 100
              return item
            });
        }
      }
    },
    components: {
      [GoodsCard.name]: GoodsCard,
      [SearchBar.name]: SearchBar,
      [Cell.name]: Cell,
      [Tabs.name]: Tabs,
      [Tab.name]: Tab,
    }
  }
</script>

<style scoped>
  .van-tag--default {
    background-color: #CCCCCC;
  }

  .van-tag {
    padding: 0.3em 0.8em;
    font-size: 14px;
    color: #333333;
    max-height: 16px;
  }
</style>
