<template>
  <footer id="footer">
    <div class="box">
      <div class="social mb10">
        <a class="github" href="https://github.com/bobo88" target="_blank" title="github">
          <img src="~/assets/images/github.png" alt="">
        </a>
        <b>站点声明：</b>所有文章未经授权禁止转载、摘编、复制或建立镜像，如有违反，追究法律责任。
      </div>
      <!-- 公安备案号 xxx -->
      <div class="copyright">
        Copyright © <a href="http://www.yuanbo-web.com/">www.yuanbo-web.com</a> All Rights Reserved. 备案号：
        <a href="http://www.beian.miit.gov.cn/" target="_blank">粤ICP备20058163号</a>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
  #footer {
    background: #373D41;
    width: 100%;
    border-top: #409eff 10px solid;
    padding: 30px 0;
    color: #777;
    font-size: 14px;
    a {
      color: #777;
    }
    .box {
      margin: 0 auto;
      width: 1200px;
      .social {
        line-height: 30px;
        text-align: center;
        font-size: 14px;
        vertical-align: middle;
        .github {
          display: inline-block;
          vertical-align: top;
          zoom: 1;
          padding: 7px 5px;
          opacity: .8;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          transition: all .28s ease;
          img {
            margin: 0 auto;
            display: block;
            width: 16px;
            height: 16px;
          }
        }
        b {
          color: #999;
          font-weight: bold;
          font-size: 14px;
        }
      }
      .copyright {
        text-align: center;
        a:hover {
          color: #409eff;
        }
      }
    }
  }
</style>
