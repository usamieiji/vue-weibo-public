<template>
  <div id="user">
    <universal-profile :id="id" :userName="screenName"/>
  </div>
</template>

<script>
  import UniversalProfile from "views/profile/childComps/UniversalProfile"

  export default {
    name: "User",
    components: {
      UniversalProfile
    },
    data() {
      return {
        screenName: '',
        id: ''
      }
    },
    created() {
      this.screenName = this.$route.query.screen_name
      this.id = this.$route.query.id
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>