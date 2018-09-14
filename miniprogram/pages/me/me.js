import regeneratorRuntime from '../../utils/runtime'
import wxPromise from '../../service/wxPromise'

// const app = getApp()
Page({
  data: {
    userInfo: null
  },
  onLoad () {
    this.getUserInfo()
  },
  async getUserInfo () {
    const userInfoAuth = await wxPromise.getAuthorize('scope.userInfo')
    if (userInfoAuth) {
      const info = await wxPromise.getUserInfo()
      const { userInfo } = info
      this.setData({ userInfo })
    }
  },
  async getUserInfoHandler (e) {
    const { userInfo } = e.detail
    if (!userInfo) {
      wx.showToast({ title: '授权失败', icon: 'none' })
      return
    }
    // this.setData({ userInfo })
    // 1. _id
    // 2. openid
    // 3. nickName
    // 4. avatarUrl
    // 5. gender
    // 6. city
    // 7. Province
    // 8. country
    console.log(userInfo)
    try {
      const res = await wx.cloud.callFunction({
        name: 'register',
        data: {
          user: userInfo
        }
      })
      console.log(res)
    }
    catch (e) {
      console.log(e)
    }
  }

})
