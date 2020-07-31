import {request_weibo} from "./request"
import {weiboConst} from "common/const"

export function home_timeline(access_token, max_id) {
  access_token = access_token || sessionStorage.getItem('token')
  return request_weibo({
    url: '/statuses/home_timeline.json',
    method: 'get',
    params: max_id ? {access_token, max_id} : {access_token}
  })
}

export function user_show(access_token, uid, screen_name) {
  access_token = access_token || sessionStorage.getItem('token')
  if (uid || screen_name) return request_weibo({
    url: '/users/show.json',
    method: 'get',
    params: (uid ? {access_token, uid} : {access_token, screen_name})
  })
}

export function get_uid(access_token) {
  access_token = access_token || sessionStorage.getItem('token')
  return request_weibo({
    url: '/account/get_uid.json',
    method: 'get',
    params: {
      access_token
    }
  })
}

export function comment_to_me(access_token, max_id) {
  access_token = access_token || sessionStorage.getItem('token')
  return request_weibo({
    url: '/comments/to_me.json',
    method: 'get',
    params: max_id ? {access_token, max_id} : {access_token}
  })
}

export function comment_by_me(access_token, max_id) {
  access_token = access_token || sessionStorage.getItem('token')
  return request_weibo({
    url: '/comments/by_me.json',
    method: 'get',
    params: max_id ? {access_token, max_id} : {access_token}
  })
}

export function mentions(access_token, max_id) {
  access_token = access_token || sessionStorage.getItem('token') || access_token
  return request_weibo({
    url: '/comments/mentions.json',
    method: 'get',
    params: max_id ? {access_token, max_id} : {access_token}
  })
}

export function add_status(access_token, status) {
  return request_weibo({
    url: '/statuses/share.json',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: {
      access_token,
      status
    }
  })
}

export function emotions(access_token) {
  return request_weibo({
    url: '/emotions.json',
    method: 'get',
    params: {
      access_token
    }
  })
}

export function rate_limit(access_token) {
  return request_weibo({
    url: '/account/rate_limit_status.json',
    method: 'get',
    params: {
      access_token
    }
  })
}