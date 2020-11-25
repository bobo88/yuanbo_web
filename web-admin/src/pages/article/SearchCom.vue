<!--
  内容：文章管理 - 查询组件
  作者：BOBO
  日期： 20190827
-->
<template>
  <div class="search-com f12">
    <el-drawer
      title=""
      :visible.sync="visible"
      direction="rtl"
      @close="close"
     size="300px">
      <div class="search-cont">
        <!-- 查询组件 -->
        <div class="mb10">
          <span class="tit">分类:</span>
          <el-select clearable class="w150 mb5" size="mini" v-model="typeId" placeholder="请选择" @change="changeType">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="mb10">
          <span class="tit">所属专题:</span>
          <el-select clearable :disabled="+typeId !== 3" class="w150 mb5" size="mini" v-model="topicId" placeholder="请选择">
            <el-option
              v-for="item in dataTopic"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </div>

        <div class="mb10">
          <el-button size="mini" @click="search" type="primary" plain class="mb10">搜索</el-button>
          <el-button size="mini" @click="add" type="success" class="mb10">新增</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  import {CustomSearchConfig} from '@/components/mixins/searchIndex'
  export default {
    mixins: [CustomSearchConfig],
    props: {
      dataTopic: {
        type: Array
      }
    },
    data () {
      return {
        typeList: [
          {
            name: '个人博客',
            value: 1
          },
          {
            name: '程序人生',
            value: 2
          },
          {
            name: '专题版块',
            value: 3
          }
        ],
        typeId: '',
        topicId: ''
      }
    },
    methods: {
      changeType () {
        this.topicId = '';
      },
      add () {
        this.$emit('cbAdd');
        this.close();
      },
      // 点击搜索按钮，将查询数据回传到父组件
      search () {
        let options = {
          typeId: this.typeId,
          topicId: this.topicId
        };

        this.$emit('cbSearch', options);
        this.close();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="scoped" type="text/css">

</style>
