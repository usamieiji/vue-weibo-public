import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('views/login/Login')
const GetCode = () => import('views/login/GetCode')
const Home = () => import('views/home/Home')
const Message = () => import('views/message/Message')
const Profile = () => import('views/profile/Profile')
const User = () => import('views/user/User')

const routes = [
  {
    path: '/',
    redirect: '/login_weibo'
  },
  {
    path: '/login_weibo',
    component: Login
  },
  {
    path: '/get_code',
    component: GetCode
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/message',
    component: Message
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/user',
    component: User
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
