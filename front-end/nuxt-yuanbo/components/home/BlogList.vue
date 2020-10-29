<template>
  <div class="bloglist bgcolorF">
    <h2 class="htitle">
      个人博客<span class="hnav fr"><a href="#" target="_blank">更多</a></span>
    </h2>
    <!-- 列表 -->
    <ul>
      <li v-for="(item, index) in blogList" :key="index">
        <h3 class="blogtitle">
          <a :href="'/blog/one/' + item.id" target="_blank">{{ item.title }}</a>
        </h3>
        <span class="blogpic imgscale">
          <a v-if="item % 2 === 0" :href="'/blog/one/' + item.id" :title="item.title"><img src="~/assets/images/blog.png" :alt="item.title"></a>
          <a v-else :href="'/blog/one/' + item.id" :title="item.title"><img src="~/assets/images/blog2.png" :alt="item.title"></a>
        </span>
        <p class="blogtext">{{ item.content }}</p>
        <p class="bloginfo">
          <i class="avatar"><img src="~/assets/images/logo/avatar.png"></i>
          <span>袁波</span>
          <span>{{ item.createtime | dateFormatYyyyMmDd }}</span>
          <span>【<a href="/blog-list" target="_blank">个人博客</a>】</span>
        </p>
        <a :href="'/blog/one/' + item.id" class="viewmore">
          <el-button type="primary" size="mini">阅读更多</el-button>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BlogListComp',
  data () {
    return {
      blogList: []
    }
  },
  computed: {},
  created () {
    // 获取博客列表
    this.getBlogList()
  },
  mounted () {
    // xx
  },
  methods: {
    getBlogList () {
      this.$axios.get('/api/blog/list').then((res) => {
        console.log(res)
        if (res.data && res.data.code === 0) {
          this.blogList = res.data.data || []
        }
      })
    }
  }
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
