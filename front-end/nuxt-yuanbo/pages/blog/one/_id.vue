<template>
  <div class="container-cont clearfix">
    <div class="lbox">
      <div class="content-box bgcolorF">
        <div class="mb30">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/blog-list' }">个人博客</el-breadcrumb-item>
            <el-breadcrumb-item>文章详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <!-- ArticleComp -->
        <article-comp />
        <!-- CommentComp -->
        <comment-comp />
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
import ArticleComp from '~/components/blog/ArticleComp'
import CommentComp from '~/components/blog/CommentComp'
export default {
  validate ({ params }) {
    // 必须是number类型
    return /^\d+$/.test(params.id)
  },
  components: {
    Ranking,
    ArticleComp,
    CommentComp
  },
  data () {
    return {
      // xx
    }
  },
  computed: {},
  created () {
    // xx
  },
  mounted () {
    // xx
  },
  methods: {}
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
