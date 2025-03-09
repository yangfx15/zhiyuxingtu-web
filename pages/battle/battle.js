Page({
  data: {
    questions: [],
    answers: []
  },
  onLoad() {
    wx.request({
      url: 'http://localhost:18080/questions',
      method: 'GET',
      data: {
        category: '计算机',
        type: '前端'
      },
      success: (res) => {
        if (res.statusCode === 200) {
          this.setData({ questions: res.data });
        } else {
          wx.showToast({ title: '获取题目失败', icon: 'none' });
        }
      },
      fail: (err) => {
        wx.showToast({ title: '网络错误', icon: 'none' });
      }
    });
  },
  onAnswer(e) {
    const answers = this.data.answers;
    answers.push(e.detail.value);
    this.setData({ answers });
  },
  submitAnswers() {
    const userInfo = wx.getStorageSync('userInfo');
    wx.request({
      url: 'http://localhost:18080/submit-test',
      method: 'POST',
      data: {
        user_id: userInfo.id,
        category: '计算机',
        score: this.calculateScore()
      },
      success: (res) => {
        if (res.statusCode === 200) {
          wx.navigateTo({ url: '/pages/report/report' });
        } else {
          wx.showToast({ title: '提交失败', icon: 'none' });
        }
      },
      fail: (err) => {
        wx.showToast({ title: '网络错误', icon: 'none' });
      }
    });
  },
  calculateScore() {
    const { questions, answers } = this.data;
    let correctCount = 0;
    questions.forEach((q, i) => {
      if (q.answer === answers[i]) {
        correctCount++;
      }
    });
    return (correctCount / questions.length) * 100;
  }
});