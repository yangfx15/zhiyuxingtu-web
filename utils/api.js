// Mock登录接口
export const mockLogin = () => {
  return new Promise((resolve) => {
    console.log("test1")
    setTimeout(() => {
      resolve({ userId: 1, userName: "测试用户" });
    }, 500);
  });
};

// Mock获取题目接口
export const mockGetQuestions = () => {
  return new Promise((resolve) => {
    console.log("test2")
    setTimeout(() => {
      resolve([
        { id: 1, question: "以下哪种排序算法的时间复杂度是O(n log n)?", options: ["冒泡排序", "快速排序", "选择排序"], answer: "快速排序" },
        { id: 2, question: "HTML是什么的缩写?", options: ["超文本标记语言", "高级文本语言", "超链接文本语言"], answer: "超文本标记语言" }
      ]);
    }, 500);
  });
};

// Mock提交测试接口
export const mockSubmitTest = (answers) => {
  return new Promise((resolve) => {
    console.log("test3")
    setTimeout(() => {
      resolve({ score: 80, report: "你的计算机水平超过全球70%的玩家！" });
    }, 500);
  });
};