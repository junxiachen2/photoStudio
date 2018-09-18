import regeneratorRuntime from '../../utils/runtime'
import wxPromise from '../../service/wxPromise'
import { formatTime } from '../../utils/util'
const db = wx.cloud.database()

Page({
  data: {
    list: null
  },
  onLoad () {
    this.getOrders()
  },
  async getOrders () {
    const res = await db.collection('order')
      .orderBy('createTime', 'desc')
      .get()
    console.log(res)
    for (let i = 0; i < res.data.length; i++) {
      res.data[i].createTime = formatTime(new Date(res.data[i].createTime))
    }
    this.setData({ list: res.data })
  },
  async saveHandler (e) {
    const { url } = e.target.dataset
    if (url) {
      // 获得图片临时链接
      const temp = await wx.cloud.downloadFile({
        fileID: url
      })
      if (!temp.tempFilePath) {
        wxPromise.showModal({ content: temp.errMsg })
        return
      }
      wx.saveImageToPhotosAlbum({
        filePath: temp.tempFilePath,
        success () {
          wx.showToast({ title: '保存成功' })
        },
        fail (e) {
          wxPromise.showModal({ content: e.errMsg })
        }
      })
    }
    else {
      wxPromise.showModal({
        content: '图片出错了，请重试或联系客服'
      })
    }
  }
})
