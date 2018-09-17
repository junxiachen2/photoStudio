import regeneratorRuntime from '../../utils/runtime'
import wxPromise from '../../service/wxPromise'

const app = getApp()
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
    await wx.cloud.callFunction({
      name: 'register',
      data: {
        user: userInfo
      }
    })
  }

})
