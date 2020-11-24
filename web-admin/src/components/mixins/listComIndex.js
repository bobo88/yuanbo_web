/**
 * 自定义list-com相关功能配置
 */
export const CustomListComConfig = {
  name: "list-com",
  props: {
    dataSearch: {
      type: Object
    }
  },
  watch: {
    // dataSearch () {
    //   this.$nextTick(() => {
    //     this.getTableDataList({
    //       pageIndex :this.pageIndex,
    //       pageSize :this.pageSize
    //     });
    //   });
    // }
  },
  data() {
    return {
      total: 0,
      pageIndex: 1,
      pageSize: 10,
    };
  },
  mounted () {
    // 默认一进来就请求新闻列表数据
    this.getTableDataList();
  },
  methods: {
    cbPaginationPage (options) {
      this.getTableDataList(options);
    }
  }
};
