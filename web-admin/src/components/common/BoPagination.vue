<!--
作者：BOBO
日期： 20180929
-->
<template>
  <div class="bo-pagination tr mb10">
    <el-pagination
      small
      layout="total, sizes, pager, prev, next, jumper"
      :prev-text="$t('message.prevPage')"
      :next-text="$t('message.nextPage')"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :current-page="pageIndex"
      :page-sizes="[5, 10, 20, 25, 50]"
      :page-size="dataSize ? dataSize : pageSize"
      :total="dataTotal">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'bo-pagination',
    props: ['dataTotal', 'dataSize'],
    data () {
      return {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      }
    },
    watch: {
      dataTotal () {
        this.$nextTick(() => {
          // this.pageIndex = 1;
          // this.pageSize = this.dataSize ? this.dataSize : 10;
        });
      }
    },
    methods: {
      handleSizeChange (val) {
        this.pageSize = val;
        this.$emit('cb', {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        });
      },
      handleCurrentChange (val) {
        this.pageIndex = val;
        this.$emit('cb', {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="scoped" type="text/css">
</style>
