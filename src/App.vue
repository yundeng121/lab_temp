<template>
  <div id="app">
    <div class="header">
      <div class="logo" href="/">
        <img src="@/assets/logo.jpg">
        <span>刘智实验室</span>
      </div>
    </div>
    <router-view name="menu"></router-view>
    <router-view></router-view>
    <!--<router-view name="tabbar"></router-view>-->
    <div class="footer">
      <p>Copyright©2019 华中科技大学XXX实验室版权所有 武汉市洪山区珞喻路1037号 430074</p>
      <a href="">
        联系我们
      </a>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        theme1: 'light'
      }
    },
    
  }
</script>

<style>
  #app {
    width:80%;
    margin:20px auto;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .logo {
    display:flex;
    align-items: center;
    text-align: center;
    text-decoration:none;
    font-size:45px;
    color:#d94842;
  }
  .logo > img{
    width:90px;
    margin-right:15px;
  }
  .logo > span{
    border-left:0.5px solid #dcdcdc;
    padding-left:15px;
  }
  .footer {
    margin-top: 20px;
    text-align: center;
    color:#999;
  }
  .footer > a{
    color:inherit;
  }
</style>
