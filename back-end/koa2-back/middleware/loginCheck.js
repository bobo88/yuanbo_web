const { ErrorModel } = require('../model/resModel')
const jwt = require("jsonwebtoken");
let { SECRET_KEY } = require("../utils/secret");

module.exports = async (ctx, next) => {
  let url = ctx.request.url;
  // 登录 不用检查
  if (url == "/api/login") {
    await next();
  } else {
    // 规定token写在header 的 'X-Auth-Value' 
    let auth = ctx.get("X-Auth-Value");
    const token = auth.split(' ')[0]
    console.log(22222, token)
    try {
      // 解码
      let payload = jwt.verify(token, SECRET_KEY);
      let { time, timeout } = payload;
      let data = new Date().getTime();
      if (data - time <= timeout) {
        // 未过期
        await next();
      } else {
        // 过期
        ctx.body = new ErrorModel('token 已过期')
      }
    } catch (err) {
      // ctx.throw(401, err)
      // 已失效
      ctx.body = new ErrorModel('token 已失效')
    }
  }
}


