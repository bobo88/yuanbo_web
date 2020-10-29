<template>
  <div class="container-cont clearfix">
    <div class="lbox">
      <div class="content-box bgcolorF">
        <div class="mb30">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人博客</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <!-- 博客列表 -->
        <el-timeline>
          <el-timeline-item
            v-for="(blogItem, index) in activities"
            :key="index"
            :timestamp="blogItem.timestamp">
            <nuxt-link class="article-item" :to="'/blog/one/' + blogItem.id">{{ blogItem.content }}</nuxt-link>
            <!-- <a :href="'/blog/' + blogItem.id" class="article-item">{{ blogItem.content }}</a> -->
          </el-timeline-item>
        </el-timeline>

        <!-- 分页 -->
        <el-pagination
          background
          :pager-count="5"
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
    </div>

    <div class="rbox">
      <!-- 点击排行 -->
      <ranking />
    </div>
  </div>
</template>

<script>
import Ranking from '~/components/home/Ranking'
export default {
  components: {
    Ranking
  },
  data () {
    return {
      blogList: [],
      activities: [
        {
          content: '博客标题CCCCC',
          id: 1,
          timestamp: '2018-04-11'
        }
      ]
    }
  },
  computed: {},
  created () {
    // 获取博客列表
    this.getBlogList()
  },
  mounted () {
    // xx
  },
  methods: {
    getBlogList () {
      this.$axios.get('/api/blog/list?type=1').then((res) => {
        console.log(res)
        if (res.data) {}
        this.blogList = res
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .article-item {
    font-size: 15px;
    &:hover {
      color: #409eff;
    }
  }
</style>
