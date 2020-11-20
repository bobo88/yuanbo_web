<template>
  <div class="container">
    <!-- 公共头部 -->
    <top />
    <!-- 主体部分 -->
    <div class="main-container">
      <Nuxt />
    </div>
    <!-- 公共底部 -->
    <bottom class="bottom-box"></bottom>

    <a href="#">
      <div class="gotoTop">
        <i class="el-icon-top"></i>
      </div>
    </a>
  </div>
</template>

<script>
import Top from '@/components/Top'
import Bottom from '@/components/Bottom'
export default {
  components: {
    Top,
    Bottom
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
    // xx
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  .container {
    position: relative;
    z-index: 1;
    min-height: 100%;
    padding-bottom: 130px;
    .bottom-box {
      position: absolute;
      z-index: 2;
      bottom: 0;
      left: 0;
    }
  }
  .main-container {
    margin: 0 auto;
    padding: 20px 0;
    width: 1200px;
    overflow: hidden;
  }
  .gotoTop {
    padding: 8px 0;
    width: 40px;
    height: 40px;
    display: block;
    background: #000;
    right: 50px;
    bottom: 10%;
    position: fixed;
    z-index: 999;
    text-align: center;
    .el-icon-top {
      color: #fff;
      font-size: 24px;
    }
  }
</style>
