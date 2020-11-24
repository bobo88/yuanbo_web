
<template>
	<div class="left-box">
		<div class="pl10 logo-box" :class="dataShort ? 'w100' : 'w220'">
			<span class="inline-block iconfont icon-taiyang f30 vm ml20 logo"></span>
			<h1 v-if="!dataShort">yuanbo-web Admin</h1>
		</div>
		<el-row class="left left-aside" :class="{'short-left-aside': dataShort}">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-menu :unique-opened="true" :default-active="this.$route.path" class="el-menu-vertical-demo" :router='true'
          background-color="#fff" text-color="#333">
					
          <div v-for="(menu, index) in linkData" :to="menu.url" :key="index" class="mt5">
            <!-- 一级菜单: menu -->
            <el-submenu v-if="menu.sortChild" :index="menu.url">
              <template slot="title">
                <menu-title :fold-flag="dataShort" :menu="menu" :type="1" />
              </template>
              <el-menu-item-group>
                <div v-for="(menuItem, key, index) in menu.sortChild" :key="index">
                  <!-- 二级菜单：menu.menuItem  -->
                  <el-submenu v-if="(menuItem.sortChild && menuItem.sortChild.length > 0)" :key="index" :index="menuItem.url">
                    <template slot="title">
                      <menu-title :fold-flag="dataShort" :menu="menuItem" :type="2" />
                    </template>
                    <!-- 三级菜单: menu.menuItem.item -->
                    <el-menu-item v-for="(item, key, idx) in menuItem.sortChild" :key="idx" :index="item.url">
                      <menu-title :fold-flag="dataShort" :menu="item" :type="3"/>
                    </el-menu-item>
                  </el-submenu>
                  <!-- 二级分类: menu.sortChild - item -->
                  <el-menu-item v-else :key="index" :index="menuItem.url">
                    <menu-title :fold-flag="dataShort" :menu="menuItem" :type="2"/>
                  </el-menu-item>
                </div>
              </el-menu-item-group>
            </el-submenu>

            <!-- 一级分类 -->
            <el-menu-item v-else :index="menu.url">
              <menu-title :fold-flag="dataShort" :menu="menu" :type="1"/>
            </el-menu-item>
          </div>

        </el-menu>
      </el-col>
    </el-row>
	</div>

</template>

<script>
	import MenuTitle from './MenuTitle'
	export default {
		'name': 'left',
		props: ['dataShort'],
		components: {
			MenuTitle
		},
		data () {
			return {
				'title': this.Config.TITLE,
				'userName': '',
				'formalDataAuthority': false,
				'formalAuthority': false,
				'internAuthority': false,
				'homeAuthority': false,
				'menuPerms':[],
				'linkData': [
					{
						'sort': this.$t('message.home'),
						'url': '/home',
						'icon': 'icon-shouye',
						'showType':  'MENU_INDEX'
					},
					{
						'sort': this.$t('message.CorporateCulture'),
						'url': '/corporate-culture',
						'icon': 'icon-qiyewenhua',
						'showType': 'MENU_FORMAL',
						'sortChild': [
							{
								'sort': this.$t('message.OfficeEnvironment'),
								'url': '/corporate-culture/office-environment',
								'icon': 'icon-bangongzhuo',
								'showType':'SEC_MENU_FORMAL_INFO'
							},
							{
								'sort': this.$t('message.Employees'),
								'url': '/corporate-culture/employees',
								'icon': 'icon-huodong1',
								'showType':'SEC_MENU_FORMAL_DATA'
							},
							{
								'sort': this.$t('message.OversealLife'),
								'url': '/corporate-culture/overseal-life',
								'icon': 'icon-fengcai',
								'showType':'SEC_MENU_FORMAL_DATA'
							}
						]
					},
					{
						'sort': this.$t('message.JobManagement'),
						'url': '/career',
						'icon': 'icon-zhaopinzhongxin1',
						'showType': 'MENU_FORMAL',
						'sortChild': [
							{
								'sort': this.$t('message.JobOpenings'),
								'url': '/career/job-openings',
								'icon': 'icon-zhaopin',
								'showType':'SEC_MENU_FORMAL_INFO'
							},
							{
								'sort': this.$t('message.ClosedJobs'),
								'url': '/career/closed-jobs',
								'icon': 'icon-guanbi',
								'showType':'SEC_MENU_FORMAL_DATA'
							}
						]
					},
					{
						'sort': this.$t('message.NewsContents'),
						'url': '/news',
						'icon': 'icon-xinwen',
						'showType': 'MENU_FORMAL',
						'sortChild': [
							{
								'sort': this.$t('message.NewsList'),
								'url': '/news/news-list',
								'icon': 'icon-gongsi',
								'showType':'SEC_MENU_FORMAL_INFO'
							}
							// {
							// 	'sort': this.$t('message.CompanyNews'),
							// 	'url': '/news/company-news',
							// 	'icon': 'icon-gongsi',
							// 	'showType':'SEC_MENU_FORMAL_INFO'
							// },
							// {
							// 	'sort': this.$t('message.IndustryNews'),
							// 	'url': '/news/industry-news',
							// 	'icon': 'icon-xingye',
							// 	'showType':'SEC_MENU_FORMAL_DATA'
							// }
						]
					}
				]
			};
		},
		mounted () {
			this.menuPerms = this.$localStore.get('userAuthority');
		},
		'watch': {
			'$i18n.locale': function () {
				this.linkData = [
					{
						'sort': this.$t('message.home'),
						'url': '/home',
						'icon': 'icon-shouye',
						'showType':  'MENU_INDEX'
					},
					{
						'sort': this.$t('message.CorporateCulture'),
						'url': '/corporate-culture',
						'icon': 'icon-qiyewenhua',
						'showType': 'MENU_FORMAL',
						'sortChild': [
							{
								'sort': this.$t('message.OfficeEnvironment'),
								'url': '/corporate-culture/office-environment',
								'icon': 'icon-bangongzhuo',
								'showType':'SEC_MENU_FORMAL_INFO'
							},
							{
								'sort': this.$t('message.Employees'),
								'url': '/corporate-culture/employees',
								'icon': 'icon-huodong1',
								'showType':'SEC_MENU_FORMAL_DATA'
							},
							{
								'sort': this.$t('message.OversealLife'),
								'url': '/corporate-culture/overseal-life',
								'icon': 'icon-fengcai',
								'showType':'SEC_MENU_FORMAL_DATA'
							}
						]
					},
					{
						'sort': this.$t('message.JobManagement'),
						'url': '/career',
						'icon': 'icon-zhaopinzhongxin1',
						'showType': 'MENU_FORMAL',
						'sortChild': [
							{
								'sort': this.$t('message.JobOpenings'),
								'url': '/career/job-openings',
								'icon': 'icon-zhaopin',
								'showType':'SEC_MENU_FORMAL_INFO'
							},
							{
								'sort': this.$t('message.ClosedJobs'),
								'url': '/career/closed-jobs',
								'icon': 'icon-guanbi',
								'showType':'SEC_MENU_FORMAL_DATA'
							}
						]
					},
					{
						'sort': this.$t('message.NewsContents'),
						'url': '/news',
						'icon': 'icon-xinwen',
						'showType': 'MENU_FORMAL',
						'sortChild': [
							{
								'sort': this.$t('message.NewsList'),
								'url': '/news/news-list',
								'icon': 'icon-gongsi',
								'showType':'SEC_MENU_FORMAL_INFO'
							}
							// {
							// 	'sort': this.$t('message.CompanyNews'),
							// 	'url': '/news/company-news',
							// 	'icon': 'icon-gongsi',
							// 	'showType':'SEC_MENU_FORMAL_INFO'
							// },
							// {
							// 	'sort': this.$t('message.IndustryNews'),
							// 	'url': '/news/industry-news',
							// 	'icon': 'icon-xingye',
							// 	'showType':'SEC_MENU_FORMAL_DATA'
							// }
						]
					}
				];
			}
		},
		'methods': {
			handleSelect (key) {
				this.activeUrl = key;
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="scoped" type="text/css">
	.left-box {
		box-shadow: 2px 0 8px 0 rgba(29,35,41,.05);
		&.dark {
			background: #001529;
			.logo-box {
				background: #001529;
				h1 {
					color: #fff;
				}
				.logo {
					color: #FFD700;
				}
			}
			.left-aside {
				background: #001529;
			}
		}
	}
	.logo-box {
		box-shadow: 0 1px 4px rgba(26, 29, 47, 0.08);
	}

	.left-aside {
		margin-top: 15px;
		padding: 0;
		background: #fff;
		overflow: hidden;
	}

	.logo-box {
		height: 60px;
		line-height: 50px;
		padding: 5px 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		background: #fff;
		h1 {
			display: inline-block;
			margin: 0;
			color: #1890ff;
			font-weight: 600;
			font-size: 16px;
			font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
			vertical-align: middle;
		}
		.logo {
			width: 40px;
			height: 50px;
			line-height: 50px;
			color: #d3222a;
		}
	}
</style>
