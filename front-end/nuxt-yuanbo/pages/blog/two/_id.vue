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

        111111111111111111
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
  validate ({ params }) {
    // 必须是number类型
    return /^\d+$/.test(params.id)
  },
  components: {
    Ranking
  },
  data () {
    return {
      activities: [
        {
          content: '程序人生AAAAA',
          timestamp: '2018-04-15'
        },
        {
          content: '程序人生BBBBB',
          timestamp: '2018-04-13'
        },
        {
          content: '程序人生AAAAA',
          timestamp: '2018-04-15'
        },
        {
          content: '程序人生BBBBB',
          timestamp: '2018-04-13'
        },
        {
          content: '程序人生AAAAA',
          timestamp: '2018-04-15'
        },
        {
          content: '程序人生BBBBB',
          timestamp: '2018-04-13'
        },
        {
          content: '程序人生AAAAA',
          timestamp: '2018-04-15'
        },
        {
          content: '程序人生BBBBB',
          timestamp: '2018-04-13'
        },
        {
          content: '程序人生AAAAA',
          timestamp: '2018-04-15'
        },
        {
          content: '程序人生CCCCC',
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
