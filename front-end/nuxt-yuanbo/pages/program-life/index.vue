<template>
  <div class="container-cont clearfix">
    <div class="lbox">
      <div class="content-box bgcolorF">
        <div class="mb30">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>程序人生</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <!-- 博客列表 -->
        <el-timeline>
          <el-timeline-item
            v-for="(blogItem, index) in blogList"
            :key="index"
            :timestamp="blogItem.timestamp">
            <nuxt-link class="article-item" :to="'/program-life/' + blogItem.id">{{ blogItem.title }}</nuxt-link>
          </el-timeline-item>
        </el-timeline>

        <!-- 分页组件 -->
        <bo-pagination :data-total="total" @cb="cbPaginationPage"></bo-pagination>
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
import BoPagination from '~/components/common/BoPagination'
export default {
  components: {
    Ranking,
    BoPagination
  },
  data () {
    return {
      blogList: [],
      pageIndex: 1,
      total: 0
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
    cbPaginationPage (options) {
      this.getBlogList(options);
    },
    getBlogList (paramsOptions) {
      if (paramsOptions) {
        this.pageIndex = paramsOptions.pageIndex;
      } else {
        this.pageIndex = 1;
      }
      this.$axios.post('/api/blog/list', {
        pageIndex: this.pageIndex,
        type: 2
      }).then((res) => {
        console.log('/api/blog/list: --->', res)
        const resData = res.data
        if (resData && resData.code === 0) {
          const resDataData = resData.data
          if (resDataData.list && resDataData.list.length > 0) {
            this.blogList = resDataData.list || []
            this.total = resDataData.total
          } else {
            this.blogList = []
            this.total = 0
          }
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
