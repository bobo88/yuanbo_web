<template>
  <div class="card">
    <h2>袁波的名片</h2>
    <p>职业：程序员，Web前端工程师</p>
    <p>现居：广东省-深圳市</p>
    <p>Email：yuanboi88@163.com</p>
  </div>
</template>

<style lang="scss" scoped>
  .card {
    box-shadow: 0px 1px 0px rgba(255,255,255,.1), inset 0px 1px 1px rgba(0,0,0,.7);
    border-radius: 3px;
    background: rgba(42,42,42,1);
    height: 260px;
    overflow: hidden;
    margin-bottom: 20px;
    padding-top: 10px;
    h2 {
      font-size: 22px;
      margin: 10px;
      color: #888;
      font-weight: normal;
      padding-bottom: 10px;
    }
    p {
      font-size: 12px;
      padding: 0 0 0 20px;
      line-height: 28px;
      text-shadow: 0px 1px 2px rgba(0,0,0,.5);
      color: #d0d2d4;
      -webkit-animation: animations2 5s ease-in-out 5s;
      -moz-animation: animations2 5s ease-in-out 5s;
      -o-animation: animations2 5s ease-in-out 5s;
      -ms-animation: animations2 5s ease-in-out 5s;
      animation: animations2 5s ease-in-out 5s;
    }
  }
</style>
