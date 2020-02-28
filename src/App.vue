<template>
  <div id="app">
    <KeepAlive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </KeepAlive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <router-view name="tabbar"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    components: {},
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
