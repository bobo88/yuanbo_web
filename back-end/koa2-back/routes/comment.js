const router = require('koa-router')()
const { getListById, getListByPage, addComment, editComment, deleteComment } = require('../controller/comment')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/comment')

// 根据ID查询 评论列表
router.get('/list', async function (ctx, next) {
  const data = await getListById(ctx.query.id)
  ctx.body = new SuccessModel(data)
})
// 分页查询所有 评论列表
router.post('/list', async function (ctx, next) {
  const body = ctx.request.body
  if (!body.pageIndex) {
    ctx.body = new ErrorModel('字段缺失')
  } else {
    const data = await getListByPage(body)
    ctx.body = new SuccessModel(data)
  }
})
// 添加评论
router.post('/add', async function (ctx, next) {
  const body = ctx.request.body
  if (!body.blogId || !body.content) {
    ctx.body = new ErrorModel('字段缺失')
  } else {
    const data = await addComment(body)
    ctx.body = new SuccessModel(data)
  }
})
// 编辑评论
router.post('/edit', loginCheck, async function (ctx, next) {
  const body = ctx.request.body
  if (!body.id || !body.blogId || !body.content) {
    ctx.body = new ErrorModel('字段缺失')
  } else {
    const data = await editComment(body)
    if (data) {
      ctx.body = new SuccessModel(data)
    } else {
      ctx.body = new ErrorModel('编辑评论失败')
    }
  }
})
// 删除评论
router.post('/delete', loginCheck, async function (ctx, next) {
  const body = ctx.request.body
  let { id = ''} = body
  if (!body.id) {
    ctx.body = new ErrorModel('字段缺失')
  } else {
    const data = await deleteComment(id)
    if (data) {
      ctx.body = new SuccessModel(data)
    } else {
      ctx.body = new ErrorModel('删除评论失败')
    }
  }
})

module.exports = router
