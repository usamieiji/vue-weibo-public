export default {
  saveToken(context, payload) {
    return new Promise((resolve, reject) => {
      context.commit('getToken', payload)
      resolve('登录成功')
    })
  }
}