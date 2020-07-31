import {request_login} from "./request"
import {weiboConst} from "common/const"

export function getAccessToken(code) {
  return request_login({
    method: 'post',
    url: '/access_token',
    data: {},
    params: {
      client_id: weiboConst.appKey,
      client_secret: weiboConst.appSecret,
      grant_type: 'authorization_code',
      redirect_uri: weiboConst.redirectUri,
      code
    }
  })
}

