<!--
  内容：文章管理 - 列表组件
  作者：BOBO
  日期： 20190827
-->
<template>
  <div class="list-com f14">
    <!-- 报表组件 -->
    <el-table :max-height="$store.state.auth.bodyHight" stripe class="mb10 f12" v-loading="loading" ref="multipleTable"
      border :data="dataList" :empty-text="emptyText" tooltip-effect="dark" style="width:100%;"
      @selection-change="handleSelectionChange" :row-class-name="tableRowClassName">
      <el-table-column align="center" label="文章ID" width="100">
        <template slot-scope="scope">
          <p v-clipboard:copy="scope.row.id" v-clipboard:success="$copySucc">{{ scope.row.id }}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="标题" min-width="100">
        <template slot-scope="scope">
          <p v-clipboard:copy="scope.row.title" v-clipboard:success="$copySucc">{{ scope.row.title }}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="作者">
        <template slot-scope="scope">
          {{ scope.row.author || "BOBO" }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="文章简介" min-width="150">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.brief" placement="top-start">
            <p class="lh34 ellipsis w100Percent">{{ scope.row.brief }}</p>
          </el-tooltip>
        </template>
      </el-table-column>
      
      <el-table-column align="center" label="文章分类" min-width="150">
        <template slot-scope="scope">
          <span v-if="+scope.row.typeId === 1">个人博客</span>
          <span v-else-if="+scope.row.typeId === 2">程序人生</span>
          <span v-else>专题版块</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="专题版块分类" width="150">
        <template slot-scope="scope">
          {{ scope.row.topicId ? scope.row.topicName : '' }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="文章banner图" width="150">
        <template slot-scope="scope">
          <img v-if="scope.row.banner" :src="scope.row.banner" width="200" height="100" class="vm">
        </template>
      </el-table-column>
      <el-table-column align="center" label="热度" width="150">
        <template slot-scope="scope">
          {{ scope.row.hot }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="来源" width="150">
        <template slot-scope="scope">
          {{ scope.row.source }}
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
      <el-table-column key="999" fixed="right" align="center" label="操作" width="150" class-name="opration">
        <template slot-scope="scope">
          <a href="javascript:;" class="color-link" @click="handlePreview(scope.$index, scope.row)">预览</a>
          <el-divider direction="vertical"></el-divider>
          <a href="javascript:;" class="color-link" @click="handleEdit(scope.$index, scope.row)">编辑</a>
          <el-divider direction="vertical"></el-divider>
          <a href="javascript:;" class="color-danger" @click="handleDelete(scope.$index, scope.row)">删除</a>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <bo-pagination :data-total="total" @cb="cbPaginationPage"></bo-pagination>

    <el-dialog
      center
      title="文章预览"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose">
      <div class="ql-editor">
        <div v-html="currentBlogContent"></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BoPagination from '@/components/common/BoPagination';
import {CustomListComConfig} from '@/components/mixins/listComIndex'
export default {
  mixins: [CustomListComConfig],
  components: {
    BoPagination
  },
  props: {
    dataTopic: {
      type: Array
    }
  },
  data () {
    return {
      dataList: [],
      dialogVisible: false,
      currentBlogContent: ''
    };
  },
  computed: {
    formatName (val) {
      let filterArr = this.dataTopic.filter(i => i.id === parseInt(val))
      if (filterArr && filterArr.length > 0) {
        return filterArr[0].title
      }
      return ''
    }
    
  },
  methods: {
    // 获取视频列表
    async getDataList (paramsOptions) {
      if (paramsOptions) {
        this.pageIndex = paramsOptions.pageIndex;
        this.pageSize = paramsOptions.pageSize;
      } else {
        this.pageIndex = 1;
        this.pageSize = 20;
      }
      let options = {
        pageIndex: this.pageIndex, // 数值从0开始
        pageSize: this.pageSize,
        typeId: this.dataSearch.typeId || '',
        topicId: this.dataSearch.topicId || ''
      };
      this.loading = true;
      let data = await this.Api.allApiEntry('getblogListByPage', options);
      this.loading = false;
      if (parseInt(data.code) === 0) {
        let _data = data.data;
        if (_data.list && _data.list.length > 0) {
          this.dataList = _data.list.map(i => {
            let filterArr = this.dataTopic.filter(j => j.id === parseInt(i.topicId))
            if (filterArr && filterArr.length > 0) {
              this.$set(i, 'topicName', filterArr[0].title);
            }
            return i
          });
          this.total = _data.total;
        } else {
          this.dataList = [];
          this.total = 0;
        }
      } else {
        this.$message.error(data.message)
      }
    },
    handlePreview (index, row) {
      this.currentBlogContent = row.content;
      this.dialogVisible = true;
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
        this.Api.allApiEntry('deleteComment', options).then((data) => {
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
