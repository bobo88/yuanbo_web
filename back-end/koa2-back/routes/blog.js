const router = require('koa-router')()
// newBlog, updateBlog, delBlog
const { blogList, getDetail, rankList, getTopicList } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
// const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

// 1、API：-- 博客列表接口
router.post('/list', async function (ctx, next) {
  const body = ctx.request.body
  let { type = '', pageIndex = '' } = body
  // if (ctx.query.isadmin) {
  //   // 管理员界面
  //   if (ctx.session.username === null) {
  //     // 未登录
  //     ctx.body = new ErrorModel('未登录')
  //     return
  //   }
  //   // 强制查询自己的博客
  //   author = ctx.session.username
  // }
  const listData = await blogList(type, pageIndex)
  ctx.body = new SuccessModel(listData)
})

// 2、API：-- 博客详情接口
router.get('/detail', async function (ctx, next) {
  const data = await getDetail(ctx.query.id)
  ctx.body = new SuccessModel(data)
})

// 3、API：-- 博客排名列表接口
router.post('/rank', async function (ctx, next) {
  const body = ctx.request.body
  let { type = ''} = body
  const listData = await rankList(type)
  ctx.body = new SuccessModel(listData)
})

// 4、API：-- 博客专题列表接口
router.get('/topic', async function (ctx, next) {
  const data = await getTopicList()
  ctx.body = new SuccessModel(data)
})

// router.post('/new', loginCheck, async function (ctx, next) {
//   const body = ctx.request.body
//   body.author = ctx.session.username
//   const data = await newBlog(body)
//   ctx.body = new SuccessModel(data)
// })

// router.post('/update', loginCheck, async function (ctx, next) {
//   const val = await updateBlog(ctx.query.id, ctx.request.body)
//   if (val) {
//     ctx.body = new SuccessModel()
//   } else {
//     ctx.body = new ErrorModel('更新博客失败')
//   }
// })

// router.post('/del', loginCheck, async function (ctx, next) {
//   const author = ctx.session.username
//   const data = await delBlog(ctx.query.id, author)
//   if (val) {
//     ctx.body = new SuccessModel()
//   } else {
//     ctx.body = new ErrorModel('删除博客失败')
//   }
// })

module.exports = router
