<template>
  <div class="float-icon" @click="onClick">
    <van-icon name="shop-o" size="22px" color="#1989fa"/>
    <p>我有口令</p>
  </div>
</template>

<script>
  import {Icon} from 'vant';

  export default {
    name: "FloatIcon",
    components: {
      [Icon.name]: Icon
    },
    methods: {
      onClick() {

      }
    }
  }
</script>

<style scoped>
  .float-icon {
    background: rgb(255, 255, 255);
    position: fixed;
    right: 5px;
    bottom: 80px;
    font-size: 11px;
    border-radius: 50%;
    color: #666666;
    z-index: 20;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);


    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 5px 4px;
  }

  .van-icon {
    /*margin-bottom: 5px;*/
  }

  .float-icon p {
    margin-top: 1px;
    margin-bottom: 0;
  }

</style>
