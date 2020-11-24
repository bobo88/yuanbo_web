<template>
  <div class="CompanyNews" v-loading="loading" :max-height="$store.state.auth.bodyHight">
    <div class="common-content">
			<el-breadcrumb separator-class="el-icon-arrow-right" class="common-tit">
				<el-breadcrumb-item>{{$t("message.NewsContents")}}</el-breadcrumb-item>
				<el-breadcrumb-item>{{$t("message.CompanyNews")}}</el-breadcrumb-item>
			</el-breadcrumb>

			<div class="cont-cont">
				<p>{{$t("message.CompanyNews")}}</p>
        
        <div class="ql-editor">
          <div v-html="content"></div>
        </div>
        <!-- 富文本编辑器 -->
        <quill-editor
          ref="myQuillEditor"
          v-model="content"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
        />
			</div>
    </div>

  </div>
</template>

<script>


export default {
	name: 'CompanyNews',
	data () {
		return {
      loading: false,
      content: '',
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
    console.log('this is current quill instance object', this.editor)
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
    }
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="scoped" type="text/css">

</style>
