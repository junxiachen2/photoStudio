import regeneratorRuntime from '../../utils/runtime'
import wxPromise from '../../service/wxPromise'
import { formatTimeYmd } from '../../utils/util'
// index.js
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {

  },
  onLoad () {
    this.isLoading = false
  },
  async uploadHandler () {
    if (this.isLoading) return
    this.isLoading = true
    const res = await wxPromise.chooseImage({
      count: 1,
      sizeType: ['original']
    })
    if (!res) {
      this.isLoading = false
      return
    }
    wx.showLoading({ title: '加载中...' })
    const filePath = res.tempFilePaths[0]
    const date = new Date()
    const name = JSON.stringify(Math.random()).substr(2)
    const format = filePath.match(/\.[^.]+?$/)[0]
    const cloudPath = `certs/${formatTimeYmd(date)}/img-${name + format}`
    const upload = await wx.cloud.uploadFile({
      cloudPath,
      filePath
    })
    console.log(upload)
    if (upload.fileID) {
      const dbRes = await db.collection('order')
        .add({
          data: {
            type: 0,
            cloudPath: upload.fileID,
            status: 0,
            certPath: '',
            note: '',
            createTime: (new Date()).getTime()
          }
        })
      console.log(dbRes)
      wx.hideLoading()
    }
    else {
      wx.showToast({ title: '上传失败', icon: 'none' })
    }
    this.isLoading = false
  },
  onShareAppMessage () {
    return {
      title: '可骄傲了'
    }
  }
})
