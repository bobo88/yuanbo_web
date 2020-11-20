<template>
  <div class="container-cont clearfix">
    <div class="lbox">
      <div class="content-box bgcolorF">
        <div class="mb30">
          <!-- {{ $nuxt.$route.params.id }} -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/blog-list' }">个人博客</el-breadcrumb-item>
            <el-breadcrumb-item>文章详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <!-- ArticleComp -->
        <article-comp :data-detail="blogDetailObj" />
        <!-- CommentComp -->
        <comment-comp :data-detail="blogDetailObj" />
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
      blogDetailObj: {}
    }
  },
  computed: {},
  created () {
    // 获取博客详情
    this.getBlogDetail()
  },
  mounted () {
    // xx
  },
  methods: {
    getBlogDetail () {
      /**
       * author: "zhangsan"
        content: "内容B"
        createtime: 1594632801670
        from: null
        hot: 2
        id: 2
        title: "标题B"
        typeID: null
       */
      this.$axios.get('/api/blog/detail?id=' + this.$nuxt.$route.params.id).then((res) => {
        // console.log(res)
        if (res.data && res.data.code === 0) {
          this.blogDetailObj = res.data.data || {}
        }
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
