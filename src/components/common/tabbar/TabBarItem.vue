<template>
  <div id="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="icon"></slot>
    </div>
    <div v-else>
      <slot name="icon-active"></slot>
    </div>
    <div :class="{active: isActive}">
      <slot name="text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1
      }
    },
    methods: {
      itemClick() {
        if (this.isActive) {
          console.log('多次点击同一路由')
        } else {
          this.$router.replace(this.path)
        }
      }
    }
  }
</script>

<style scoped>
  #tab-bar-item {
    flex: 1;
    height: 49px;
    font-size: 12px;

    text-align: center;
  }

  #tab-bar-item img {
    height: 24px;
    width: 24px;
    margin-top: 4px;
    vertical-align: center;
  }

  .active {
    color: var(--color-tint-dark);
  }
</style>