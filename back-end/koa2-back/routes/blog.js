const router = require('koa-router')()
const { blogList, getDetail, addBlog, updateBlog, deleteBlog, rankList, getTopicList, addTopicType, editTopicType, deleteTopicType } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
// const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

//--------------------------------- BLOG -------------------------------------------------------------
// 1、API：-- 博客列表接口
router.post('/list', async function (ctx, next) {
  const body = ctx.request.body
  let { typeId = '', pageIndex = '', topicId = '' } = body
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
  const listData = await blogList(typeId, pageIndex, topicId)
  ctx.body = new SuccessModel(listData)
})

// 2、API：-- 博客详情接口
router.get('/detail', async function (ctx, next) {
  const data = await getDetail(ctx.query.id)
  ctx.body = new SuccessModel(data)
})

// loginCheck
router.post('/add', async function (ctx, next) {
  const body = ctx.request.body
  // body.author = ctx.session.username
  if (!body.title || !body.content || !body.brief || !body.typeId || (body.typeId === 3 && !body.topicId)) {
    ctx.body = new ErrorModel('字段缺失')
  } else {
    const data = await addBlog(body)
    if (data) {
      ctx.body = new SuccessModel(data)
    } else {
      ctx.body = new ErrorModel('添加博客失败')
    }
  }
})

router.post('/edit', async function (ctx, next) {
  const body = ctx.request.body
  // body.author = ctx.session.username
  if (!body.id || !body.title || !body.content || !body.brief || !body.typeId || (body.typeId === 3 && !body.topicId)) {
    ctx.body = new ErrorModel('字段缺失')
  } else {
    const data = await updateBlog(body)
    if (data) {
      ctx.body = new SuccessModel(data)
    } else {
      ctx.body = new ErrorModel('更新博客失败')
    }
  }
})

router.post('/delete', async function (ctx, next) {
  const body = ctx.request.body
  let { id = ''} = body
  if (!body.id) {
    ctx.body = new ErrorModel('字段缺失')
  } else {
    const data = await deleteBlog(id)
    if (data) {
      ctx.body = new SuccessModel(data)
    } else {
      ctx.body = new ErrorModel('删除博客失败')
    }
  }
})

//--------------------------------- RANK -------------------------------------------------------------
// 3、API：-- 博客排名列表接口
router.post('/rank', async function (ctx, next) {
  const body = ctx.request.body
  let { type = ''} = body
  const listData = await rankList(type)
  ctx.body = new SuccessModel(listData)
})

//--------------------------------- TOPIC-TYPE -------------------------------------------------------------
// 4、API：-- 博客专题列表接口
router.get('/topic/list', async function (ctx, next) {
  const data = await getTopicList()
  ctx.body = new SuccessModel(data)
})
// 5、API：-- Add 专题分类接口
router.post('/topic/add', async function (ctx, next) {
  const body = ctx.request.body
  if (!body.title || !body.description) {
    ctx.body = new ErrorModel('字段缺失')
  } else {
    const data = await addTopicType(body)
    ctx.body = new SuccessModel(data)
  }
})
// 6、API：-- edit 专题分类接口
router.post('/topic/edit', async function (ctx, next) {
  const body = ctx.request.body
  if (!body.id || !body.title || !body.description) {
    ctx.body = new ErrorModel('字段缺失')
  } else {
    const data = await editTopicType(body)
    ctx.body = new SuccessModel(data)
  }
})
// 7、API：-- delete 专题分类接口
router.post('/topic/delete', async function (ctx, next) {
  const body = ctx.request.body
  let { id = ''} = body
  if (!body.id) {
    ctx.body = new ErrorModel('字段缺失')
  } else {
    const data = await deleteTopicType(id)
    ctx.body = new SuccessModel(data)
  }
})

module.exports = router
