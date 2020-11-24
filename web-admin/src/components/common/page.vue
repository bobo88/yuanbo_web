<template>
  <div class="block">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
      :page-sizes="[5,10, 20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="parentTotal">
    </el-pagination>
  </div>
</template>

<script>


export default {
	'name': 'page',
	'props':['parentTotal'],
	data () {
		return {
			'pageSize':10,
			'page': 1
		};
	},

	'methods': {
		handleSizeChange(value){
			this.pageSize = value;
			this.$emit('changePage',{
				'pageSize':value,
				'page':this.page
			});
		},
		handleCurrentChange(value){
			this.page = value;
			this.$emit('changePage',{
				'page':value,
				'pageSize':this.pageSize
			});
		}
	}
};
</script>

<style lang="scss" scoped="scoped" type="text/css">
.block{
  margin: 20px 0px;
  text-align: right;
}
</style>
