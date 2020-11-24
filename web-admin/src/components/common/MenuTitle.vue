<!--
内容：菜单栏title
作者：BOBO
日期：20191116
-->
<style scoped>
  .left-aside .iconfont {
    margin-right: 5px;
  }
  .title-overflow-style {
    display: inline-block;
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
<template>
  <div>
    <template v-if="foldFlag">
      <el-tooltip class="item" effect="light" :content="menu.sort" placement="right">
        <span class="iconfont f20" :class="menu.icon"></span>
      </el-tooltip>
    </template>
    <template v-else>
      <span v-if="type===1" class="iconfont" :class="menu.icon"></span>
      <span class="title-overflow-style">{{ menu.sort }}</span>
    </template>
  </div>
</template>

<script>
export default {
  name: "MenuTitle",
  props: {
    menu: { type: Object, default () { return {} }, required: true },
    foldFlag: { type: Boolean, required: true },
    type: { type: Number, required: true }
  }
}
</script>
