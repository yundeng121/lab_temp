<template>
  <van-card
          :tag="platform_CN"
          :desc="desc"
          :origin-price="origin"
          :price="price"
          :title="title"
          :thumb="goods.thumbnail"
          :lazy-load="true"
          @click="showDetails"
  >
    <div slot="tags">
      <van-tag plain type="success" v-if="discount">
        <van-icon name="coupon-o"/> &nbsp;
        {{discount}}
      </van-tag>
      <van-tag plain type="danger">
        <van-icon name="refund-o"/>
        返 {{refund}}
      </van-tag>
    </div>
  </van-card>
</template>

<script>
  import {Tab, Card, Tag, Lazyload} from 'vant'
  import Vue from "vue";
  import store from "../../store";

  Vue.use(Tab).use(Card).use(Tag).use(Lazyload)

  export default {
    name: "GoodsCard",
    props: ['goods', 'platform'],
    methods: {
      showDetails() {
        store.commit('setGoods', {
          goods: this.goods,
          platform: this.platform
        });
        this.$router.push({
          name: 'goods_detail',
          params: {
            platform: this.platform,
            id: this.id
          }
        })
      }
    },
    computed: {
      id() {
        return this.goods.item_id ? this.goods.item_id : (
            this.goods.sku_id ? this.goods.sku_id : this.goods.goods_id
        )
      },
      title() {
        return this.goods.goods_name ? this.goods.goods_name : (
            this.goods.title ? this.goods.title : this.goods.sku_name
        )
      },
      refund() {
        let refund = 0;
        switch (this.platform) {
          case 'tb':
            refund = this.price * this.goods.commission_rate * 0.3 / 100
            break;
          case 'jd':
            refund = this.price * this.goods.commission * this.goods.commission_share * 0.2 / 10000
            break;
          case 'pdd':
            refund = this.price * this.goods.promotion_rate * 0.2 / 1000;
        }
        return refund.toFixed(2)
      },
      price() {
        let price = 0;
        switch (this.platform) {
          case 'tb':
            if (this.goods.zk_final_price >= this.goods.coupon_start_fee)
              price = this.goods.zk_final_price - this.goods.coupon_amount
            else
              price = this.goods.zk_final_price
            break;
          case 'jd':
            price = this.goods.price - this.goods.discount
            break;
          case 'pdd':
            price = this.goods.min_group_price
        }
        return (+price).toFixed(2)
      },
      desc() {
        return this.goods.nick ? this.goods.nick : (
            this.goods.shop_name ? this.goods.shop_name : this.goods.mall_name
        )
      },
      origin() {
        switch (this.platform) {
          case 'tb':
            return this.goods.zk_final_price
          case 'jd':
            return this.goods.price
          case 'pdd':
            return this.goods.min_normal_price
          default:
            return ''
        }
      },
      discount() {
        switch (this.platform) {
          case 'tb':
            return '满' + this.goods.coupon_start_fee + '减' + this.goods.coupon_amount
          case 'jd':
            if (this.goods.discount === 0)
              return null
            return ' 减' + this.goods.discount
          case 'pdd':
            // eslint-disable-next-line no-case-declarations
            let discount = this.goods.min_normal_price - this.goods.min_group_price
            if (discount > 0)
              return '减' + discount.toFixed(2);
            return null
          default:
            return ''
        }
      },
      platform_CN() {
        switch (this.platform) {
          case 'jd':
            return '京东';
          case 'tb':
            return '淘宝';
          case 'pdd':
            return '拼多多';
          default:
            return 'a'
        }
      }
    }
  }
</script>

<style scoped>
  .van-card:not(:first-child) {
    margin-top: 1px;
  }

  .van-card__title {
    font-weight: bold;
  }

  .van-card__price {
    color: #ee0a24;
    float: right;
  }

  .van-card__origin-price {
    float: right;
    margin-right: 10px;
  }

  .van-tag {
    margin-right: 10px;
  }
</style>
