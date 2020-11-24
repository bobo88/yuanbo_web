/**
 * 自定义列相关功能配置
 */
export const CustomColumnConfig = {
  data() {
    return {
      defaultCustomizeDataList: {},
      dataSearchOptions: {}
    }
  },
  created() {
    // x
  },
  methods: {
    handleShowSearch(){
      this.$refs.searchComRef.show();
    },
    // 搜索 - 回调函数
    searchInformationCb(options) {
      this.dataSearchOptions = options;
    }
  }
};