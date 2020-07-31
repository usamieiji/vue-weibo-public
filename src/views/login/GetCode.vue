<template>
  <div class="jump">
    <div class="jump-text">跳转中......</div>
  </div>
</template>

<script>
  import {getAccessToken} from "network/login"
  import {timeline} from "network/weibo"

  export default {
    name: "GetCode",
    data() {
      return {
        code: ''
      }
    },
    methods: {

    },
    created() {
      this.code = this.$route.query.code
      getAccessToken(this.code).then(res => {
        return res.data.access_token
      }).then(res => {
        sessionStorage.setItem('token', res)
        return this.$store.dispatch('saveToken', res)
      }).then(res => {
        this.$router.replace('/home')
      })
    }
  }
</script>

<style scoped>
  .jump {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100vh;
  }

  .jump-text {
    text-align: center;
  }
</style>