<template>
  <van-dialog v-model="showModal"
              title="分享"
              message-align='center'
              :showCancelButton="true"
              @opened="modalOpened"
              @confirm="modalConfirmed"
  >
    <div slot="default" style="alignment: center;width: 100%;padding-left: 10px;">
      <textarea style="width: 100%;border-style:none"
                id="goods_url"
                :value="value"
                readonly/>
      <p>点击"确定"，复制链接，分享给朋友！</p>
    </div>
  </van-dialog>
</template>

<script>
  import Vue from 'vue';
  import {Dialog, Notify} from 'vant';
  import Clipboard from "clipboard";

  Vue.use(Dialog)

  const clipboard = new Clipboard('.van-dialog__confirm');
  clipboard.on('success', function () {
    Notify({type: 'success', message: '链接复制成功'});
  });
  clipboard.on('error', function () {
  });
  export default {
    name: "ShareModal",
    data() {
      return {
        showModal: false
      }
    },
    computed: {
      value() {
        return '我在TalentYou发现一个优惠商品，与你分享：' + window.location.href
      }
    },
    methods: {
      show() {
        this.showModal = true
      },
      modalOpened() {
        document.getElementsByClassName("van-dialog__confirm")[0]
            .setAttribute('data-clipboard-target', '#goods_url')
      },
      modalConfirmed() {

      }
    },
    components: {
      [Dialog.name]: Dialog
    }
  }
</script>

<style scoped>

</style>
