<template>
  <van-dialog v-model="showModal"
              title="TalentYou 优惠券"
              message-align='center'
              :showCancelButton="true"
              @opened="modalOpened"
              @confirm="modalConfirmed"
  >
    <div slot="default" style="alignment: center;width: 100%;padding-left: 10px;">
      <input style="color: #f22d36; width: 100%;border-style:none" id="coupon_url" v-model="couponURL" readonly>
            <p v-if="this.platform === 'tb'">点击"确定"，复制口令，打开淘宝购买！</p>
            <p v-if="this.platform === 'jd'">点击"确定"，前往京东购买！</p>
            <p v-if="this.platform === 'pdd'">点击"确定"，前往拼多多购买！</p>
    </div>
  </van-dialog>
</template>

<script>
  import {Dialog} from 'vant'

  export default {
    name: "CouponModal",
    props: {
      couponURL: String,
      platform: String
    },
    data() {
      return {
        showModal: false,
      }
    },
    methods: {
      show() {
        this.showModal = true
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
    components: {
      [Dialog.name]: Dialog
    }
  }
</script>

<style scoped>

</style>
