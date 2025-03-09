Page({
  data: {
    score: 0,
    rank: '青铜'
  },
  onLoad() {
    const userInfo = wx.getStorageSync('userInfo');
    wx.request({
      url: 'http://localhost:18080/submit-test',
      method: 'POST',
      data: {
        user_id: userInfo.id,
        category: '计算机',
        score: this.data.score
      },
      success: (res) => {
        if (res.statusCode === 200) {
          this.setData({ score: res.data.score, rank: this.calculateRank(res.data.score) });
        } else {
          wx.showToast({ title: '获取报告失败', icon: 'none' });
        }
      },
      fail: (err) => {
        wx.showToast({ title: '网络错误', icon: 'none' });
      }
    });
  },
  calculateRank(score) {
    console.log("成绩：", score)
    if (score < 60) return '青铜';
    if (score < 70) return '白银';
    if (score < 80) return '黄金';
    if (score < 90) return '钻石';
    return '王者';
  }
});