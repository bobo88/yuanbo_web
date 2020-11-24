
<template>
  <div class="login-component pop-ups clearfix" :style='{backgroundImage}'>
    <transition name="fade">
      <div class="col-xs-8 col-sm-6 col-md-4 pop-ups-cont">
        <main class="main-wrap pt30" style="margin:0 auto; width:80%;">
          <p class="item-form logo-box">
            <span class="inline-block iconfont icon-taiyang f30 vm mr20 logo"></span>
            <span class="logo-text">yuanbo-web Admin</span>
          </p>
          <p class="item-form">
            <el-input type="input" size="small" v-model.trim="username" placeholder="username"
              @keyup.enter.native="login" ></el-input>
          </p>
          <p class="item-form">
            <el-input type="password" size="small" v-model.trim="password" placeholder="password"
              @keyup.enter.native="login" ></el-input>
          </p>
        </main>

        <footer class="footer-wrap">
          <div class="clearfix">
            <el-button size="small" type="primary" style="width: 80%;" @click="login">Login</el-button>
          </div>
          <p class="error-msg">{{ msgCont }}</p>
        </footer>
      </div>
    </transition>

  </div>
</template>

<script>

export default {
	'name': 'login',
	data () {
		return {
			'isLoging': false,
			'backgroundImage': '',
			'username': '',
			'password': '',
			'msgCont': '',
			'loading': false,
			'title': this.Config.TITLE
		};
	},

	mounted () {
		this.$localStore.remove('token');
		this.$cookie.remove('akey');
		this.showLogin = true;
		this.$nextTick(() => {
			if (this.$route.params) {
				if (parseInt(this.$route.params.urlType) === 1) {
					window.location.reload();
				}
			}
			let num = Math.ceil(Math.random() * 4);
			//注意，vue-cli3.0搭建的项目获取图片得用require获取
			let img = require('assets/img/bg_' + num + '.jpg');
			this.backgroundImage = 'url(' + img + ')';
		});
	},
	'methods': {
		async login () {
			let loginOptions = {
				'username': this.username,
				'password': this.password
			};
			if (!this.username) {
				this.msgCont = '用户名不能为空!';
				return;
			}
			if (!this.password) {
				this.msgCont = '密码不能为空!';
				return;
			}
      let data = await this.Api.allApiEntry('login', loginOptions);
      // console.log(121212, data)
			if (parseInt(data.code) === 0) {
				let loginData = {};
				loginData.UserName = data.data && data.data.username;
				loginData.RealName = data.data && data.data.realname;
				this.username = '';
				this.password = '';
				this.$store.commit(this.Constant.SET_LOGIN_DATA, loginData);

				// this.$localStore.set('token',data.data.token);
				// this.$localStore.set('userAuthority',[].concat(data.data.menuPerms).concat(data.data.interfacePerms));
				// this.$localStore.set('authCountryScope',data.data.authCountryScope);
				this.$router.push({
					'name': 'Home'
				});
			} else {
				this.Api.handleError(data);
				this.$router.push({
					'name': 'login',
					'params': { 'urlType': 0 }
				});
			}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="scoped" type="text/css">
.pop-ups {
  position: fixed;
  z-index: 999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  color: $colorF;
}

.pop-ups-cont {
  position: absolute;
  z-index: 9999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 280px;
  color: #000;
  background: $bgF;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;

  .state-icon {
    padding: 20px 0;
  }

  .iconfont {
    font-size: 36px;
  }

  .icon-touxiang {
    color: rgb(94, 191, 183);
  }

  .main-wrap {
    .title {
      margin: 0 0 10px;
      padding: 0;
      line-height: 30px;
      color: $color3;
      font-size: 20px;
    }
    .item-form {
      margin: 0 0 10px 0;
    }

    .tips {
      line-height: 20px;
      color: $color9;
      font-size: 14px;
    }
  }
  .error-msg {
    padding-top: 5px;
    line-height: 20px;
    color: $colorRed;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.logo-box {
  display: flex;
  align-items: center;
  .logo {
    width: 40px;
    height: 50px;
    line-height: 50px;
    color: #FFD700;
  }
  .logo-text {
    font-size: 18px;
    color: #66b1ff;
    font-weight: bold;
  }
}

</style>
