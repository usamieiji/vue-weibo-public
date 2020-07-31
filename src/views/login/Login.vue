<template>
  <div class="login">
    <a :href="showWeiboLoginURL">
      <img src="~assets/img/login/weibo.png" alt="">
      <div class="login-text">微博登录</div>
    </a>

  </div>
</template>

<script>
  import {weiboConst} from "common/const"

  export default {
    name: "Login",
    methods: {},
    computed: {
      showWeiboLoginURL() {
        return 'https://api.weibo.com/oauth2/authorize?client_id=' + weiboConst.appKey + '&response_type=code&redirect_uri=' + weiboConst.redirectUri
      }
    }
  }
</script>

<style scoped>
  .login {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  .login img {
    width: 150px;
  }

  .login .login-text {
    text-align: center;

    margin-top: 20px;
    font-size: 20px;
  }

</style>