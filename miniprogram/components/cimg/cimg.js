Component({
  properties: {
    url: {
      type: String,
      value: '',
      observer (newVal, oldVal) {
        if (newVal && newVal !== oldVal) {
          const { placehold } = this.data
          this.setData({ ph: placehold })
        }
        let validUrl = ''
        if (newVal && !newVal.match('null') && !newVal.match('undefined')) {
          validUrl = newVal
        }
        this.setData({ validUrl })
      }
    },
    placehold: {
      type: String,
      value: '',
      observer (newVal) {
        if (newVal) {
          this.setData({ ph: newVal })
        }
      }
    },
    errImg: {
      type: String,
      value: ''
    },
    mode: {
      type: String,
      value: 'widthFix'
    },
    preview: {
      type: Boolean,
      value: false
    }
  },
  data: {
    ph: '',
    validUrl: ''
  },
  methods: {
    imgLoadedHandler (e) {
      const { url } = this.data
      this.setData({ ph: url })
      this.triggerEvent('imgloaded', e)
    },
    imgErrorHandler (e) {
      const { errImg } = this.data
      this.setData({ ph: errImg })
      this.triggerEvent('imgerror', e)
    },
    imgTapHandler () {
      const { validUrl, preview } = this.data
      if (validUrl && preview) {
        wx.previewImage({
          urls: [validUrl]
        })
      }
    }
  }
})
