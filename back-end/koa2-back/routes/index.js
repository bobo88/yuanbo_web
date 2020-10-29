const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json22'
  }
})
// router.get('/api/blog/list', async (ctx, next) => {
//   ctx.body = {
//     title: 'blog list 22222'
//   }
// })

module.exports = router
