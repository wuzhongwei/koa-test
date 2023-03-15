const axios = require('axios')
const fs = require('fs')
const {appId, appsecret, gzhAppid, gzhSecret} = require('../config/config')
const menu = require('./menu')
const accessTokenPath = './accessToken.txt'
const xcxTokenPath = './xcxToken.txt'

class WXManager {
  constructor(obj) {
    this.tokenObj = {}
    this.gzhTokenObj = {}
    this.options = obj || {}
  }
  // 获取微信accessToken
  async getAccessToken(appId, appsecret) {
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appsecret}`
    let {data} = await axios.get(url)
    data.expires_in = Date.now() + (data.expires_in - 300) * 1000 // 提前5分钟过期
    return data
  }
  // 保存accessToken
 async saveAccessToken(data, tokenFile) {
    data = JSON.stringify(data)
    await fs.writeFileSync(tokenFile, data)
  }
  // 读取accessToken
  readAccessToken(tokenFile) {
    return new Promise((resolve, reject) => {
      fs.readFile(tokenFile, (err, data) => {
        if (!err) {
          data = JSON.parse(data)
          resolve(data)
        } else {
          reject('readAccessToken方法执行不存在此文件')
        }
      })
    })
  }

  async init() {
    this.gzhTokenObj = await this.fetchAccessToken(gzhAppid, gzhSecret, accessTokenPath, this.gzhTokenObj) // 公众号
    this.tokenObj = await this.fetchAccessToken(appId, appsecret, xcxTokenPath, this.tokenObj) // 小程序
  }


  // 检查token是否有效
  isValidAccessToken(data) {
    if (!data && !data.access_token && !data.expires_in) {
      return false
    }
    return data.expires_in < Date.now()
  }
  // 获取没有过期的token
  async fetchAccessToken(appId, appsecret, tokenFile, tokenObj) {
    if (tokenObj.expires_in && tokenObj.access_token && !this.isValidAccessToken(tokenObj)) {
      return tokenObj
    }

    try {
      const data = await this.readAccessToken(tokenFile)
      if (!this.isValidAccessToken(data)) { // token没有过期
        console.log(`没过期${tokenFile}`, data)
        return data
      } else { // token过期
        console.log(`已过期${tokenFile}`)
        const data = await this.getAccessToken(appId, appsecret)
        this.saveAccessToken(data, tokenFile)
        return data
      }
    } catch (error) {
      const data = await this.getAccessToken(appId, appsecret)
      this.saveAccessToken(data, tokenFile)
      return data
    }
    
  }

  async createMenu(menu) {
    const url = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${this.gzhTokenObj.access_token}`
    let {data} = await axios.post(url, menu)
    console.log('createMenu', data)
  }

  async deleteMenu() {
    const url = `https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=${this.gzhTokenObj.access_token}`
    let {data} = await axios.get(url)
    console.log('deleteMenu', data)
  }
  // 设置行业
  async api_set_industry() {
    const url = `https://api.weixin.qq.com/cgi-bin/template/api_set_industry?access_token=${this.gzhTokenObj.access_token}`
    let {data} = await axios.post(url, {
      "industry_id1":"1",
      "industry_id2":"2"
    })
    console.log('setTrade', data, this.gzhTokenObj.access_token)
  }
  // 获取行业
  async get_industry() {
    const url = `https://api.weixin.qq.com/cgi-bin/template/get_industry?access_token=${this.gzhTokenObj.access_token}`
    let {data} = await axios.get(url)
    console.log('getTrade', data, this.gzhTokenObj.access_token)
  }
  // 获得模板列表
  async get_all_private_template() {
    const url = `https://api.weixin.qq.com/cgi-bin/template/get_all_private_template?access_token=${this.gzhTokenObj.access_token}`
    let {data} = await axios.get(url)
    console.log('get_all_private_template', data)
  }
  // 获得模板ID
  async api_add_template() {
    const url = `https://api.weixin.qq.com/cgi-bin/template/api_add_template?access_token=${this.gzhTokenObj.access_token}`
    let {data} = await axios.post(url, {
      "template_id_short": "OPENTM202419051"
    })
    console.log('api_add_template', data)
  }

  // 发送模板消息
  async send() {
    const url = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${this.gzhTokenObj.access_token}`
    let {data} = await axios.post(url, {
      "touser":"ol10m49BbAFKWyLsiSPvwbK0AP2c",
      "template_id":"KzeOlc84iyLhEdcyshYy_NdcBwI-GMc6celU_HluCVQ",
      "url":"http://weixin.qq.com/download",
      "data":{
              "first": {
                  "value":"恭喜你购买成功！",
                  "color":"#173177"
              },
              "keyword1":{
                  "value":"巧克力",
                  "color":"#173177"
              },
              "keyword2": {
                  "value":"39.8元",
                  "color":"#173177"
              },
              "keyword3": {
                  "value":"2014年9月22日",
                  "color":"#173177"
              },
              "remark":{
                  "value":"欢迎再次购买！",
                  "color":"#173177"
              }
      }
    })
    console.log('send', data)
  }
}


(async function() {
  const w = new WXManager()
  await w.init()
  await w.send()
})()

module.exports = WXManager