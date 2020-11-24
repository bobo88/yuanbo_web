<!--
  内容：ComEdit - 组件
  作者：BOBO
  日期： 20190830
-->
<template>
  <div class="ComEdit">
    <el-dialog
      title='分类'
      :visible.sync="visible" @close="cancel"
      center
      width="520px">
      <div class="mb10 f12" v-if="dataEdit.id">
        <span class="tc-tit tr mr10">分类ID:</span>
        <el-input clearable disabled size="mini" class="w200 vm" v-model="dataEdit.id"></el-input>
      </div>
      <div class="mb10 f12">
        <span class="tc-tit tr mr10">分类名称:</span>
        <el-input clearable size="mini" class="w200 vm" v-model="dataEdit.title"></el-input>
      </div>
      <div class="mb10 f12">
        <span class="tc-tit tr mr10">分类描述:</span>
        <el-input type="textarea" size="mini" class="w200 vm" v-model="dataEdit.description"></el-input>
      </div>
      <!-- 操作 -->
      <span slot="footer" class="dialog-footer vm">
        <el-button size="mini" @click="cancel">取消</el-button>
        <el-button size="mini" @click="submit" type="primary">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ComEdit',
  props: {
    dataEdit: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      visible: false
    };
  },
  mounted() {},
  methods: {
    show () {
      this.visible = true;
    },
    cancel () {
      this.visible = false;
    },
    validateBeforeSubmit () {
      if (!this.dataEdit.title) {
        this.$message.error('分类名称不能为空!');
        return false;
      }
      if (!this.dataEdit.description) {
        this.$message.error('分类描述不能为空!');
        return false;
      }
      return true;
    },
    async submit () {
      if (!this.validateBeforeSubmit()) {
        return false;
      } else {
        let _dataEdit = this.dataEdit;
        
        this.$confirm('您确定要执行此操作？', '提示', {
          confirmButtonText: 'YES',
          cancelButtonText: 'NO',
          type: 'warning',
          center: true
        }).then(() => {
          // 编辑更新
          if (_dataEdit.id) {
            let options = {
              id: parseInt(_dataEdit.id),
              title: _dataEdit.title,
              description: _dataEdit.description
            };
            this.Api.allApiEntry('updateTopic', options).then((data) => {
              if (parseInt(data.code) === 0) {
                if (data.data) {
                  this.$message.success('操作成功！');
                  this.$emit('cb');
                  this.cancel();
                } else {
                  this.$message.error(data.message)
                }
              } else {
                this.$message.error(data.message)
              }
            }).catch(err => {
              this.$message.error(err.message)
            });
          } else {
            // 新增
            let options = {
              title: _dataEdit.title,
              description: _dataEdit.description
            };
            this.Api.allApiEntry('addTopic', options).then((data) => {
              if (parseInt(data.code) === 0) {
                if (data.data) {
                  this.$message.success('操作成功！');
                  this.$emit('cb');
                  this.cancel();
                } else {
                  this.$message.error(data.message)
                }
              } else {
                this.$message.error(data.message)
              }
            }).catch(err => {
              this.$message.error(err.message)
            });
          }
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="scoped" type="text/css">
  .cont {
    display: inline-block;
    width: 250px;
    height: 20px;
    line-height: 20px;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
