// app.js
App({
  onLaunch () {
    wx.cloud.init({
      env: 'test-ef209b',
      traceUser: true
    })
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      const openId = res.result.openid
      this.globalData.openId = openId
      if (this.globalData.openIdCallback) {
        this.globalData.openIdCallback()
      }
    })
  },
  onError (e) {
    console.log(e)
  },
  globalData: {
    openId: null
  }
})
