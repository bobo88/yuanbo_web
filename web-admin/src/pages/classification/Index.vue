<!--
  内容：分类管理
  作者：BOBO
  日期： 20201124
-->
<template>
  <div class="comment f12">
    <div class="clearfix common-tit">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>分类管理</el-breadcrumb-item>
        <el-breadcrumb-item>分类列表</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="fixed-right-cont">
        <el-button size="mini" @click="add" type="success" class="mb10">新增分类</el-button>
        <!-- 全新搜索体验 -->
        <!-- <el-badge is-dot class="bo-search-btn inline-block mr20 vt">
          <a href="javascript:;" class="iconfont icon-search f24" @click="handleShowSearch"></a>
        </el-badge> -->
      </div>
    </div>

    <!-- 查询组件 -->
    <search-com  @cbSearch="searchInformationCb" ref='searchComRef' @cbAdd="cbAdd"></search-com>
    <!-- 报表组件 -->
    <list-com :data-search="dataSearchOptions" @cbEdit="cbEdit" ref="listComId"></list-com>
    <!-- 编辑弹窗组件 -->
    <com-edit ref="comEdit" :data-edit="dataEdit" @cb="editTextureCb"></com-edit>
  </div>
</template>

<script>
  import {CustomColumnConfig} from '@/components/mixins'
  import SearchCom from './SearchCom';
  import ListCom from './ListCom';
  import ComEdit from './ComEdit';
  export default {
    name: 'comment',
    mixins: [CustomColumnConfig],
    components: {
      SearchCom,
      ListCom,
      ComEdit
    },
    data () {
      return {
        // 新增/编辑 对象
        dataEdit: {}
      }
    },
    methods: {
      add () {
        // 显示弹窗
        this.dataEdit = {
          title: '',
          description: ''
        };
        this.$nextTick(() => {
          this.$refs.comEdit.show();
        });
      },
      cbEdit (options) {
        this.dataEdit = JSON.parse(JSON.stringify(options.row));
        // 显示弹窗
        this.$nextTick(() => {
          this.$refs.comEdit.show();
        });
      },
      editTextureCb () {
        this.dataSearchOptions = Object.assign({}, this.dataSearchOptions);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="scoped" type="text/css">

</style>
