<template>
  <div class="comment-box">
    <h2>评论</h2>

    <div class="comment-textarea-box">
      <el-input
        v-model="comment"
        class="comment-textarea"
        type="textarea"
        resize="none"
        :rows="3"
        placeholder="说点什么好听的...">
      </el-input>

      <div class="comment-tools clearfix">
        <span class="inline-block submit-btn ml10">
          <el-button class="w100Percent btn" type="primary" round @click="addComment(dataDetail.id)">发布</el-button>
        </span>
        <span class="inline-block w150 username">
          <i class="el-input__icon el-icon-user"></i>
          <el-input
            class="inline-block"
            placeholder="你的昵称"
            v-model="nickname">
          </el-input>
        </span>
      </div>
    </div>

    <div class="comment-list-box">
      <p class="list-header">
        <!-- <em class="blog-joinnum">{{ dataDetail.hot || 0 }}</em>人参与， -->
        共 <em class="blog-totalnum">{{ commentListData.length || 0 }}</em>条评论
      </p>

      <ul class="comment-list">
        <li v-for="(item, index) in commentListData" :key="index">
          <div class="show-box clearfix">
            <div class="user-pic" :style="{'background': randomBgColor[index%randomBgColor.length]}">
              <span class="inline-block icon el-icon-user-solid"></span>
            </div>
            <div class="comment-info">
              <p class="user-title">
                <span>{{ item.username || '匿名读友' }}</span>
                <span class="sub-time">{{ item.createTime | formatYmdhmsTime }}</span>
              </p>
              <p class="comment-text">{{ item.content }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataDetail: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      commentListData: [],
      randomBgColor: ['#397b87', '#f77949', '#803dda', '#fa8387', '#3ad1c0', '#ed5f5d', '#f8d90d'],
      comment: '',
      nickname: ''
    }
  },
  computed: {},
  created () {
    // xx
  },
  mounted () {
    // xx
  },
  watch: {
    dataDetail (val) {
      if (val.id) {
        // 获取文章评论列表
        this.getBlogCommentById()
      }
    }
  },
  methods: {
    // 根据博客文章ID获取评论列表
    getBlogCommentById () {
      this.$axios.get('/api/comment/list?id=' + this.dataDetail.id).then((res) => {
        console.log(res)
        if (res.data && res.data.code === 0) {
          this.commentListData = res.data.data || []
        }
      })
    },
    // 添加评论
    addComment (blogId) {
      if (!this.comment) {
        console.log(this)
        this.$message({
          showClose: true,
          message: '评论内容不能为空哦',
          type: 'warning'
        })
        return
      }
      const options = {
        blogId: blogId,
        content: this.comment,
        username: this.nickname
      }
      this.$axios.post('/api/comment/add', options).then((res) => {
        console.log(res)
        if (res.data && res.data.code === 0) {
          this.comment = ''
          // 重新 获取文章评论列表
          this.getBlogCommentById()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .comment-box {
    h2 {
      font-size: 18px;
      font-weight: normal;
      padding: 5px 0;
      margin: 20px 0 10px;
      position: relative;
      border-top: #ccc 2px solid;
      border-bottom: #ececec 1px solid;
      color: #333333;
    }
  }
  .submit-btn {
    float: right;
    width: 100px;
    .btn {
      height: 40px;
      line-height: 16px;
    }
  }
  .comment-list-box {
    .list-header {
      padding: 20px 0;
      .blog-joinnum, .blog-totalnum {
        margin-right: 4px;
        color: #f60;
        font-family: Arial;
      }
    }
    .comment-list {
      li {}
      .show-box {
        margin: 30px 0;
        padding: 0 0 0 60px;
        clear: both;
        border-bottom: 1px solid #f1f1f1;
        padding-bottom: 20px;
      }
      .user-pic {
        margin-left: -60px;
        float: left;
        width: 42px;
        height: 42px;
        line-height: 42px;
        background: #ccc;
        border-radius: 100%;
        text-align: center;
        vertical-align: bottom;
        opacity: 0.7;
        .icon {
          font-size: 24px;
          color: #fff;
        }
      }
      .comment-info {
        float: right;
        width: 100%;
        .user-title {
          margin-bottom: 10px;
          span {
            color: #444;
            font-size: 14px;
            font-weight: 700;
          }
          .sub-time {
            color: #aaa;
            font-size: 12px;
            font-weight: 500;
          }
        }
        .comment-text {
          line-height: 26px;
          font-size: 14px;
          word-wrap: break-word;
          color: #555;
        }
      }
    }
  }
</style>
