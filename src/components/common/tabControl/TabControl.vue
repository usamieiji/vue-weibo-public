<template>
  <div id="tab-control">
    <div v-for="(item, index) in tabItem" @click="itemClick(index)">
      <span :class="{active: currentIndex === index}">{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    data() {
      return {
        currentIndex: 0
      }
    },
    props: {
      tabItem: {
        type: Array,
        default: []
      }
    },
    computed: {

    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit('tabClick', index)
      }
    }
  }
</script>

<style scoped>
  #tab-control {
    display: flex;
    justify-content: space-around;
    height: 35px;
    font-size: 16px;
    font-weight: 300;

    background-color: #f7f7f7;
  }

  #tab-control div {
    flex: 1;
    padding: 5px 10px;
    text-align: center;
    line-height: 25px;
  }

  #tab-control div span {
    padding: 0 5px;
  }

  .active {
    border-bottom: 2px solid var(--color-tint-dark);
    color: var(--color-tint-dark);
  }

</style>