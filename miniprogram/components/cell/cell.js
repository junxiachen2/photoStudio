const warn = (msg, getValue) => {
  console.warn(msg)
  console.log('接受到的值为：', getValue)
}
Component({
  options: {
    multipleSlots: true
  },
  relations: {
    '../cell-group/cell-group': {
      type: 'parent'
    }
  },
  properties: {
    // 左侧标题
    title: {
      type: String,
      value: ''
    },
    // 标题下方的描述信息
    label: {
      type: String,
      value: ''
    },
    // 右侧内容
    value: {
      type: String,
      value: ''
    },
    // 是否展示右侧箭头并支持跳转
    isLink: {
      type: Boolean,
      value: false
    },
    // 跳转类型: navigateTo，redirectTo，switchTab，reLaunch
    linkType: {
      type: String,
      value: 'navigateTo'
    },
    // 跳转链接
    url: {
      type: String,
      value: ''
    }
  },
  data: {
    isLastCell: false
  },
  methods: {
    tapCell(){
      const {isLink, url, linkType} = this.data
      const type = typeof isLink

      this.triggerEvent('tap')
      if (!isLink || !url)return
      if (type !== 'boolean' && type !== 'string') {
        warn(`isLink 必须是一个布尔值或者字符串`, isLink)
        return
      }
      if (['navigateTo', 'redirectTo', 'switchTab', 'reLaunch'].indexOf(linkType) === -1) {
        warn(`linkType 属性可选值为 navigateTo，redirectTo，switchTab，reLaunch`, linkType)
        return
      }

      wx[linkType].call(wx, {url})
    },
    setItLastCell(){
      this.setData({isLastCell: true})
    }
  }
})