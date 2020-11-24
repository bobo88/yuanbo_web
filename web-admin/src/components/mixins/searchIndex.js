/**
 * 自定义搜索相关功能配置
 */
export const CustomSearchConfig = {
  name: 'search-com',
  data() {
    return {
      visible: false
    };
  },
  methods: {
    close() {
      this.visible = false;
    },
    show() {
      this.visible = true;
    }
  }
};
