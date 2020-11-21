<template>
  <div class="container">
    <h1>{{ dataDetail.title }}</h1>
    <div class="info">
      <span>作者：{{ dataDetail.author }}</span>
      <span>日期：{{ dataDetail.createtime | dateFormatYyyyMmDd }}</span>
      <span>点击：{{ dataDetail.hot ? dataDetail.hot : 0 }}</span>
    </div>

    <div class="content">
      <div class="ql-editor">
        <!-- <div v-html="test"></div> -->
        <div v-html="dataDetail.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataDetail: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      // x
    }
  },
  computed: {},
  created () {
    // xx
  },
  mounted () {
    // xx
  },
  methods: {
    handleSelect () {}
  }
}
</script>

<style lang="scss" scoped>
</style>
