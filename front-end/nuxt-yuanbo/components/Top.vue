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
            <el-menu-item v-for="(item, index) in topicList" :key="index" :index="'/topic/' + item.id">{{ item.title }}</el-menu-item>
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
      topicList: []
    }
  },
  computed: {},
  created () {
    // 获取博客专题名称列表
    this.getTopicTypeList()
  },
  mounted () {
    // xx
  },
  methods: {
    handleSelect () {},
    getTopicTypeList () {
      this.$axios.get('/api/blog/topic').then((res) => {
        console.log('/api/blog/topic: --->', res)
        const resData = res.data
        if (resData && resData.code === 0) {
          const resDataData = resData.data
          if (resDataData.list && resDataData.list.length > 0) {
            this.topicList = resDataData.list || []
          } else {
            this.topicList = []
          }
        }
      })
    }
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
