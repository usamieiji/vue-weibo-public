<template>
  <div id="home">
    <nav-bar class="nav-bar">
      <div slot="left">
        <img src="~assets/img/home/refresh.svg" alt="" @click="refresh" :class="{'refresh-button': isRefresh}">
      </div>
      <div slot="center" class="category">关注</div>
      <div slot="right" class="edit">
        <img src="~assets/img/home/add.svg" alt="" @click="addStatus">
      </div>
    </nav-bar>
    <div class="time-line" id="time-line">
      <weibo-item v-for="item in homeTimeLineWeibo" :weibo="item" :key="item.id"/>
    </div>
  </div>
</template>

<script>
  import WeiboItem from "components/content/weiboItem/WeiboItem"

  import NavBar from "components/common/navbar/NavBar"

  import {home_timeline, rate_limit, add_status} from "network/weibo"

  import {storeWeibo2} from "../../tempWeibo2"

  export default {
    name: "Home",
    data() {
      return {
        homeTimeLineWeibo: [],
        maxId: 0,
        _loadListener: null,
        storeRefresh: null,
        refreshStart: 0,
        isRefresh: false
      }
    },
    computed: {

    },
    components: {
      WeiboItem,
      NavBar
    },
    activated() {
      console.log('acti')
      window.addEventListener('scroll', this.loadListener)
    },
    deactivated() {
      console.log('deac')
      window.removeEventListener('scroll', this.loadListener)
    },

    created() {
      // this.rateLimitTest()
      if (sessionStorage.getItem('token')) {
        this.$store.dispatch('saveToken', sessionStorage.getItem('token'))
        this.getHomeTimeLine()
      }
      else {
        this.homeTimeLineWeibo = storeWeibo2.data.statuses
        this.maxId = storeWeibo2.data.max_id
      }
      // this.getHomeTimeLine()

      // this.storeWeibo()
      // if (!this.$store.state.emotions) this.getEmotions()
    },
    mounted() {
      console.log('moun')
      this._loadListener = this._.throttle(() => {
        this.loadMore()
      }, 1000)
    },
    methods: {
      getHomeTimeLine() {
        home_timeline(this.$store.state.access_token).then(res => {
          console.log(JSON.stringify(res))
          this.homeTimeLineWeibo = res.data.statuses
          this.maxId = res.data.max_id
        })
      },
      loadListener() {
        const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop

        // console.log(scrollTop + ' ' + window.innerHeight + ' ' + document.getElementById('time-line').offsetHeight)

        if (scrollTop + window.innerHeight + 100 >= document.getElementById('time-line').offsetHeight) {
          this._loadListener()
        }
      },
      refresh() {
        this.isRefresh = true
        const timer = new Date()
        if (timer.getTime() - this.refreshStart < 10000) {
          console.log('temp')

          document.documentElement.scrollTop = 0 //|| window.pageYOffset || document.body.scrollTop

        } else {
          this.refreshStart = timer.getTime()
          home_timeline(this.$store.state.access_token).then(res => {
            console.log('refresh')
            console.log(res)
            this.homeTimeLineWeibo = res.data.statuses
            this.maxId = res.data.max_id

            document.documentElement.scrollTop = 0
          })
        }
        setTimeout(() => {
          this.isRefresh = false
        }, 2000)

      },
      loadMore() {
        console.log('loading')
        home_timeline(this.$store.state.access_token, this.maxId).then(res => {
          console.log('next')
          console.log(res)
          this.homeTimeLineWeibo.push(...res.data.statuses)
          this.maxId = res.data.max_id
        })
      },
      addStatus() {
        const status = encodeURI('测试test[doge][doge]@zz指导 https://100.64.38.7')
        add_status(this.$store.state.access_token, status).then(res => {
          console.log('add status')
        }).catch(rej => {
          console.log('failed')
          console.log(rej)

        })
      },


      //test
      rateLimitTest() {
        rate_limit(this.$store.state.access_token).then(res => {
          console.log(res)
        })
      },
      storeWeibo() {
        const newWeiboList = {}
        for (let i = 0; i < 20; i++) {
          newWeiboList['weibo' + i] = this.homeTimeLineWeibo[i]
        }
        console.log(JSON.stringify(newWeiboList))
      }
      // getEmotions() {
      //   emotions(this.$store.state.access_token).then(res => {
      //     console.log(res)
      //     this.$store.dispatch('saveEmotions', res)
      //   })
      // }
    }

  }
</script>

<style scoped>
  #home {
    height: 100vh;

  }

  @keyframes refresh {
    from {transform: rotate(0deg)}
    to {transform: rotate(720deg)}
  }

  .refresh-button {
    animation: refresh 2s;
    animation-timing-function: ease-in-out;
  }

  .time-line {
    padding: 44px 0 49px 0;
  }


</style>