<template>
  <div class="wrapper">
    <!-- 全新布局 -->
    <el-container style="width:100%;height:100%;">
      <el-aside :width="foldFlag ? '100px' : '220px'" class="aside-wrap" style="height:100%; background:#fff;">
        <!-- UI库提供的滚动条组件 -->
        <!-- <el-scrollbar style="height: 100%;"> -->
        <left :data-short="foldFlag" style="height: 100%;" :class="MODE"></left>
        <!-- </el-scrollbar> -->
      </el-aside>
      <el-main style="padding:0;">
        <el-container style="height:100%;">
          <el-header style="padding:0;">
            <top @cb="toggleAside" @cbMode="changeMode" :data-short="foldFlag"></top>
          </el-header>

          <el-main style="padding:0;">
            <el-scrollbar style="width:100%; height: 100%;">
              <div class="content" :class="{'left-is-short': foldFlag}">
                <div class="col-xs-12 col-sm-12 col-md-12 main-cont-target" id="js-mainContTarget">
                  <div class="main-cont-wrapper">
                    <section class="cont-box">
                      <transition name="fade" mode="out-in">
                        <router-view/>
                      </transition>
                    </section>
                  </div>
                </div>
              </div>
            </el-scrollbar>
          </el-main>

          <!-- <el-footer style="height:50px; padding:0;overflow:hidden;">
            <footer class="main-footer" id="js-footBox">
              <div class="fr hidden-xs">
                <b>Version</b> 2.0.0
              </div>
              <strong>Copyright © 2018-2019.</strong> All rights reserved.
            </footer>
          </el-footer> -->
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import '@/fonts/iconfont.css'; // 使用 iconfont图标库
import Left from '../components/common/Left.vue';
import Top from '../components/common/Top.vue';

export default {
  components: {
    Left,
    Top
  },
  name: 'Mainer',
  beforeRouteEnter (to, from, next) {
    next(function (vm) {
      let minHight = 400;
      let bodyHight = minHight;
      if (document.body.clientHeight - 280 > minHight) {
        bodyHight = document.body.clientHeight - 280
      }
      console.log(bodyHight)
      vm.$store.commit('bodyHight', bodyHight);

      let loginData = {};
      loginData.UserName = vm.$cookie.get('akey');
			vm.$store.commit(vm.Constant.SET_LOGIN_DATA, loginData);
    })
  },
  mounted () {
    window.onresize = () => {
      console.log(11111)
      return (() => {
          let minHight = 400;
          let newBodyHeight = minHight;
          if (document.body.clientHeight - 280 > minHight) {
            newBodyHeight = document.body.clientHeight - 280
          }
          console.log(newBodyHeight)
          this.$store.commit('bodyHight', newBodyHeight);
        }
      )();
    }
  },
  data () {
    return {
      foldFlag: false,
      MODE: ''
    }
  },
  created () {
    this.MODE = localStorage.getItem('MODE') || 'bright';
  },
  methods: {
    changeMode (mode) {
      this.MODE = mode;
    },
    toggleAside () {
      this.foldFlag = !this.foldFlag;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="scoped" type="text/css">
  .content {
    margin-top: 15px;
    background: none repeat scroll 0 0 #f0f2f5;
    width: auto;
    box-sizing: border-box;
    overflow-y: auto;
  }
  .main-cont-target{
    height: 100%;
    overflow-y: auto;
  }
  .main-cont-wrapper {
    height: 100%;
    overflow-y: auto;
  }
  .main-cont-target {
    // padding-bottom: 60px;
  }
  .main-footer {
    box-sizing: border-box;
    background: #fff;
    padding: 10px;
    line-height: 28px;
    color: #444;
    border-top: 1px solid #d2d6de;
  }
  .cont-box {
    padding: 10px 15px 15px;
    background: #fff;
    // min-width: 1080px;
  }
  .aside-wrap {
    transition: all .2s;
  }
</style>
