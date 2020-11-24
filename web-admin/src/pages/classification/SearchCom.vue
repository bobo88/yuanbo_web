<!--
  内容：分类管理 - 查询组件
  作者：BOBO
  日期： 20190827
-->
<template>
  <div class="search-com f12">
    <el-drawer
      title=""
      :visible.sync="visible"
      direction="rtl"
      @close="close"
     size="300px">
      <div class="search-cont">
        <!-- 查询组件 -->
        <div class="mb10">
          <span class="tit">昵称：</span>
          <el-input clearable size="mini" class="w150 mb5" v-model="username"></el-input>
        </div>
        <div class="mb10">
          <span class="tit">文章ID：</span>
          <el-input type="number" clearable size="mini" class="w150 mb5"  v-model.number="blogId"></el-input>
        </div>

        <div class="mb10">
          <el-button size="mini" @click="search" type="primary" plain class="mb10">搜索</el-button>
          <el-button size="mini" @click="add" type="success" class="mb10">新增</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  import {CustomSearchConfig} from '@/components/mixins/searchIndex'
  export default {
    mixins: [CustomSearchConfig],
    data () {
      return {
        username: '',
        blogId: ''
      }
    },
    methods: {
      // 点击搜索按钮，将查询数据回传到父组件
      search () {
        let options = {
          username: this.username,
          blogId: this.blogId
        };
        this.$emit('cbSearch', options);
        this.close();
      },
      add () {
        this.$emit('cbAdd');
        this.close();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="scoped" type="text/css">

</style>
