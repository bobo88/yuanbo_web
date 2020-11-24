<!--
  内容：分类管理 - 列表组件
  作者：BOBO
  日期： 20190827
-->
<template>
  <div class="list-com f14">
    <!-- 报表组件 -->
    <el-table :max-height="$store.state.auth.bodyHight" stripe class="mb10 f12" v-loading="loading" ref="multipleTable"
      border :data="dataList" :empty-text="emptyText" tooltip-effect="dark" style="width:100%;"
      @selection-change="handleSelectionChange" :row-class-name="tableRowClassName">
      <el-table-column align="center" label="分类ID" width="100">
        <template slot-scope="scope">
          <p v-clipboard:copy="scope.row.id" v-clipboard:success="$copySucc">{{ scope.row.id }}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="名称" width="100">
        <template slot-scope="scope">
          <p v-clipboard:copy="scope.row.title" v-clipboard:success="$copySucc">{{ scope.row.title }}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="描述">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="150">
        <template slot-scope="scope">
          {{ scope.row.createTime | formatYmdhmsTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="更新时间" width="150">
        <template slot-scope="scope">
          {{ scope.row.updateTime | formatYmdhmsTime }}
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column key="999" fixed="right" align="center" label="操作" width="120" class-name="opration">
        <template slot-scope="scope">
          <a href="javascript:;" class="color-link" @click="handleEdit(scope.$index, scope.row)">编辑</a>
          <el-divider direction="vertical"></el-divider>
          <a href="javascript:;" class="color-danger" @click="handleDelete(scope.$index, scope.row)">删除</a>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <!-- <bo-pagination :data-total="total" @cb="cbPaginationPage"></bo-pagination> -->
  </div>
</template>

<script>
// import BoPagination from '@/components/common/BoPagination';
import {CustomListComConfig} from '@/components/mixins/listComIndex'
export default {
  mixins: [CustomListComConfig],
  // components: {
  //   BoPagination
  // },
  data () {
    return {
      dataList: []
    };
  },

  methods: {
    // 获取列表
    async getDataList (paramsOptions) {
      // if (paramsOptions) {
      //   this.pageIndex = paramsOptions.pageIndex;
      //   this.pageSize = paramsOptions.pageSize;
      // } else {
      //   this.pageIndex = 1;
      //   this.pageSize = 20;
      // }
      // let options = {
      //   pageIndex: this.pageIndex, // 数值从0开始
      //   pageSize: this.pageSize,
      //   username: this.dataSearch.username || '',
      //   blogId: this.dataSearch.blogId || ''
      // };
      this.loading = true;
      let data = await this.Api.allApiEntry('getTopicsList', {});
      this.loading = false;
      if (parseInt(data.code) === 0) {
        let _data = data.data;
        if (_data.list && _data.list.length > 0) {
          this.dataList = _data.list;
          this.total = _data.total;
        } else {
          this.dataList = [];
          this.total = 0;
        }
      } else {
        this.$message.error(data.message)
      }
    },
    // 编辑Texture
    handleEdit(index, row) {
      this.$emit('cbEdit', { index, row });
    },
    // ------------------ 删除操作： 单个删除 ----------------------------
    async handleDelete (index, row) {
      this.$confirm('您确定要执行此操作？', '提示', {
        confirmButtonText: 'YES',
        cancelButtonText: 'NO',
        type: 'warning',
        center: true
      }).then(() => {
        let options = {
          id: row.id
        };
        this.Api.allApiEntry('deleteTopic', options).then((data) => {
          if (parseInt(data.code) === 0) {
            if (data.data) {
              this.$message.success('操作成功！');
              this.dataList.splice(index, 1);
              this.total--;
              if (this.dataList.length === 0) {
                this.getDataList({
                  pageIndex: this.pageIndex,
                  pageSize: this.pageSize
                });
              }
            } else {
              this.$message.error(data.message)
            }
          } else {
            this.$message.error(data.message)
          }
        }).catch(err => {
          this.$message.error(err.message)
        });
      });
    }
  }
};
</script>
