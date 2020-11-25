<template>
  <!-- 主体部分 -->
  <div class="container-cont clearfix">
    <div class="lbox">
      <!-- BANNER -->
      <!-- <banner /> -->
      <!-- 博客列表 -->
      <home-blog-list />
    </div>

    <div class="rbox">
      <!-- 袁波的名片 -->
      <!-- <card /> -->

      <!-- 点击排行 -->
      <ranking />
    </div>
  </div>
</template>

<script>
import Ranking from '~/components/home/Ranking'
import HomeBlogList from '~/components/home/HomeBlogList'
import Card from '~/components/home/Card'
import Banner from '~/components/home/Banner'
export default {
  components: {
    Ranking,
    HomeBlogList,
    Card,
    Banner
  },
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
    // console.log(12, this)
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
