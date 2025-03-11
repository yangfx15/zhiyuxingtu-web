Page({
  data: {
    questions: [], // 题目列表
    answers: {} // 用户答案，格式：{ questionId: answer }
  },

  onLoad(options) {
    const { category = '计算机', type = '后端' } = options;
    this.loadQuestions(category, type);
  },

  loadQuestions(category, type) {
    wx.request({
      url: `${getApp().globalData.apiBase}/questions`,
      method: 'GET',
      data: { category, type },
      success: ({ statusCode, data }) => {
        if (statusCode === 200) {
          const questions = data.map(q => ({
            ...q,
            options: q.options && q.options.trim() ? JSON.parse(q.options) : []
          }));
          this.setData({ questions });
        } else {
          wx.showToast({ title: '题目加载失败', icon: 'none' });
        }
      },
      fail: () => wx.showToast({ title: '网络异常', icon: 'none' })
    });
  },

  onAnswer(e) {
    const questionId = e.currentTarget.dataset.id; // 获取问题 ID
    const answer = e.detail.value; // 获取用户选择的答案
    console.log(`Question ID: ${questionId}, Answer: ${answer}`);
    const answers = { ...this.data.answers, [questionId]: answer }; // 更新答案
    this.setData({ answers });
  },

  submitTest() {
    const { questions, answers } = this.data;

    // 构造提交数据
    const results = questions.map(q => ({
      id: q.id, // 问题 ID
      answer: answers[q.id] || '' // 用户答案，未答题则为空字符串
    }));

    wx.request({
      url: `${getApp().globalData.apiBase}/submit-test`,
      method: 'POST',
      data: { results },
      success: ({ statusCode, data }) => {
        if (statusCode === 200) {
          // 跳转到报告页面，传递成绩和段位
          wx.navigateTo({
            url: `/pages/report/report?score=${data.data.score}`
          });
        } else {
          wx.showToast({ title: data.error || '提交失败', icon: 'none' });
        }
      },
      fail: () => wx.showToast({ title: '网络异常', icon: 'none' })
    });
  }
});