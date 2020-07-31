<template>
  <div id="profile">
    <universal-profile v-if="userId" :id="userId" class="uni-profile"/>
  </div>
</template>

<script>
  import UniversalProfile from "./childComps/UniversalProfile"

  import {get_uid} from "network/weibo"

  export default {
    name: "Profile",
    components: {
      UniversalProfile
    },
    data() {
      return {
        userId: null
      }
    },
    created() {
      if (sessionStorage.getItem('token')) {
        get_uid().then(res => {
          this.userId = res.data.uid
        })
      } else {
        this.userId = '3122680332'
      }
    },
    methods: {

    }
  }
</script>

<style scoped>
  #profile {
    height: calc(100vh - 49px);
  }

  .uni-profile {
    height: 100%;
  }
</style>