Page({
  onLoad() {
    console.log("首页加载");
  },
  onShow() {
    console.log("首页显示");
  },
  goToLogin() {
    console.log("跳转到登录页");
    wx.navigateTo({ url: "/pages/login/login" });
  },
  goToBattle() {
    console.log("跳转到对战页");
    wx.navigateTo({ url: "/pages/battle/battle" });
  },
  goToTest() {
    console.log("跳转到测试页");
    wx.navigateTo({ url: "/pages/test/test" });
  }
});