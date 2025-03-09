Page({
  onLogin(e) {
    const { userInfo } = e.detail;
    if (userInfo) {
      // 获取 code
      wx.login({
        success: (res) => {
          if (res.code) {
            // 发送 code 和用户信息到后台
            wx.request({
              url: 'https://your-domain.com/login', // 替换为你的后台地址
              method: 'POST',
              data: {
                code: res.code, // 微信登录凭证
                nickname: userInfo.nickName, // 用户昵称
                avatar_url: userInfo.avatarUrl // 用户头像
              },
              success: (res) => {
                if (res.statusCode === 200) {
                  // 存储用户信息
                  wx.setStorageSync('userInfo', res.data);
                  wx.showToast({ title: '登录成功', icon: 'success' });
                  wx.navigateBack(); // 返回上一页
                } else {
                  wx.showToast({ title: '登录失败', icon: 'none' });
                }
              },
              fail: (err) => {
                wx.showToast({ title: '网络错误', icon: 'none' });
              }
            });
          } else {
            wx.showToast({ title: '获取 code 失败', icon: 'none' });
          }
        }
      });
    } else {
      wx.showToast({ title: '请授权登录', icon: 'none' });
    }
  }
});