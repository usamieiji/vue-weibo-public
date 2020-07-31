<template>
  <div id="message-status">
    <div class="comment" v-if="replyComment">
      <span v-html="showReplyComment"></span>
    </div>
    <div class="content">
      <div class="image">
        <img :src="showImage" alt="">
      </div>
      <div class="text">
        <div class="text-center">
          <div class="name">
            <router-link :to="{path: 'user', query: {screen_name: status.user.screen_name}}">@{{status.user.screen_name}}</router-link>
          </div>
          <div class="status-text">{{showStatusText}}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {textParse} from "common/utils"

  export default {
    name: "MessageStatus",
    props: {
      status: {
        type: Object,
        default() {
          return null
        }
      },
      replyComment: {
        type: Object,
        default() {
          return null
        }
      }
    },
    computed: {
      hasRetweet() {
        return this.status.hasOwnProperty('retweet_status')
      },
      showImage() {
        if (this.hasRetweet) {
          if (this.status.retweet_status.pic_num > 0) return this.status.retweet_status.original_pic.replace('large', 'bmiddle')
          else return this.status.retweet_status.user.avatar_large
        }
        else {
          if (this.status.pic_num > 0) return this.status.original_pic.replace('large', 'bmiddle')
          else return this.status.user.avatar_large
        }
      },
      showReplyComment() {
        if (this.replyComment) return textParse('@' + this.replyComment.user.screen_name + ' ' + this.replyComment.text)
        else return ''
      },
      showStatusText() {
        if (this.hasRetweet) return this.status.text + '//' + this.status.retweeted_status.text
        else return this.status.text
      }
    }
  }
</script>

<style scoped>
  #message-status {
    background-color: #f7f7f7;
    width: 100%;

    padding: 5px 10px 7px;
    word-break: break-all;
  }

  .comment {
    width: 100%;
    font-size: var(--content-font-size);

    margin: 5px 0;

    line-height: 18px;

  }

  .comment >>> a {
    color: var(--color-tint-dark);
  }

  .comment >>> .icon {
    display: inline-block;
    height: var(--font-size);
    width: var(--font-size);
    line-height: var(--font-size);
    vertical-align: middle;

    background-image: url(~assets/img/common/link.svg);
    background-position: center;
    background-size: var(--font-size) var(--font-size);

    margin: 0 3px 2px 5px;
  }


  .comment >>> img {
    height: var(--font-size);
    width: var(--font-size);
    line-height: var(--font-size);
    vertical-align: middle;

    margin: 0 0 3px 2px;
  }

  .content {
    width: 100%;
    display: flex;

    align-content: center;

    background-color: #fff;
  }

  .content .image {
    flex: 0 1 60px;
    height: 60px;
  }

  .content .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;

  }

  .content .text {
    flex: 1;

    display: flex;
    align-items: center;

    margin-left: 10px;
  }

  .content .text .name {
    font-size: var(--font-size);
    margin-bottom: 5px;
  }

  .content .text .status-text {
    font-size: var(--time-font-size);
    color: var(--color-light-text);

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;

  }



</style>