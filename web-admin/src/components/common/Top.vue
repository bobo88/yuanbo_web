<template>
  <div class="top clearfix">
    <div class="col-xs-2 col-sm-2 col-md-2 top-left-wrap">
      <span class="toggle-short-aside vt" @click="toggleShort">
        <i class="iconfont fb" :class="foldFlag ? 'icon-cebianlandanchu' : 'icon-cebianlanshousuo'"></i>
      </span>
    </div>
    <div class="col-xs-10 col-sm-10 col-md-10 tr user-name">
      <template v-if="userName">
        {{ $t("message.welcome") }}, {{ userName }}！
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="iconfont icon-guanli f20" style="padding:0 5px;color:#333;"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-button class="f14" type="text" size="small" @click="changeMode"><span :class="{'currentMode': MODE ==='bright'}">亮色模式</span> / <span :class="{'currentMode': MODE ==='dark'}">暗色模式</span></el-button>
            </el-dropdown-item>
            <!-- <el-dropdown-item>
              <el-button class="f14" type="text" size="small" @click="changeLanguage"><span :class="{'currentLang': $i18n.locale ==='en'}">English</span> / <span :class="{'currentLang': $i18n.locale ==='zh'}">简体中文</span></el-button>
            </el-dropdown-item> -->
            <el-dropdown-item>
              <el-button class="f14" type="text" size="small" @click="signOut">Logout</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
      <span v-else>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="iconfont icon-guanli f20" style="padding:0 5px;color:#333;"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-button class="f14" type="text" size="small" @click="login">Login</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'top',
  props: ['foldFlag'],
	'inject': ['reload'],
	data () {
		return {
      title: this.Config.TITLE,
      userName: '',
      MODE: ''
		};
  },
  mounted: function () {
    this.$nextTick(() => {
      this.userName = this.$cookie.get('realname');
    });
  },
  created () {
    if (!localStorage.getItem('MODE')) {
      localStorage.setItem('MODE', 'bright');
      this.MODE = 'bright';
    } else {
      this.MODE = localStorage.getItem('MODE');
    }
  },
  methods: {
    // 改变页面外观模式： 清爽模式 / 暗黑模式
    changeMode () {
      if (this.MODE === 'bright') {
        localStorage.setItem('MODE', 'dark');
        this.MODE = 'dark';
      } else {
        localStorage.setItem('MODE', 'bright');
        this.MODE = 'bright';
      }
      this.$emit('cbMode', this.MODE);
    },
    changeLanguage () {
      if (this.$i18n.locale === 'en') {
        this.$i18n.locale = 'zh';
        localStorage.setItem('language', 'zh');
      } else {
        this.$i18n.locale = 'en';
        localStorage.setItem('language', 'en');
      }
    },
    // 退出登录
    async signOut () {
      let data = await this.Api.allApiEntry('logout', {});
			if (parseInt(data.code) === 0) {
				this.$store.commit(this.Constant.DELETE_LOGIN_DATA);
        // this.$localStore.remove('userAuthority');
        // this.$localStore.remove('authCountryScope');
        this.$localStore.remove('token');
        this.$router.push({
          'name': 'login',
          'params': { 'urlType': 0 }
        });
      }
    },
    toggleShort () {
      this.$emit('cb');
    },
    login () {
      this.$router.push({
        name: 'login',
        'params': { 'urlType': 0 }
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="scoped" type="text/css">
  .top {
    width: 100%;
    z-index: 5;
    height: 60px;
    line-height: 60px;
    color: #ccc;
    font-size: 18px;
    font-weight: 300;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.05);
    .top-left-wrap{
      padding: 0;
      height: 60px;
      background: $colorF;
    }
    .text-left{
      text-align: left;
      background: $mainColor;
    }
    .top-oprate {
      padding: 10px;
      font-size: 20px;
      font-weight: 300;
      cursor: pointer;
    }
    .user-name {
      height: 60px;
      color: $color3;
      font-size: 14px;
      background: $colorF;
    }
  }
  .currentLang {
    color: $subColor;
    font-weight: bold;
  }
  .currentMode {
    color: $subColor;
    font-weight: bold;
  }
  .toggle-short-aside {
    display: inline-block;
    padding: 0 20px;
    height: 60px;
    line-height: 60px;
    color: $color3;
    cursor: pointer;
  }
</style>
