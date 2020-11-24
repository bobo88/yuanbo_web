<template>
  <div class="JobOpenings" v-loading="loading" :max-height="$store.state.auth.bodyHight">
    <div class="common-content">
      <div class="clearfix common-tit">
        <el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>{{$t("message.JobManagement")}}</el-breadcrumb-item>
				<el-breadcrumb-item>{{$t("message.JobOpenings")}}</el-breadcrumb-item>
			</el-breadcrumb>

        <div class="fixed-right-cont">
          <el-button type="primary" size="mini" @click="handleAdd">{{ $t('message.add') }}</el-button>
          <!-- 全新搜索体验 -->
          <!-- <el-badge is-dot class="bo-search-btn inline-block mr20 vt">
            <a href="javascript:;" class="iconfont icon-search f24" @click="handleShowSearch"></a>
          </el-badge> -->
        </div>
      </div>

			<div class="cont-cont">
        <!-- 列表组件 -->
        <el-table :max-height="$store.state.auth.bodyHight" stripe class="mb10 f12" :data="tableDataList" v-loading="loading" ref="multipleTable" border tooltip-effect="dark" style="width:100%;">
          <el-table-column align="center" label="ID" width="80" prop="id"></el-table-column>
          <el-table-column align="center" :label="$t('message.job.JobTitle')" min-width="120" prop="title"></el-table-column>
          <el-table-column align="center" :label="$t('message.job.JobCategories')" prop="category"></el-table-column>
          <el-table-column align="center" :label="$t('message.job.Workplace')" prop="workplace"></el-table-column>
          <el-table-column align="center" :label="$t('message.job.Position')" prop="category"></el-table-column>
          <el-table-column align="center" :label="$t('message.job.Department')" prop="department"></el-table-column>
          <el-table-column align="center" :label="$t('message.job.ReleaseTime')" width="150" prop="date"></el-table-column>
          
          <!-- <el-table-column align="center" :label="$t('message.NewsType')" width="120">
            <template slot-scope="scope">
              <p>{{ scope.row.type === 'company' ? $t('message.CompanyNews') : $t('message.IndustryNews') }}</p>
            </template>
          </el-table-column> -->
          <!-- 操作 -->
          <el-table-column key="999" fixed="right" align="center" :label="$t('message.operation')" width="120">
            <template slot-scope="scope">
              <a href="javascript:;" class="color-link"  @click="handleEdit(scope.$index, scope.row)">{{ $t("message.edit") }}</a>
              <el-divider direction="vertical"></el-divider>
              <a href="javascript:;" class="color-danger" @click="handleDelete(scope.$index, scope.row)">{{ $t("message.delete") }}</a>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页组件 -->
        <bo-pagination :data-total="total" @cb="cbPaginationPage"></bo-pagination>
        
			</div>
    </div>

  </div>
</template>

<script>
import BoPagination from '@/components/common/BoPagination';
import {CustomListComConfig} from '@/components/mixins/listComIndex'
export default {
  mixins: [CustomListComConfig],
	name: 'JobOpenings',
	data () {
		return {
      loading: false,
      tableDataList: []
		};
	},
	mounted () {
		this.$nextTick(() => {
			// xx
		});
	},
	methods: {
    getTableDataList () {
      this.tableDataList = [
        {
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
        }
      ];
    },
    // 新增
    handleAdd (index, item) {
      this.$router.push({name: 'OprateJob', query: {type: 'add', sort:'openings'}});
    },
    // 编辑
    handleEdit (index, item) {
      this.$router.push({name: 'OprateJob', query: {type: 'edit', sort:'openings', id: item.id}});
    },
    // 删除
    async handleDelete () {
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
        this.$message.success(this.$t('message.PromptInformation.successfulOperation'));
      }
    }
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="scoped" type="text/css">

</style>
