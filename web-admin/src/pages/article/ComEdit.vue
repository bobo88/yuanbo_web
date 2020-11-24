<!--
  内容：ComEdit - 组件
  作者：BOBO
  日期： 20190830
-->
<template>
  <div class="ComEdit">
    <el-dialog
      title='文章'
      :visible.sync="visible" @close="cancel"
      center
      width="80%">
      <div class="mb20 f12" v-if="dataEdit.id">
        <p class="tc-tit mb10 fb f14">ID:</p>
        <el-input clearable disabled size="mini" class="w100Percent vm" v-model="dataEdit.id"></el-input>
      </div>
      <div class="mb20 f12">
        <p class="tc-tit mb10 fb f14">标题:</p>
        <el-input clearable size="mini" class="w100Percent vm" v-model="dataEdit.title"></el-input>
      </div>
      <div class="mb20 f12">
        <p class="tc-tit mb10 fb f14">简介:</p>
        <el-input type="textarea" size="mini" class="w100Percent vm" v-model="dataEdit.brief"></el-input>
      </div>
      <div class="mb20 f12">
        <p class="tc-tit mb10 fb f14">分类:</p>
        <el-input clearable size="mini" class="w100Percent vm" v-model="dataEdit.typeId"></el-input>
      </div>
      <div class="mb20 f12">
        <p class="tc-tit mb10 fb f14">所属专题:</p>
        <el-input clearable size="mini" class="w100Percent vm" v-model="dataEdit.topicId"></el-input>
      </div>
      <div class="mb20 f12">
        <p class="tc-tit mb10 fb f14">内容:</p>
        <div class="cont-tmain">
          <!-- 富文本编辑器 -->
          <quill-editor
            ref="myQuillEditor"
            v-model="dataEdit.content"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
          />
        </div>
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
    },
    dataTopic: {
      type: Array
    }
  },
  data() {
    return {
      visible: false,
      editorOption: {
        // Some Quill options...
      }
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted() {
    // console.log('this is current quill instance object', this.editor)
  },
  methods: {
    onEditorBlur(quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus(quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady(quill) {
      console.log('editor ready!', quill)
    },
    onEditorChange({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.content = html
    },
    show () {
      this.visible = true;
    },
    cancel () {
      this.visible = false;
    },
    validateBeforeSubmit () {
      if (!this.dataEdit.content) {
        this.$message.error('评论内容不能为空!');
        return false;
      }
      return true;
    },
    async submit () {
      if (!this.validateBeforeSubmit()) {
        return false;
      } else {
        let _dataEdit = this.dataEdit;
        let options = {
          id: parseInt(_dataEdit.id),
          blogId: parseInt(_dataEdit.blogId),
          username: _dataEdit.username,
          content: _dataEdit.content
        };
        this.$confirm('您确定要执行此操作？', '提示', {
          confirmButtonText: 'YES',
          cancelButtonText: 'NO',
          type: 'warning',
          center: true
        }).then(() => {
          this.Api.allApiEntry('updateComment', options).then((data) => {
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
