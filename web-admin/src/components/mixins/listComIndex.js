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
    dataSearch () {
      this.$nextTick(() => {
        this.getDataList({
          pageIndex :this.pageIndex,
          pageSize :this.pageSize
        });
      });
    }
  },
  data() {
    return {
      emptyText: '暂无数据',
      multipleSelection: [],
      loading: false,
      total: 0,
      pageIndex: 1,
      pageSize: 20
    };
  },
  mounted () {
    // 默认一进来 请求列表数据
    this.getDataList();
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    cbPaginationPage (options) {
      this.getDataList(options);
    }
  }
};
