<template>
  <div v-if="goods">
    <SearchBar></SearchBar>
    <van-swipe :autoplay="4000" :height="380" style="margin-top: 46px">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" width="100%"/>
      </van-swipe-item>
    </van-swipe>
    <div class="goods-info van-hairline--bottom">
      <div class="van-card__price">
        <span class="van-card__price-currency">¥</span>
        <span class="van-card__price-integer">{{price.split('.')[0]}}</span>
        <span class="van-card__price-decimal">.{{price.split('.')[1]}}</span>
      </div>
      <div class="van-card__origin-price">原价 {{origin}}</div>

      <div class="van-multi-ellipsis--l2">
        <van-tag round type="danger" size="small">{{platform_CN}}</van-tag>
        <span class="goods-title">{{title}}</span>
      </div>

      <div class="shop">
        <span>{{desc}}</span>
      </div>

      <div>
        <van-tag round type="success" v-if="discount">
          <van-icon name="coupon-o"/>
          {{discount}}
        </van-tag>
        <van-tag round type="danger">
          <van-icon name="refund-o"/>
          返 {{refund}}
        </van-tag>
      </div>
      <div style="font-size: 13px; margin-top: 5px" class="van-hairline--top">
        <ol>
          <li>- 返利为预估，按实际结算为准</li>
          <li>- 京东，拼多多商品可直接跳转小程序购买</li>
          <li>- 购买之后可以在个人中心查看返利</li>
        </ol>
      </div>
    </div>

    <ShareModal ref="ShareModal"></ShareModal>
    <CouponModal ref="CouponModal"
                 :couponURL="couponURL"
                 :platform="platform"
    ></CouponModal>
    <van-goods-action class="van-hairline--top">
      <van-goods-action-icon icon="chat-o" text="客服" @click="kefu"/>
      <van-goods-action-button type="warning" text="分享" @click="share"/>
      <van-goods-action-button type="danger" text="立即购买" @click="buy"/>
    </van-goods-action>
    <van-popup v-model="showKefu">
      <Kefu/>
    </van-popup>
  </div>
</template>

<script>
  import {Tag, Popup, NavBar, Swipe, SwipeItem, Search, Dialog} from 'vant';
  import {GoodsAction, GoodsActionIcon, GoodsActionButton} from 'vant';
  import {goods_detail, goods_coupon} from '@/axios/api'
  import Kefu from "@/components/model/KeFu"
  import SearchBar from "../components/nav-bar/SearchBar";
  import ShareModal from "../components/goods/ShareModal";
  import CouponModal from "../components/goods/CouponModal";
  import store from "../store";


  export default {
    name: "GoodsDetail",
    data() {
      return {
        goods: null,
        platform: null,
        couponURL: null,
        showKefu: false
      }
    },
    created() {
      this.platform = this.$route.params.platform
      goods_detail({
        platform: this.$route.params.platform,
        goods_id: this.$route.params.id
      }).then(res => {
        this.goods = res.data.data
      });
    },
    components: {
      ShareModal,
      CouponModal,
      SearchBar,
      Kefu,
      [SearchBar.name]: SearchBar,
      [GoodsActionButton.name]: GoodsActionButton,
      [GoodsAction.name]: GoodsAction,
      [GoodsActionIcon.name]: GoodsActionIcon,
      [Tag.name]: Tag,
      [Popup.name]: Popup,
      [NavBar.name]: NavBar,
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [Search.name]: Search
    },
    methods: {
      buy() {
        if (!store.getters.getToken) {
          Dialog.confirm({
            title: '未登录,无返利',
            message: '您未登录，仅可领优惠券，无法享受返利！' +
                '<br/>点击<span style="color:red">确定</span>，去登录；点击取消，继续领券！'
          }).then(() => {
            // on confirm
            this.$router.push({
              name: 'wechat_confirm'
            })
          }).catch(() => {
            // on cancel
            goods_coupon({
              platform: this.platform,
              goods_id: this.$route.params.id
            }).then(res => {
              this.couponURL = res.data.data.coupon_url
              this.$refs.CouponModal.show()
            })
          });
        }else {
          //已登录
          goods_coupon({
            platform: this.platform,
            goods_id: this.$route.params.id
          }).then(res => {
            this.couponURL = res.data.data.coupon_url
            this.$refs.CouponModal.show()
          })
        }


      },
      share() {
        this.$refs.ShareModal.show()
      },
      kefu() {
        this.showKefu = true
      },
      modalOpened() {
        document.getElementsByClassName("van-dialog__confirm")[0]
            .setAttribute('data-clipboard-target', '#coupon_url')
      },
      modalConfirmed() {
        if (this.platform === 'jd' || this.platform === 'pdd') {
          window.location.href = this.couponURL
        }
      }
    },
    computed: {
      title() {
        return this.goods.goods_name ? this.goods.goods_name : (
            this.goods.title ? this.goods.title : this.goods.sku_name
        )
      },
      images() {
        switch (this.platform) {
          case 'tb':
            return this.goods.small_images ? this.goods.small_images : [this.goods.pict_url]
          case 'jd':
            return this.goods.image_url
          case 'pdd':
            return [this.goods.goods_image_url];
          default:
            return ''
        }
      },
      desc() {
        return this.goods.nick ? this.goods.nick : (
            this.goods.shop_name ? this.goods.shop_name : this.goods.mall_name
        )
      },
      discount() {
        switch (this.platform) {
          case 'tb':
            if (!this.goods.coupon_amount)
              return null;
            return '满' + this.goods.coupon_start_fee + '减' + this.goods.coupon_amount
          case 'jd':
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
      price() {
        let price = 0;
        switch (this.platform) {
          case 'tb':
            if (this.goods.zk_final_price >= this.goods.coupon_start_fee)
              price = this.goods.zk_final_price - this.goods.coupon_amount
            else
              price = this.goods.zk_final_price
            break
          case 'jd':
            price = this.goods.price - this.goods.discount
            break
          case 'pdd':
            price = this.goods.min_group_price
        }
        return (+price).toFixed(2)
      },
      refund() {
        let refund = 0
        switch (this.platform) {
          case 'tb':
            refund = this.price * this.goods.commission_rate * 0.4 / 100
            break
          case 'jd':
            refund = this.price * this.goods.commission * this.goods.commission_share * 0.3 / 10000
            break
          case 'pdd':
            refund = this.price * this.goods.promotion_rate * 0.3 / 100;
        }
        return refund.toFixed(2)
      },
      platform_CN() {
        switch (this.platform) {
          case 'jd':
            return '京东'
          case 'tb':
            return '淘宝'
          case 'pdd':
            return '拼多多'
          default:
            return 'a'
        }
      }
    }
  }
</script>

<style scoped>
  div {
    /*background-color: #fafafa;*/
  }

  .van-card__price {
    color: #ee0a24;
    font-size: 18px;
    margin-bottom: 5px;
  }

  .van-card__price-integer {
    margin-left: 4px;
    font-size: 23px;
  }

  .shop {
    margin-top: 5px;
    color: #646566;
    font-size: 13px;
  }

  .van-tag {
    font-size: 10px;
  }

  .goods-info {
    padding: 3px 5px 5px 8px;
    background-color: white;
  }

  .goods-title {
    margin-left: 5px;
    font-weight: bold;
    font-size: 14px;
  }

</style>
