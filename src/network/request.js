import axios from 'axios'

export function request_login(config) {
  const instance = axios.create({
    baseURL: 'YOUR_SERVER_IP',
    // baseURL: 'https://api.weibo.com/oauth2',
    timeout: 5000
  })
  
  return instance(config)
}

export function request_weibo(config) {
  const instance = axios.create({
    baseURL: 'YOUR_SERVER_IP/api',
    timeout: 5000
  })

  return instance(config)
}

