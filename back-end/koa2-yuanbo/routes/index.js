const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  console.log(ctx)
  // await ctx.render('index', {
  //   title: 'Hello Koa 2!'
  // })
})

router.get('/404', async (ctx, next) => {
  ctx.body = '自定义404页面'
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
