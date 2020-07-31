<template>
  <div id="main-tab-bar" v-show="isShowTabBar">
    <tab-bar>
      <tab-bar-item path="/home">
        <img src="~assets/img/tabbar/home.svg" alt="" slot="icon">
        <img src="~assets/img/tabbar/home_active.svg" alt="" slot="icon-active">
        <div slot="text">微博</div>
      </tab-bar-item>
      <tab-bar-item path="/message">
        <img src="~assets/img/tabbar/message.svg" alt="" slot="icon">
        <img src="~assets/img/tabbar/message_active.svg" alt="" slot="icon-active">
        <div slot="text">消息</div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <img src="~assets/img/tabbar/profile.svg" alt="" slot="icon">
        <img src="~assets/img/tabbar/profile_active.svg" alt="" slot="icon-active">
        <div slot="text">我</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
  import TabBar from "components/common/tabbar/TabBar"
  import TabBarItem from "components/common/tabbar/TabBarItem"

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    },
    computed: {
      isShowTabBar() {
        return this.$route.path.indexOf('/login_weibo');
      }
    }
  }
</script>

<style scoped>

</style>