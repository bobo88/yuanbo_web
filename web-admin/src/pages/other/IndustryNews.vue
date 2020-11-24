<template>
  <div class="IndustryNews" v-loading="loading" :max-height="$store.state.auth.bodyHight">
    <div class="common-content">
			<el-breadcrumb separator-class="el-icon-arrow-right" class="common-tit">
				<el-breadcrumb-item>{{$t("message.NewsContents")}}</el-breadcrumb-item>
				<el-breadcrumb-item>{{$t("message.IndustryNews")}}</el-breadcrumb-item>
			</el-breadcrumb>

			<div class="cont-cont">
				<p>{{$t("message.IndustryNews")}}</p>
			</div>
    </div>

  </div>
</template>

<script>


export default {
	name: 'IndustryNews',
	data () {
		return {
			loading: false
		};
	},
	mounted () {
		this.$nextTick(() => {
			// xx
		});
	},
	methods: {
		// xx
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="scoped" type="text/css">

</style>