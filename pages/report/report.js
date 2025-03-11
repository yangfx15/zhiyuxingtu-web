Page({
  data: {
    score: 0, // 成绩
    rank: '青铜' // 段位
  },

  onLoad(options) {
    const score = Number(options.score) || 0; // 从 URL 参数获取成绩
    const rank = this.calculateRank(score); // 计算段位
    this.setData({ score, rank });
  },

  calculateRank(score) {
    if (score >= 90) return '王者';
    if (score >= 80) return '钻石';
    if (score >= 70) return '黄金';
    if (score >= 60) return '白银';
    return '青铜';
  },

  retryTest() {
    wx.navigateBack(); // 返回上一页重新测试
  }
});