<template>
  <div class="bloglist bgcolorF">
    <h2 class="htitle">
      个人博客<span class="hnav fr"><a href="#" target="_blank">更多</a></span>
    </h2>
    <!-- 列表 -->
    <ul>
      <li v-for="item in blogList" :key="item">
        <h3 class="blogtitle">
          <a href="#" target="_blank">博客内容Test</a>
        </h3>
        <span class="blogpic imgscale">
          <a v-if="item % 2 === 0" href="#" title="博客内容Test"><img src="~/assets/images/blog.png" alt="博客内容Test"></a>
          <a v-else href="#" title="博客内容Test"><img src="~/assets/images/blog2.png" alt="博客内容Test"></a>
        </span>
        <p class="blogtext">事实上，在去年的双十一狂欢节上，阿里云的拼团大行动就引发业内的轰动，无论是成交量还是影响力，都令国内其他云品牌为之汗颜!那么，今年双十一阿里云拼团活动又有哪些优惠消息呢? </p>
        <p class="bloginfo">
          <i class="avatar"><img src="~/assets/images/logo/avatar.png"></i>
          <span>袁波</span>
          <span>2019-10-24</span>
          <span>【<a href="#" target="_blank">个人博客</a>】</span>
        </p>
        <a href="#" class="viewmore">
          <el-button type="primary" size="mini">阅读更多</el-button>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      blogList: 6
    }
  },
  computed: {},
  created () {
    // xx
  },
  mounted () {
    // xx
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  .bloglist {
    background: #fff;
    border-radius: 3px;
    padding: 20px;
    margin-bottom: 20px;
    overflow: hidden;
    ul {
      padding-top: 10px;
      li {
        overflow: hidden;
        margin-bottom: 20px;
        border-bottom: #eee 1px dashed;
        padding-bottom: 20px;
        position: relative;
        min-height: 120px;
        &:hover {
          .blogtitle {
            a {
              color: #409eff;
            }
          }
        }
      }
      .blogtitle {
        margin: 0 0 10px 0;
        font-size: 18px;
        overflow: hidden;
      }
      .blogpic {
        float: left;
        width: 23.2%;
        margin-right: 20px;
        display: block;
        overflow: hidden;
        border-radius: 3px;
        position: relative;
      }
      .imgscale {
        &:hover {
          img {
            transform: scale(1.1);
          }
        }
        img {
          width: 100%;
          -moz-transition: all .5s ease;
          -webkit-transition: all .5s ease;
          -ms-transition: all .5s ease;
          -o-transition: all .5s ease;
          transition: all .5s ease;
          transition: all 0.5s;
        }
      }
      .blogtext {
        font-size: 14px;
        color: #666;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        margin-top: 20px;
      }
      .bloginfo {
        margin-top: 20px;
        overflow: hidden;
        color: #999;
        line-height: 34px;
        span {
          margin: 0 5px;
          a {
            color: #096;
          }
        }
      }
      .avatar {
        position: relative;
        float: left;
        padding: 3px;
        width: 30px;
        height: 30px;
        border-radius: 100%;
        display: block;
        background: #888;
        text-align: center;
        img {
          width: 80%;
          border-radius: 50%;
          height: 24px;
        }
      }
      a.viewmore {
        display: block;
        right: 10px;
        bottom: 20px;
        position: absolute;
        color: #fff;
        border-radius: 3px;
      }
    }
  }
</style>
