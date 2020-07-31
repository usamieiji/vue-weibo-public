<template>
  <div id="message-item">
    <div class="header">
      <img :src="message.user.avatar_large" alt="" class="avatar" @click.stop="avatarDetail">
      <div class="detail">
        <div class="user-name">{{message.user.screen_name}}</div>
        <div class="time">
          {{message.created_at | showDate}}
          <div class="source"  v-show="message.source">
            来自 <span v-html="message.source"></span>
          </div>

        </div>
      </div>
    </div>
    <div class="content" @click="weiboDetail"><span v-html="urlParse(message)"></span></div>
    <div class="images" v-if="message.pic_num > 0">
      <weibo-image :image-url="message.pic_urls" :pic-num="message.pic_num"></weibo-image>
    </div>
    <div class="message-status" v-else>
      <message-status :status="message.status" :reply-comment="replyComment"/>
    </div>

  </div>
</template>

<script>
  import WeiboImage from "../weiboItem/WeiboImage"

  import MessageStatus from "./MessageStatus"

  import {weiboDate, weiboUrlParse} from "common/utils"

  export default {
    name: "MessageItem",
    components: {
      WeiboImage,
      MessageStatus
    },
    props: {
      message: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      replyComment() {
        if (this.message.hasOwnProperty('reply_comment')) return this.message.reply_comment
        else return null
      }
    },
    filters: {
      showDate(value) {
        return weiboDate(value, true)
      },
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
  #message-item {
    word-break: break-all;

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

    margin: 10px;
  }

  .detail {
    flex: 1;
    height: 40px;

    margin: 10px 0;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    font-size: var(--font-size);
  }

  .detail .time {
    font-size: var(--time-font-size);
    color: var(--color-light-text);

  }

  .detail .time .source {
    display: inline-block;
  }

  .detail .time .source>>> a {
    color: var(--color-light-text);
  }

  .content {
    margin: 0 10px 10px;

    font-size: 13px;
    font-weight: 400;

    line-height: 18px;

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

</style>