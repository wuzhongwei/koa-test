const axios = require('axios')
const fs = require('fs')
const {appId, appsecret} = require('../config/config')
const menu = require('./menu')
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
  // 获取没有过期的token
  async fetchAccessToken() {
    if (this.tokenObj.expires_in && this.tokenObj.access_token && !this.isValidAccessToken(this.tokenObj)) {
      return Promise.resolve(this.tokenObj)
    }

    try {
      const data = await this.readAccessToken()
      if (!this.isValidAccessToken(data)) { // token没有过期
        console.log('没过期', data)
        this.tokenObj = data
        return Promise.resolve(data)
      } else { // token过期
        console.log('已过期')
        const data = await this.getAccessToken()
        this.tokenObj = data
        this.saveAccessToken(data)
      }
    } catch (error) {
      const data = await this.getAccessToken()
      this.tokenObj = data
      this.saveAccessToken(data)
    }
    
  }

  async createMenu(menu) {
    const url = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${this.tokenObj.access_token}`
    let {data} = await axios.post(url, menu)
    console.log('createMenu', data)
  }

  async deleteMenu() {
    const url = `http请求方式：GET https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=${this.tokenObj.access_toke}`
    let {data} = await axios.get(url)
    console.log('deleteMenu', data)
  }
}


// (async function() { 创建微信菜单
//   const w = new WXManager()
//   await w.fetchAccessToken()
//   await w.deleteMenu()
//   await w.createMenu(menu)
// })()

module.exports = WXManager