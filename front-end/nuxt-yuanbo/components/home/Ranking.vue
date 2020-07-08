<template>
  <div class="ranking bgcolorF">
    <h2 class="htitle">点击排行</h2>
    <ul>
      <li><i></i><a href="#" title="yuanbo-web.com" target="_blank">个人博客yuanbo-web.com</a></li>
      <li><i></i><a href="#" title="yuanbo-web.com" target="_blank">个人博客yuanbo-web.com</a></li>
      <li><i></i><a href="#" title="yuanbo-web.com" target="_blank">个人博客yuanbo-web.com</a></li>
      <li><i></i><a href="#" title="yuanbo-web.com" target="_blank">个人博客yuanbo-web.com</a></li>
      <li><i></i><a href="#" title="yuanbo-web.com" target="_blank">个人博客yuanbo-web.com</a></li>
      <li><i></i><a href="#" title="yuanbo-web.com" target="_blank">个人博客yuanbo-web.com</a></li>
      <li><i></i><a href="#" title="yuanbo-web.com" target="_blank">个人博客yuanbo-web.com</a></li>
      <li><i></i><a href="#" title="yuanbo-web.com" target="_blank">个人博客yuanbo-web.com</a></li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  .ranking {
    background: #fff;
    border-radius: 3px;
    padding: 20px;
    margin-bottom: 20px;
    overflow: hidden;
    ul {
      overflow: hidden;
      li {
        height: 30px;
        line-height: 30px;
        margin-bottom: 10px;
        padding-left: 5px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        &:nth-child(even) {
            background: #f6f6f6;
        }
        &:first-child i, &:nth-child(2) i, &:nth-child(3) i {
          background: #409eff;
        }
        &:first-child i::before {
          content: "1";
        }
        &:nth-child(2) i::before {
          content: "2";
        }
        &:nth-child(3) i::before {
          content: "3";
        }
        &:nth-child(4) i::before {
          content: "4";
        }
        &:nth-child(5) i::before {
          content: "5";
        }
        &:nth-child(6) i::before {
          content: "6";
        }
        &:nth-child(7) i::before {
          content: "7";
        }
        &:nth-child(8) i::before {
          content: "8";
        }
        i {
          display: block;
          width: 16px;
          height: 16px;
          background: #B1B1B1;
          float: left;
          margin-top: 8px;
          margin-right: 10px;
          position: relative;
          font-style: normal;
          &::before {
            position: absolute;
            left: 0;
            top: 0;
            font-size: 9px;
            color: #fff;
            line-height: 16px;
            width: 16px;
            text-align: center;
          }
        }
      }
    }
  }
</style>
