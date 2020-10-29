const router = require('koa-router')()
// addComment, updateComment, delComment
const { getListById, addComment } = require('../controller/comment')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/comment')

router.get('/list', async function (ctx, next) {
  const data = await getListById(ctx.query.id)
  ctx.body = new SuccessModel(data)
})

router.post('/add', async function (ctx, next) {
  const body = ctx.request.body
  // body.blogID = ctx.query.blogID
  const data = await addComment(body)
  ctx.body = new SuccessModel(data)
})

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
