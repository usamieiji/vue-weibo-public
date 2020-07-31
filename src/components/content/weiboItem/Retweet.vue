<template>
  <div id="retweet-weibo">
    <div class="content">
      <a :href="'https://m.weibo.cn/u/' + weibo.user.id">@{{weibo.user.screen_name}}</a>:
      <span v-html="urlParse(weibo)"></span></div>
    <div class="images" v-if="weibo.pic_num > 0">
      <weibo-image :image-url="weibo.pic_urls" :pic-num="weibo.pic_num"></weibo-image>
    </div>
  </div>
</template>

<script>
  import {weiboUrlParse} from "common/utils"

  import WeiboImage from "./WeiboImage"

  export default {
    name: "Retweet",
    components: {
      WeiboImage
    },
    props: {
      weibo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      urlParse(weibo) {
        return weiboUrlParse(weibo, this.$store.state.access_token)
      }
    }
  }
</script>

<style scoped>
  #retweet-weibo {
    font-size: var(--retweet-font-size);
    padding: 10px var(--weibo-margin);
  }

  .content {
    word-break: break-all;
    line-height: 18px;
    color: var(--color-retweet-text);
  }

  .content>>> a {
    color: var(--color-tint-dark)
  }

  .content>>> .icon {
    display: inline-block;
    height: var(--retweet-font-size);
    width: var(--retweet-font-size);
    line-height: var(--retweet-font-size);
    vertical-align: middle;

    background-image: url(~assets/img/common/link.svg);
    background-position: center;
    background-size: var(--retweet-font-size) var(--retweet-font-size);

    margin: 0 3px 2px 5px;
  }

  .content>>> img {
    height: var(--retweet-font-size);
    width: var(--retweet-font-size);
    line-height: var(--retweet-font-size);
    vertical-align: middle;

    margin: 0 0 2px 2px;
  }

  .images {
    margin: 5px 0 0;
  }
</style>