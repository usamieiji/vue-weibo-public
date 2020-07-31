<template>
  <div id="weibo-info">

  </div>
</template>

<script>
  export default {
    name: "WeiboInfo",
    props: {
      retweetNum: {
        type: Number,
        default: 0
      },
      commentNum: {
        type: Number,
        default: 0
      },
      attitudeNum: {
        type: Number,
        default: 0
      },
    }
  }
</script>

<style scoped>

</style>