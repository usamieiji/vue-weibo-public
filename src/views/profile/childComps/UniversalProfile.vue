<template>
  <div id="profile" v-if="profileInfo">
    <div class="background-image">
      <img v-lazy="profileInfo.cover_image_phone" alt="" class="background-image">
    </div>
    <div class="header" ref="header">
      <div>
        <img v-lazy="profileInfo.avatar_large" alt="" class="avatar">
      </div>

      <div class="name">
        <span>{{profileInfo.screen_name}}</span>
        <img src="" alt="">
      </div>
      <div class="relationship">关注 {{profileInfo.friends_count}} ｜ 粉丝 {{profileInfo.followers_count}}</div>
      <div class="description">简介：{{showDescription}}</div>
    </div>
    <div class="time-line" v-if="profileInfo.status">
      <weibo-item :weibo="profileInfo.status" :key="profileInfo.status.id"/>
    </div>
    <div class="limit" v-else>
      <div><img src="~assets/img/common/hide.svg" alt=""></div>

      <div class="limit-text">由于API限制，你无法查看TA的微博</div>
    </div>
    <div class="jump-button">
      <span @click="jumpToOfficial">微博官方查看</span>
    </div>
  </div>
</template>

<script>
  import WeiboItem from "components/content/weiboItem/WeiboItem"

  import {user_show} from "network/weibo"
  import {myInfo} from "../../../myInfo"

  export default {
    name: "UniversalProfile",
    components: {
      WeiboItem
    },
    props: {
      userName: {
        type: String,
        default: ''
      },
      id: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        profileInfo: null
      }
    },
    computed: {
      showDescription() {
        if (this.profileInfo.description) return this.profileInfo.description
        else return '这个人很懒，什么都没有留下来'
      }
    },
    created() {
      if (sessionStorage.getItem('token')) {
        this.getUserInfo()
      } else {
        this.profileInfo = myInfo.data
        if (Object.keys(this.profileInfo.status).length !== 0) {
          this.profileInfo.status['user'] = {}
          this.profileInfo.status.user['screen_name'] = this.profileInfo.screen_name
          this.profileInfo.status.user['avatar_large'] = this.profileInfo.avatar_large
          this.profileInfo.status.user['id'] = this.profileInfo.id
          this.profileInfo.status.user['idstr'] = this.profileInfo.idstr
        } else {
          this.profileInfo.status = null
        }
      }
    },
    mounted() {
      // this.$refs.header.style.backgroundImage = 'url(' + this.profileInfo.cover_image_phone + ')'
    },
    methods: {
      jumpToOfficial() {
        window.location = 'https://m.weibo.cn/u/' + this.profileInfo.idstr
      },
      getUserInfo() {
        user_show(this.$store.state.access_token, this.id, this.userName).then(res => {
          console.log(JSON.stringify(res))
          this.profileInfo = res.data
          if (Object.keys(this.profileInfo.status).length !== 0) {
            this.profileInfo.status['user'] = {}
            this.profileInfo.status.user['screen_name'] = this.profileInfo.screen_name
            this.profileInfo.status.user['avatar_large'] = this.profileInfo.avatar_large
            this.profileInfo.status.user['id'] = this.profileInfo.id
            this.profileInfo.status.user['idstr'] = this.profileInfo.idstr
          } else {
            this.profileInfo.status = null
          }

        })
      }
    }
  }
</script>

<style scoped>
  #profile {

    height: 100%;
  }

  .background-image {
    position: absolute;

    width: 100vw;
    height: 233px;

    z-index: -1;
  }

  .background-image img {
    object-fit: cover;
  }

  .header {
    display: flex;
    flex-direction: column;
    text-align: center;

    background-size:     cover;
    background-repeat:   no-repeat;
    background-position: center center;

    color: white;

    padding: 30px;

    font-size: var(--font-size);
    text-shadow: black 0.1em 0.1em 0.2em
  }

  .header .avatar {
    width: 70px;
    height: 70px;

    border-radius: 50%;

    margin: 15px;
  }

  .header .name {
    margin-bottom: 10px;
    font-size: 16px;
  }

  .header .relationship {
    margin-bottom: 10px;
  }

  .limit {
    font-size: var(--font-size);

    display: flex;
    flex-direction: column;
    text-align: center;

    margin-top: 20px;
  }

  .limit img {
    width: 40px;

  }

  .limit .limit-text {
    text-align: center;
  }


  .jump-button {
    position: fixed;
    bottom: 150px;

    font-size: 18px;
    text-align: center;
    width: 100vw;
  }

  .jump-button span {
    background-color: var(--color-tint);
    color: white;

    padding: 10px 15px;

    border-radius: 20px;

    box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
  }

  .jump-button span:active {
    background-color: var(--color-tint-dark);
    box-shadow: 0 0;
  }

</style>