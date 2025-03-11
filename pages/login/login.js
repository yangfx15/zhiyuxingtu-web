Page({
  onLogin(e) {
    const { userInfo } = e.detail
    if (!userInfo) {
      wx.showToast({ title: '请完成微信授权', icon: 'none' })
      return
    }

    wx.login({
      success: res => {
        if (!res.code) {
          wx.showToast({ title: '获取登录凭证失败', icon: 'none' })
          return
        }

        wx.request({
          url: `${getApp().globalData.apiBase}/login`,
          method: 'POST',
          data: {
            code: res.code,
            nickname: userInfo.nickName,
            avatar_url: userInfo.avatarUrl
          },
          success: ({ statusCode, data }) => {
            if (statusCode === 200) {
              wx.setStorageSync('userInfo', data)
              wx.navigateBack()
            } else {
              wx.showToast({ title: data.error || '登录失败', icon: 'none' })
            }
          },
          fail: () => wx.showToast({ title: '网络异常', icon: 'none' })
        })
      }
    })
  }
})
