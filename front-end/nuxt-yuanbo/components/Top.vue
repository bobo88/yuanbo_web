<template>
  <header id="header">
    <div class="navbox clearfix">
      <div class="logo fl">
        <nuxt-link class="home" to="/">袁波个人博客<span>|</span><small>WEB前端</small></nuxt-link>
      </div>

      <div class="nav-list fl">
        <nuxt-link class="nav-item" to="/">首页</nuxt-link>
        <nuxt-link class="nav-item" to="/test">Test</nuxt-link>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
  #header {
    width: 100%;
    padding: 5px 0;
    background: #1C2327;
    height: 60px;
    .navbox {
      margin: 0 auto;
      width: 1200px;
      line-height: 50px;
    }
    .logo {
      display: inline-block;
      margin-right: 60px;
      height: 50px;
      line-height: 50px;
      color: #fff;
      font-size: 22px;
      .home {
        color: #fff;
        span {
          display: inline-block;
          margin: 0 10px;
        }
        small {
          font-size: 16px;
        }
      }
    }
    .nav-list {
      display: inline-block;
      .nav-item {
        display: inline-block;
        padding: 0 15px;
        height: 50px;
        line-height: 50px;
        color: #fff;
        font-size: 15px;
      }
    }
  }
</style>
