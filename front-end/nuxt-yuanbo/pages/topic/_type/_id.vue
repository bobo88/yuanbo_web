<template>
  <div class="container-cont clearfix">
    <div class="lbox">
      <div class="content-box bgcolorF">
        <div class="mb30">
          <!-- {{ $nuxt.$route.params.id }} -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/topic/' + $nuxt.$route.params.type }">{{ topicTypeName }}</el-breadcrumb-item>
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
  computed: {
    topicTypeName () {
      if (this.$store.state.topicTypeList && this.$store.state.topicTypeList.length > 0) {
        let filterArr = this.$store.state.topicTypeList.filter(i => {
          return parseInt(i.id) === parseInt(this.$nuxt.$route.params.type)
        })
        if (filterArr && filterArr.length > 0) {
          return filterArr[0].title
        }
      }
      return ''
    }
  },
  created () {
    // 获取博客详情
    this.getBlogDetail()
  },
  mounted () {
    // xx
  },
  methods: {
    getBlogDetail () {
      this.$axios.get('/api/blog/detail?id=' + this.$nuxt.$route.params.id).then((res) => {
        if (res.data && res.data.code === 0) {
          let _data = res.data.data;
          _data.content = this.$filters.htmlRestore(_data.content);
          this.blogDetailObj = _data || {}
        }
      }).catch(err => {
        console.log(err)
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
