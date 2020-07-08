<template>
  <div class="clearfix">
    <div class="banner-box">
      <div id="banner">
        <a href="#" title="袁波个人博客-test">
          <img src="~/assets/images/banner.png" alt="袁波个人博客-test">
        </a>
      </div>
    </div>

    <div class="headline-box">
      <ul>
        <li>
          <a href="#" title="袁波个人博客-test" target="_blank">
            <img src="~/assets/images/headline.jpg" alt="袁波个人博客-test">
            <span>袁波个人博客-test</span>
          </a>
        </li>
        <li>
          <a href="#" title="袁波个人博客-test" target="_blank">
            <img src="~/assets/images/headline2.jpg" alt="袁波个人博客-test">
            <span>袁波个人博客-test</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .banner-box {
    width: 68.5%;
    overflow: hidden;
    float: left;
    border-radius: 3px;
    margin-bottom: 20px;
  }
  .headline-box {
    width: 30%;
    float: right;
    overflow: hidden;
    ul {
      height: 260px;
      li {
        width: 100%;
        background: #000;
        overflow: hidden;
        height: 125px;
        margin-bottom: 10px;
        border-radius: 3px;
        position: relative;
        &:hover {
          img {
            transform: scale(1.1);
            opacity: 1;
          }
        }
        a {
          display: block;
          overflow: hidden;
          height: 100%;
        }
        img {
          width: 100%;
          height: 100%;
          -moz-transition: all .5s ease;
          -webkit-transition: all .5s ease;
          -ms-transition: all .5s ease;
          -o-transition: all .5s ease;
          transition: all .5s ease;
          transition: all 0.5s;
          opacity: .7;
        }
        span {
          bottom: 0;
          position: absolute;
          top: 30%;
          left: 0;
          right: 0;
          color: #FFF;
          text-align: center;
          font-size: 15px;
          margin-top: 5px;
          padding: 0 40px;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-height: 24px;
          height: 48px;
        }
      }
    }
  }
  #banner {
    width: 100%;
    height: 260px;
    overflow: hidden;
    float: left;
    background: #ccc;
    a {
      display: block;
      overflow: hidden;
      height: 100%;
      img {
        display: block;
        width: 100%;
        height: 100%;
        -moz-transition: all .5s ease;
        -webkit-transition: all .5s ease;
        -ms-transition: all .5s ease;
        -o-transition: all .5s ease;
        transition: all .5s ease;
        transition: all 0.5s;
        opacity: .7;
      }
    }
  }
</style>
