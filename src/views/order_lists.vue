<template>
    <div>
        <van-nav-bar
            title="订单列表"
            left-arrow
            @click-left="onClickLeft"
        />
        <van-tabs v-model="active" style="margin-bottom: 50px" swipeable sticky>
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
                    <OrderCard v-for="orders in items[item.name]"
                        :key="orders.trade_id"
                        :orders="orders"
                        :status="item.name">
                    </OrderCard>
                </van-list>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
  import Vue from 'vue'
  import { Tab, Tabs, NavBar,Toast, List } from 'vant'
  import OrderCard from '@/components/order/OrderCard'
  
  import { getOrder } from "@/axios/api"
  import store from '@/store'

  Vue.use(NavBar)
  Vue.use(Tab)
  Vue.use(Tabs)
  Vue.use(Toast)
  Vue.use(List)
  export default {
    name:'order',
    data() {
      return {
        active: store.state.orderTab,
        finished:{
          all:false,
          valid:false,
          rebated:false,
          invalid:false,
        },
        items: {
          all: [],
          valid: [],
          rebated: [],
          invalid: [],
        },
        loading:false,
        tabItems: [{
          title: '全部订单',
          name: 'all'
        }, {
          title: '已付款',
          name: 'valid'
        }, {
          title: '已结算',
          name: 'rebated'
        },{
          title:'已失效',
          name:'invalid'
        }]
      };
    },
    computed: {
      activeTabName() {
        console.log(store.state.orderTab)
        /*if(store.state.orderTab){
          this.active = store.state.orderTab
        }*/
        return this.tabItems[this.active].name
      }
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
      load() {
        let offset = this.items[this.activeTabName].length;
        getOrder({
          type: this.activeTabName,
          offset: offset
        }).then(res => {
            if (res.data.length == 0) {
                this.finished[this.active] = true;
            }
            res.data.map(item => {
                this.items[this.activeTabName].push(item)
            });
            this.loading = false;
        })
      }
    },
    components: {
      OrderCard
    }
  }
</script>

<style>
</style>