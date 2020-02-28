<template>
  <div/>
</template>
<script>
  import store from '../../store'

  export default {
    created() {
      const token = this.$route.query.token
      store.commit('setToken', token)
      this.$router.replace({path: '/'})
    }
  }
</script>
<style>
</style>
