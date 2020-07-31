<template>
  <div id="message">
    <nav-bar>
      <div slot="center">消息</div>
    </nav-bar>
    <tab-control :tab-item="['回复我的', '@我的', '我的评论']" class="tab-control" @tabClick="tabClick"/>
    <div class="content">
      <message-item v-for="item in showContent" :key="item.id" :message="item"/>
    </div>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import TabControl from "components/common/tabControl/TabControl"
  import MessageItem from "components/content/messageItem/MessageItem"

  import {comment_to_me, mentions, comment_by_me} from "network/weibo"
  import {tempCommentToMe} from "../../tempCommentToMe"
  import {tempCommentByMe} from "../../tempCommentByMe"
  import {tempMentions} from "../../tempMentions"

  export default {
    name: "Message",
    data() {
      return {
        currentIndex: 0,
        commentToMe: null,
        commentByMe: null,
        Mentions: null
      }
    },
    components: {
      NavBar,
      TabControl,
      MessageItem
    },
    computed: {
      showContent() {
        switch(this.currentIndex) {
          case 0:
            return this.commentToMe
          case 1:
            return this.Mentions
          case 2:
            return this.commentByMe
        }
      }
    },
    created() {
      if (sessionStorage.getItem('token')) {
        this.$store.dispatch('saveToken', sessionStorage.getItem('token'))
        this.getCommentToMe()
      }
      else {
        this.commentToMe = tempCommentToMe.data.comments
        this.commentByMe = tempCommentByMe.data.comments
        this.Mentions = tempMentions.data.comments
      }
    },
    methods: {
      tabClick(index) {
        this.currentIndex = index

        if (sessionStorage.getItem('token')) {
          this.$store.dispatch('saveToken', sessionStorage.getItem('token'))
          switch (index) {
            case 0:
              this.getCommentToMe()
              break
            case 1:
              this.getMentions()
              break
            case 2:
              this.getCommentByMe()
              break
          }
        }
      },
      getCommentToMe() {
        comment_to_me(this.$store.state.access_token).then(res => {
          console.log(JSON.stringify(res))
          this.commentToMe = res.data.comments
        })
      },
      getMentions() {
        mentions(this.$store.state.access_token).then(res => {
          console.log(JSON.stringify(res))
          this.Mentions = res.data.comments
        })
      },
      getCommentByMe() {
        comment_by_me(this.$store.state.access_token).then(res => {
          console.log(JSON.stringify(res))
          this.commentByMe = res.data.comments
        })
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
  }

  .content {
    margin: 79px 0 49px;
  }


</style>