const router = require('koa-router')()
const { logIn, logOut } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')
const jwt = require('jsonwebtoken')

let { SECRET_KEY } = require("../utils/secret");

router.prefix('/api')

// 登录
router.post('/login', async function (ctx, next) {
  const body = ctx.request.body
  if (!body.username || !body.password) {
    ctx.body = new ErrorModel('字段缺失')
  } else {
    const data = await logIn(body)
    // console.log(5858588, data, data.username, data.realname)
    if (data.username) {
      // console.log(jwt, 11111)
      let payload = {time:new Date().getTime(), timeout: 1000*60*60*2}
      const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '7d'})
      data.token = token
      // 设置session
      ctx.session.username = data.username
      ctx.session.realname = data.realname
      ctx.body = new SuccessModel(data)
      return
    }
    ctx.body = new ErrorModel('登录失败')
  }

})
// 退出登录
router.post('/logout', async function (ctx, next) {
  const body = ctx.request.body
  const data = await logOut(body)
  ctx.session = null
  ctx.body = new SuccessModel(data)
})

module.exports = router
