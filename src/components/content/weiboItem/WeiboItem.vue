<template>
  <div id="weibo-item" ref="weiboItem">
    <div class="header">
      <img :src="weibo.user.avatar_large" alt="" class="avatar" @click.stop="avatarDetail">
      <div class="detail">
        <div class="user-name">{{weibo.user.screen_name}}</div>
        <div class="time">
          {{weibo.created_at | showDate}}
          <div class="source"  v-show="weibo.source">
            来自 <span v-html="weibo.source"></span>
          </div>

        </div>
      </div>
      <div class="favorite">
        <img src="~assets/img/common/favor_active.svg" alt="" v-if="weibo.favorited" class="favorite">
        <img src="~assets/img/common/favor.svg" alt="" v-else class="favorite">
      </div>

    </div>
    <div class="content" @click="weiboDetail"><span v-html="urlParse(weibo)"></span></div>
    <div class="images" v-if="weibo.pic_num > 0">
      <weibo-image :image-url="weibo.pic_urls" :pic-num="weibo.pic_num"></weibo-image>
    </div>
    <div class="retweet" v-if="weibo.retweeted_status" @click.stop="retweetDetail">
      <retweet :weibo="weibo.retweeted_status"></retweet>
    </div>
    <div class="info">
      <div class="retweet-num">
        <img src="~assets/img/common/retweet.svg" alt="">
        <span v-if="weibo.reposts_count !== 0"> {{weibo.reposts_count}}</span>
      </div>
      <div class="comment-num">
        <img src="~assets/img/common/comment.svg" alt="">
        <span v-if="weibo.comments_count !== 0"> {{weibo.comments_count}}</span>
      </div>
      <div class="attitude-num">
        <img src="~assets/img/common/attitude.svg" alt="">
        <span v-if="weibo.attitudes_count !== 0"> {{weibo.attitudes_count}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {weiboDate, weiboUrlParse} from "common/utils"

  import WeiboImage from "./WeiboImage"
  import Retweet from "./Retweet"

  export default {
    name: "WeiboItem",
    components: {
      WeiboImage,
      Retweet
    },
    props: {
      weibo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
      }
    },
    created() {
      // document.getElementById('weibo-content').innerHTML = weiboUrlParse(this.weibo).plainText
    },
    mounted() {
      // document.getElementById('weibo-content').innerHTML = weiboUrlParse(this.weibo).plainText
    },
    filters: {
      showDate(value) {
        return weiboDate(value)
      },

    },
    computed: {
      // showVideoUrl() {
      //   if (this.videoUrl) return 'http://127.0.0.1:8080/video/' + this.videoUrl[0].slice(-8)
      //   else return ''
      // }
    },
    methods: {
      urlParse(weibo) {
        return weiboUrlParse(weibo, this.$store.state.access_token)
      },
      weiboDetail() {
        this.$refs.weiboItem.style.backgroundColor = 'var(--color-background)'
        const promise = new Promise((resolve, reject) => {
          setTimeout(() => {
            this.$refs.weiboItem.style.backgroundColor = 'var(--color-background-light)'
            resolve()
          }, 20)
        }).then(res => {
          window.location = 'https://m.weibo.cn/' + this.weibo.user.idstr + '/' + this.weibo.idstr
        })
        // window.location.href = 'https://m.weibo.cn/' + this.weibo.user.idstr + '/' + this.weibo.idstr


      },
      avatarDetail() {
        window.location = '/user?id=' + this.weibo.user.idstr
      },
      retweetDetail() {
        window.location = 'https://m.weibo.cn/' + this.weibo.retweeted_status.user.idstr + '/' + this.weibo.retweeted_status.idstr
      }
    }
  }
</script>

<style scoped>
  #weibo-item {
    margin: 10px 0;
    background-color: var(--color-background-light);
  }


  .header {
    display: flex;
  }

  .avatar {
    border-radius: 50%;
    width: 40px;
    height: 40px;

    margin: 15px;
  }

  .detail {
    flex: 1;
    height: 40px;

    margin: 15px 0;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    font-size: 14px;
  }

  .detail .time {
    font-size: 12px;
    color: var(--color-light-text);

  }

  .detail .time .source {
    display: inline-block;
  }

  .detail .time .source>>> a {
    color: var(--color-emphasize);
  }

  .favorite {
    height: 40px;
    line-height: 40px;
    margin: 15px 10px;

    text-align: center;
    vertical-align: center;
  }

  .favorite img{
    height: 22px;
    width: 22px;

    margin: 0;
  }

  .content {
    margin: 0 15px;

    font-size: 13px;
    font-weight: 400;

    line-height: 20px;

    word-break: break-all;
  }

  .content >>> a {
    color: var(--color-tint-dark);
  }

  .content >>> .icon {
    display: inline-block;
    height: 13px;
    width: 13px;
    line-height: 13px;
    vertical-align: middle;

    background-image: url(~assets/img/common/link.svg);
    background-position: center;
    background-size: 13px 13px;

    margin: 0 3px 2px 5px;
  }

  .content >>> img {
    height: 13px;
    width: 13px;
    line-height: 13px;
    vertical-align: middle;

    margin: 0 0 2px 2px;
  }

  .images {
    margin: 4px var(--weibo-margin);
  }

  .retweet {
    margin: 4px 0 0;
    background-color: var(--color-retweet-bgc);
  }

  .info {
    display: flex;
    text-align: center;
    justify-content: space-around;

    color: var(--color-button);
    font-size: var(--time-font-size);
  }

  .info div {
    flex: 1;
    padding: 6px 0;
  }

  .info img {
    width: var(--content-font-size);
    margin-bottom: 3px;
    vertical-align: middle;
  }

</style>