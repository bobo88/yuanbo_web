<template>
  <div id="app">
    <!-- 头部导航 -->
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->

    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <transition name="fade" mode="out-in">
      <router-view v-if='routerState' />
    </transition>
  </div>
</template>

<script>
export default {
	'name': 'app',
	'components': {},
	provide () {
		return {
			'reload': this.reload
		};
	},
	'data': function () {
		return {
			'routerState': true
		};
	},
	'created': function () { },
	'methods': {
		reload(){
			this.routerState = false;
			this.$nextTick(() =>{
				this.routerState = true;
			});
		}
	},
	'computed': {},
	mounted () {
		this.$nextTick(() => {
			// this.MyDebugger.log('获取dom', window.$('#app'))
		});
	}
};
</script>
<style lang="scss" type="text/css" src="@/styles/index.scss"></style>
