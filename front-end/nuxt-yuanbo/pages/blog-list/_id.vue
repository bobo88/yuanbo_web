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
  // async asyncData({ isDev, route, store, env, params, query, req, res, redirect, error }) {
  //   console.log('----------------------isDev----------------------------------------')
  //   console.log(isDev)
  //   console.log('--------------------------route------------------------------------')
  //   console.log(route)
  //   console.log('---------------------------store-----------------------------------')
  //   console.log(store)
  //   console.log('-----------------------------env---------------------------------')
  //   console.log(env)
  //   console.log('----------------------------params----------------------------------')
  //   console.log(params)
  //   console.log('------------------------------query--------------------------------')
  //   console.log(query)
  //   console.log('-------------------------------req-------------------------------')
  //   console.log(req)
  //   console.log('---------------------------------res-----------------------------')
  //   console.log(res)
  //   console.log('------------------------------redirect--------------------------------')
  //   console.log(redirect)
  //   console.log('-------------------------------error-------------------------------')
  //   console.log(error)
  //   console.log('--------------------------------------------------------------')
  // },
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
    // x
  },
  methods: {
    htmlRestore (str) {
      var s = "";
      if (str.length === 0) {
        return "";
      }
      s = str.replace(/&amp;/g, "&");
      s = s.replace(/&lt;/g, "<");
      s = s.replace(/&gt;/g, ">");
      s = s.replace(/&nbsp;/g, " ");
      s = s.replace(/&#39;/g, "\'");
      s = s.replace(/&quot;/g, "\"");
      return s;
    },
    getBlogDetail () {
      this.$axios.get('/api/blog/detail?id=' + this.$nuxt.$route.params.id).then((res) => {
        // console.log(res)
        if (res.data && res.data.code === 0) {
          let _data = res.data.data;
          _data.content = this.htmlRestore(_data.content);
          console.log(_data.content, 8888)
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
