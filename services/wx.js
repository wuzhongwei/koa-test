const axios = require('axios')
const fs = require('fs')
const {appId, appsecret} = require('../config/config')
const accessTokenPath = './accessToken.txt'

class WXManager {
  constructor() {
    this.tokenObj = {}
  }
  // 获取微信accessToken
  async getAccessToken() {
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appsecret}`
    let {data} = await axios.get(url)
    data.expires_in = Date.now() + (data.expires_in - 300) * 1000 // 提前5分钟过期
    console.log('data.expires_in', data.expires_in)
    return data
  }
  // 保存accessToken
 async saveAccessToken(data) {
    data = JSON.stringify(data)
    await fs.writeFileSync(accessTokenPath, data)
  }
  // 读取accessToken
  readAccessToken() {
    return new Promise((resolve, reject) => {
      fs.readFile(accessTokenPath, (err, data) => {
        if (!err) {
          data = JSON.parse(data)
          resolve(data)
        } else {
          reject('readAccessToken方法执行不存在此文件')
        }
      })
    })
  }


  // 检查token是否有效
  isValidAccessToken(data) {
    if (!data && !data.access_token && !data.expires_in) {
      return false
    }
    return data.expires_in < Date.now()
  }
  // 获取token是否有效
  async fetchAccessToken() {

    if (this.tokenObj.expires_in && this.tokenObj.access_token && !this.isValidAccessToken(this.tokenObj)) {
      return Promise.resolve(this.tokenObj)
    }

    try {
      const data = await this.readAccessToken()
      if (!this.isValidAccessToken(data)) { // token没有过期
        this.tokenObj = data
        return Promise.resolve(data)
      } else { // token过期
        const data = await this.getAccessToken()
        this.saveAccessToken(data)
      }
    } catch (error) {
      const data = await this.getAccessToken()
      this.saveAccessToken(data)
    }
    
  }
}


// const w = new WXManager()
// w.fetchAccessToken()
// setTimeout(()=> {
//   w.fetchAccessToken()
// }, 3000)
module.exports = {}