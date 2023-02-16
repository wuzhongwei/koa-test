const LoginType = {
  USER_MINI_PROGRAM: '100',// 小程序登录
  USER_EMAIL: '101', // 邮箱登录
  USER_MOBILE: '102', // 手机登录
}
const LoginTypeArr = []
for(let attr in LoginType) {
  LoginTypeArr.push(LoginType[attr] + '')
}

module.exports = { 
  LoginType,
  LoginTypeArr
}