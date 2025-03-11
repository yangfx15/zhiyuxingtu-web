// app.js
App({
  onLaunch() {
    console.log("小程序启动");
  },
  onShow() {
    console.log("小程序显示");
  },
  onHide() {
    console.log("小程序隐藏");
  },
  globalData: {
    apiBase: 'http://150.158.83.21:18080' // 替换为实际接口地址
  }
});