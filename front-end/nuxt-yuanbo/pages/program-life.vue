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
            v-for="(blogItem, index) in activities"
            :key="index"
            :timestamp="blogItem.timestamp">
            <nuxt-link class="article-item" :to="'/blog/two/' + blogItem.id">{{ blogItem.content }}</nuxt-link>
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
      activities: [
        {
          content: '程序人生AAAAA',
          id: 1,
          timestamp: '2018-04-15'
        },
        {
          content: '程序人生BBBBB',
          id: 1,
          timestamp: '2018-04-13'
        },
        {
          content: '程序人生AAAAA',
          id: 1,
          timestamp: '2018-04-15'
        },
        {
          content: '程序人生BBBBB',
          id: 1,
          timestamp: '2018-04-13'
        },
        {
          content: '程序人生AAAAA',
          id: 1,
          timestamp: '2018-04-15'
        },
        {
          content: '程序人生BBBBB',
          id: 1,
          timestamp: '2018-04-13'
        },
        {
          content: '程序人生AAAAA',
          id: 1,
          timestamp: '2018-04-15'
        },
        {
          content: '程序人生BBBBB',
          id: 1,
          timestamp: '2018-04-13'
        },
        {
          content: '程序人生AAAAA',
          id: 1,
          timestamp: '2018-04-15'
        },
        {
          content: '程序人生CCCCC',
          id: 1,
          timestamp: '2018-04-11'
        }
      ]
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
