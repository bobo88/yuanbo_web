<template>
  <div class="notfound">
    <div class="wrap">
      <div class="icon"></div>
      <div>404 Not Found</div>
    </div>
  </div>
</template>

<script>
export default {
	'name': 'no-find',
	data () {
		return {
			'msg': 'xxxx'
		};
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notfound {
  width: 100%;
  height: 100%;
}

.wrap {
  padding-top: 50%;
  font-size: 30px;
  background-color: rgb(248, 248, 248);
  color: rgb(153, 153, 153);
  text-align: center;
}
</style>
