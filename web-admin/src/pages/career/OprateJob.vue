<template>
  <div class="OprateJob" v-loading="loading" :max-height="$store.state.auth.bodyHight">
    <div class="common-content">
			<el-breadcrumb separator-class="el-icon-arrow-right" class="common-tit">
				<el-breadcrumb-item>{{$t("message.JobManagement")}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: $route.query.sort === 'openings' ? '/career/job-openings' : '/career/closed-jobs' }">
          {{ $route.query.sort === 'openings' ? $t("message.JobOpenings") : $t("message.ClosedJobs") }}
        </el-breadcrumb-item>
				<el-breadcrumb-item>{{ $route.query.type === 'edit' ? $t("message.edit") : $t("message.add") }}</el-breadcrumb-item>
			</el-breadcrumb>

			<div class="cont-cont">
        <div class="mb20">
          <p class="cont-tname mb10 fb">{{ $t('message.job.JobTitle') }}:</p>
          <div class="cont-tmain"><el-input clearable size="mini" class="w100Percent mb5" v-model="jobData.title"></el-input></div>
        </div>
        <div class="mb20">
          <p class="cont-tname mb10 fb">{{ $t('message.job.JobCategories') }}:</p>
          <div class="cont-tmain"><el-input clearable size="mini" class="w100Percent mb5" v-model="jobData.category"></el-input></div>
        </div>
        <div class="mb20">
          <p class="cont-tname mb10 fb">{{ $t('message.job.JobDivision') }}:</p>
          <div class="cont-tmain"><el-input clearable size="mini" class="w100Percent mb5" v-model="jobData.division"></el-input></div>
        </div>
        <div class="mb20">
          <p class="cont-tname mb10 fb">{{ $t('message.job.MonthlySalary') }}:</p>
          <div class="cont-tmain"><el-input clearable size="mini" class="w100Percent mb5" v-model="jobData.monthlySalary"></el-input></div>
        </div>
        <div class="mb20">
          <p class="cont-tname mb10 fb">{{ $t('message.job.RecruitmentType') }}:</p>
          <div class="cont-tmain"><el-input clearable size="mini" class="w100Percent mb5" v-model="jobData.recruitmentType"></el-input></div>
        </div>
        <div class="mb20">
          <p class="cont-tname mb10 fb">{{ $t('message.job.Recruitment') }}:</p>
          <div class="cont-tmain"><el-input clearable size="mini" class="w100Percent mb5" v-model="jobData.numberOfJobOpening"></el-input></div>
        </div>
        <div class="mb20">
          <p class="cont-tname mb10 fb">{{ $t('message.job.Position') }}:</p>
          <div class="cont-tmain"><el-input clearable size="mini" class="w100Percent mb5" v-model="jobData.position"></el-input></div>
        </div>
        <div class="mb20">
          <p class="cont-tname mb10 fb">{{ $t('message.job.Workplace') }}:</p>
          <div class="cont-tmain"><el-input clearable size="mini" class="w100Percent mb5" v-model="jobData.workplace"></el-input></div>
        </div>
        <div class="mb20">
          <p class="cont-tname mb10 fb">{{ $t('message.job.Department') }}:</p>
          <div class="cont-tmain"><el-input clearable size="mini" class="w100Percent mb5" v-model="jobData.department"></el-input></div>
        </div>

        <div class="mb20">
          <p class="cont-tname mb10 fb">{{ $t('message.job.JobDescription') }}:</p>
          <div class="cont-tmain">
            <!-- 富文本编辑器 -->
            <quill-editor
              ref="myQuillEditor"
              v-model="jobData.description"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
            />
          </div>
        </div>

        <div class="mb20">
          <p class="cont-tname mb10 fb">{{ $t('message.job.LanguageType') }}:</p>
          <div class="cont-tmain">
            <el-select clearable size="mini" class="w100Percent mb5" v-model="jobData.language">
              <el-option key="0" label="中文" value="cn"></el-option>
              <el-option key="1" label="English" value="en"></el-option>
            </el-select>
          </div>
        </div>

        <div>
          <el-button size="mini" @click="search" type="primary" class="w250">{{ $t('message.Submit') }}</el-button>
          <el-button size="mini" @click="OnekeyReset" type="danger" class="w150">{{ $t('message.OnekeyReset') }}</el-button>
        </div>
        
			</div>
    </div>

  </div>
</template>

<script>


export default {
	name: 'OprateJob',
	data () {
		return {
      loading: false,
      jobData: {},
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
    // 根据ID获取新闻详情数据
    this.getNewsDetailById();
    console.log('this is current quill instance object', this.editor)
  },
	methods: {
    async OnekeyReset () {
      let callback = await this.$confirm(
        this.$t('message.PromptInformation.areYouSure'),
        this.$t('message.PromptInformation.prompt'),
        {
          confirmButtonText: this.$t('message.PromptInformation.YES'),
          cancelButtonText: this.$t('message.PromptInformation.NO'),
          type: 'warning',
          center: true
        }
      );
      if (callback) {
        this.jobData = Object.assign(this.jobData, {
          title: '',
          category: '',
          division: '',
          monthlySalary: '',
          recruitmentType: '',
          numberOfJobOpening: '',
          position: '',
          workplace: '',
          department: '',
          description: ``,
          language: '',
          date: ''
        });
      }
    },
    getNewsDetailById () {
      if (!this.$route.query.id) {
        this.jobData = {
          title: '',
          category: '',
          division: '',
          monthlySalary: '',
          recruitmentType: '',
          numberOfJobOpening: '',
          position: '',
          workplace: '',
          department: '',
          description: ``,
          language: '',
          date: ''
        };
      } else {
        this.jobData = {
          id: '1',
          title: '高级推荐算法工程师',
          category: '技术研发类',
          division: '',
          monthlySalary: '',
          recruitmentType: '社会招聘',
          numberOfJobOpening: 1,
          position: '传易互联',
          workplace: '深圳',
          department: '传易互联',
          description: `
            <div class="t1">
            <p>工作职责：</p>
  
            <p>1、负责短视频业务推荐系统开发，开展线上算法实验；<br>
            2、对实验数据进行处理和分析，发现现有系统和算法的不足，提出改进并推动实现；<br>
            3、构建热门话题推荐策略。</p>
  
            <p>任职资格：</p>
  
            <p>1、计算机或相关专业，硕士以上学历，机器学习/数据挖掘/推荐系统3年以上经验；<br>
            2、熟悉Hadoop, spark, Hive等大数据处理工具；&nbsp;<br>
            3、熟悉linux环境，熟悉java/scala和python编程语言；&nbsp;<br>
            4、熟悉用户画像，物品标签系统建设；&nbsp;<br>
            5、有特征工程经验，熟练掌握常规机器学习算法原理；<br>
            6、熟练掌握深度学习算法原理，以及相关深度学习框架；&nbsp;<br>
            7、有广告相关推荐策略经验优先。</p>
          </div>
          `,
          language: 'cn',
          date: '2020-05-15'
        };
      }
    },
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
