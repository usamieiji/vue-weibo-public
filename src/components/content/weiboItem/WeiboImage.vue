<template>
  <div id="weibo-images" :class="{four: picNum === 4, onegrid: picNum === 1}">
    <div id="image-div" :class="{oneimg: picNum === 1}" v-for="(item, index) in imageUrl" :key="index">
      <a :href="largeImgURL(item.thumbnail_pic)">
        <img v-lazy="bmiddleImgURL(item.thumbnail_pic)" alt="" referrer="no-referrer|origin|unsafe-url">
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "WeiboImage",
    props: {
      imageUrl: {
        type: Array,
        default() {
          return []
        }
      },
      picNum: {
        type: Number,
        default: 0
      }
    },
    computed: {},
    methods: {
      largeImgURL(url) {
        return url.replace('thumbnail', target => 'large')
      },
      bmiddleImgURL(url) {
        return url.replace('thumbnail', target => 'bmiddle')
      },
    }
  }
</script>

<style scoped>
  #weibo-images {
    display: grid;
    grid-template-columns: var(--grid-size) var(--grid-size) var(--grid-size);
    column-gap: var(--grid-gap);
    row-gap: var(--grid-gap);
  }


  #weibo-images.four {
    grid-template-columns: var(--grid-size) var(--grid-size);
  }

  #weibo-images.onegrid {
    grid-template-columns: calc(2 * var(--grid-size) + var(--grid-gap));
  }

  #image-div:not(.oneimg) {
    height: var(--grid-size);
    width: var(--grid-size);
    overflow: hidden;
  }

  #image-div.oneimg {
    width: 100%;
    overflow: hidden;
  }

  #image-div img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

</style>