import {timeArray, emotions} from "./const"
import {user_show} from "network/weibo"

export function debounce(func, delay) {
  let timer = null
  console.log('debounce')

  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export function weiboDate(time, withHourAndMinite=false) {
  const newDate = time.split(' ')

  const nowDate = new Date()
  const year = nowDate.getFullYear()
  const month = nowDate.getMonth()
  const date = nowDate.getDate()
  const day = nowDate.getDay()
  const hour = nowDate.getHours()
  const minute = nowDate.getMinutes()

  const weiboMonth = timeArray.month.findIndex(element => element === newDate[1])

  if (year === parseInt(newDate[5])) {
    if (month === weiboMonth) {
      if (date === parseInt(newDate[2])) {
        return exactTime(hour, minute, newDate[3], false)
      } else if (date === parseInt(newDate[2]) + 1) {
        return exactTime(hour, minute, newDate[3], true)
      } else {
        return withHourAndMinite ? (weiboMonth + 1) + '-' + newDate[2] + ' ' + newDate[3].substring(0, 5) : (weiboMonth + 1) + '-' + newDate[2]
      }
    } else {
      return withHourAndMinite ? (weiboMonth + 1) + '-' + newDate[2] + ' ' + newDate[3].substring(0, 5) : (weiboMonth + 1) + '-' + newDate[2]

    }
  } else {
    return newDate[5].substring(2) + '-' + (weiboMonth + 1) + '-' + newDate[2]
  }

}

function exactTime(hour, minute, time, isYesterday) {
  if (isYesterday) {
    return '昨天 ' + time.substring(0, 5)
  } else {
    const split_time = time.split(':')
    if (hour === parseInt(split_time[0])) {
      if (minute === parseInt(split_time[1])) {
        return '刚刚'
      } else {
        return (minute - split_time[1]) + '分钟前'
      }
    } else {
      return (hour - split_time[0]) + '小时前'
    }
  }
}

export function textParse(text) {
  let plainText = normalUrl(text)
  plainText = weiboEmotionParse(plainText)
  plainText = weiboAtParse(plainText)

  return plainText
}

export function weiboUrlParse(weibo) {
  //initialize
  let fullContentParse = {
    plainText: weibo.text
  }

  if (weibo.isLongText)  fullContentParse = weiboFullContentUrl(weibo.text)
  // const videoParse = weiboVideoUrl(fullContentParse.plainText)
  let plainText = normalUrl(fullContentParse.plainText)
  if (weibo.isLongText) {
    plainText = plainText.substring(0, plainText.length - 6) +
      '<a href="' + fullContentParse.fullContentUrl + '">全文</a>'
  }
  plainText = weiboEmotionParse(plainText)
  plainText = weiboAtParse(plainText)

  return plainText

}

function weiboVideoUrl(text) {
  const reg = /http:\/\/t\.cn\/[0-9a-zA-Z]{8}/g
  const videoUrl = reg.exec(text)
  return {
    plainText: text.replace(reg, ''),
    videoUrl
  }
}

function weiboFullContentUrl(text) {
  // console.log(text)
  const reg = /http:\/\/m\.weibo\.cn\/[0-9]{10}\/[0-9]{16}/
  const fullContentUrl = reg.exec(text)
  return {
    plainText: text.replace(reg, ''),
    fullContentUrl
  }
}

function normalUrl(text) {
  const reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g
  return text.replace(reg, url => '<i class="icon"></i>' + '<a href="' + url + '">网页链接</a>')
}

function weiboEmotionParse(text) {
  const reg = /\[[\u4e00-\u9fa50-9a-zA-Z]+\]/g
  return text.replace(reg, emo => '<img src="' + emotions[emo] + '" alt=""/>')
}

function weiboAtParse(text) {
  const reg = /@[\u4e00-\u9fa50-9a-zA-Z_]+([ :）)]|(\\n)|(\n)|$)/g
  const reg_name = /[\u4e00-\u9fa50-9a-zA-Z_]+/
  return text.replace(reg, atName => {
    const userName = reg_name.exec(atName)[0]
    const compensate = 0 - (atName.length - userName.length - 1)
    return '<a href="/user?screen_name=' + userName + '">@' + userName + '</a>' + (compensate === 0 ? '' : atName.slice(compensate))
  })
}