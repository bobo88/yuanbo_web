<template>
  <div class="container">
    <h1>{{ dataDetail.title }}</h1>
    <div class="info">
      <span class="inline-block vm">作者：{{ dataDetail.author || 'BOBO' }}</span>
      <span class="inline-block vm">日期：{{ dataDetail.createTime | formatYmdhmsTime }}</span>
      <!-- <span>点击：{{ dataDetail.hot ? dataDetail.hot : 0 }}</span> -->
    </div>

    <div class="content">
      <div class="ql-editor">
        <!-- <p>{{typeof dataDetail.content}}</p>
        {{dataDetail.content}} -->
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
