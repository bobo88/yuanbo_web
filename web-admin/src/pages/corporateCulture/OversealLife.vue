<template>
  <div class="OversealLife" v-loading="loading" :max-height="$store.state.auth.bodyHight">
    <div class="common-content">
			<el-breadcrumb separator-class="el-icon-arrow-right" class="common-tit">
				<el-breadcrumb-item>{{$t("message.CorporateCulture")}}</el-breadcrumb-item>
				<el-breadcrumb-item>{{$t("message.OversealLife")}}</el-breadcrumb-item>
			</el-breadcrumb>

			<div class="cont-cont">
				<p>{{$t("message.OversealLife")}}</p>
			</div>
    </div>

  </div>
</template>

<script>


export default {
	name: 'OversealLife',
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