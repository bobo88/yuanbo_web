<template>
  <div class="home" v-loading="loading" :max-height="$store.state.auth.bodyHight">
    <div class="common-content">
			<el-breadcrumb separator-class="el-icon-arrow-right" class="common-tit">
				<el-breadcrumb-item>首页</el-breadcrumb-item>
				<el-breadcrumb-item>数据概览</el-breadcrumb-item>
			</el-breadcrumb>

			<div class="contact-us-box">
				<p class="info"><i class="el-icon-bell"></i>使用过程中如有疑问请联系袁波 (yuanbo1209@163.com)</p>
			</div>

      <div class="crosswise">
				<el-row :gutter="10">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
						<div class="grid-content bg-purple">
							<div class="items bg-color-link">
								<span class="item-text" title='文章管理'>文章管理</span>
								<span class="item-num">{{dataOverview.NewsContents | numberFormat}}</span>
								<span class="iconfont icon-jiantou"></span>
							</div>
						</div>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
						<div class="grid-content bg-purple">
							<div class="items bg-color-success">
								<span class="item-text" title='分类管理'>分类管理</span>
								<p class="item-num">{{dataOverview.JobsPosted | numberFormat}}</p>
								<span class="iconfont icon-jiantou"></span>
							</div>
						</div>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
						<div class="grid-content bg-purple">
							<div class="items bg-color-warning">
								<span class="item-text" title='评论管理'>评论管理</span>
								<p class="item-num">{{dataOverview.CompanyNews | numberFormat}}</p>
								<span class="iconfont icon-jiantou"></span>
							</div>
						</div>
					</el-col>
					<!-- <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
						<div class="grid-content bg-purple">
							<div class="items bg-color-danger">
								<span class="item-text" :title='$t("message.IndustrialNews")'>{{$t("message.IndustrialNews")}}</span>
								<p class="item-num">{{dataOverview.IndustrialNews | numberFormat}}</p>
								<span class="iconfont icon-jiantou"></span>
							</div>
						</div>
					</el-col> -->
				</el-row>
      </div>
    </div>

  </div>
</template>

<script>


export default {
	'name': 'home',
	data () {
		return {
			loading: false,
			dataOverview: {
				NewsContents: 0,
				JobsPosted: 0,
				CompanyNews: 0,
				IndustrialNews: 0
			}
		};
	},
	mounted () {
		this.$nextTick(() => {
			this.dataOverview = {
				NewsContents: 37,
				JobsPosted: 35,
				CompanyNews: 22,
				IndustrialNews: 15
			}
		});
	},
	methods: {
		// xx
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="scoped" type="text/css">

.crosswise {
  width: 100%;
  padding: 10px 0px 0px 10px;
}
.items {
	position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #d5d8dc;
  padding: 15px 0px;
  margin: 10px;
  font-family: PingFangSC-Regular;
	color: #fff;
	border-radius: 8px;
	cursor: pointer;
}
.common-content {
  background: #ffffff;
}
.item-text {
	margin-bottom: 10px;
	display: inline-block;
	height: 30px;
	line-height: 30px;
  font-size: 16px;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
	text-overflow: ellipsis;
	border-bottom: 1px dashed #fff;
}
.item-num {
  font-size: 20px;
}
.item-text-num {
  font-size: 12px;
  color: #999999;
  line-height: 18px;
}
.icon-jiantou {
	position: absolute;
	top: 50%;
	right: 10px;
	margin-top: -12px;
	font-size: 24px;
}
</style>
