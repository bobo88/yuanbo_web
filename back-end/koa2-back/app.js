const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')

const index = require('./routes/index')
const blog = require('./routes/blog')
const comment = require('./routes/comment')
const user = require('./routes/user')

// 开启gzip压缩
const compress = require('koa-compress');
const options = { threshold: 2048 };
app.use(compress(options));

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(require('koa-static')(__dirname + '/public', {
  gzip: true
}))
app.use(logger())

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  // ctx 代表响应 ctx.compress = trus 代表允许压缩
  ctx.compress = true
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// session配置
app.keys = ['bobo_102288#']
app.use(session({
  // 配置cookie
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
  // // 配置 redis
  // store: redisStore({
  //   all: '127.0.0.1:6379'
  // })
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
app.use(comment.routes(), comment.allowedMethods())
app.use(user.routes(), user.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

// 注意端口设置为 3000，方便front-end文件夹中的前端代码设置跨域请求
app.listen(3000);

module.exports = app
