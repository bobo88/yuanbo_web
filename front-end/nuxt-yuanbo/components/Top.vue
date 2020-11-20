<template>
  <header id="header">
    <div class="navbox clearfix">
      <div class="logo fl">
        <nuxt-link class="home" to="/">
          袁波个人博客
          <span>|</span>
          <small>WEB前端</small>
        </nuxt-link>
      </div>

      <div class="nav-list fl">
        <el-menu :default-active="this.$route.path" :router="true" class="el-menu-bobo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/blog-list">个人博客</el-menu-item>
          <el-menu-item index="/program-life">程序人生</el-menu-item>
          <el-submenu index="/topic">
            <template slot="title">专题版块</template>
            <el-menu-item index="/topic/1">Vue源码</el-menu-item>
            <el-menu-item index="/topic/2">React源码</el-menu-item>
            <el-menu-item index="/topic/3">设计模式</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data () {
    return {
      xx: ''
    }
  },
  computed: {},
  created () {
    // xx
  },
  mounted () {
    // xx
  },
  methods: {
    handleSelect () {}
  }
}
</script>

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
