<template>
  <div id="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  #nav-bar {
    z-index: 1;
    line-height: 44px;
    text-align: center;
    height: 44px;
    background-color: var(--color-background-light);

    font-size: 18px;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.05);

    display: flex;
  }

  .left, .right {
    width: 60px;
  }

  .center {
    flex: 1;
  }

  img {
    width: 25px;
    height: 25px;
    margin-top: 10px;
  }
</style>