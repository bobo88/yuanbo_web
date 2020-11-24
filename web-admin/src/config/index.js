/**
 * 配置文件：用于配置相关参数，如网络请求地址、静态资源的访问路径等
 */


const config = {};


/**
 * 网页的请求域名
 */
config.DOMAIN_HTML = process.env.VUE_APP_DOMAIN_HTML;

/**
 * 网页的文件上传请求域名
 */

/**
 * 项目的主题
 */
config.TITLE = process.env.VUE_APP_TITLE;

/**
 * 静态资源的请求域名
 */
config.DOMAIN_RESOURCE = process.env.VUE_APP_DOMAIN_RESOURCE;


/**
 * API的请求地址（不包括API名称），必须/结尾
 * 示例：http://dev.api.com/v1/
 * @type {string}
 */
config.API_BASE_URL = process.env.VUE_APP_API_BASE_URL + '/api/';

/**
     * to注册API
     * @type {string}
     */
config.API_REGISTER_URL= process.env.VUE_APP_API_BASE_URL + process.env.VUE_APP_REGISTER_URL,
/**
     * to申请权限API
     * @type {string}
     */
config.API_PERMISSION_URL= process.env.VUE_APP_API_BASE_URL + process.env.VUE_APP_PERMISSION_URL,

config.API_BASE_URL_AUTHORIZ = process.env.VUE_APP_API_BASE_URL_AUTHORIZ;

/**
 * API请求的超时时间（普通），单位：毫秒（ms）
 * @type {number}
 */
config.API_NORMAL_TIMEOUT = process.env.VUE_APP_API_NORMAL_TIMEOUT * 1000;

/**
 * API请求的超时时间（上传），单位：秒（s）
 * @type {number}
 */
config.API_UPLOAD_TIMEOUT = process.env.VUE_APP_API_UPLOAD_TIMEOUT;

/**
 * 系统的DEBUG状态：
 * 开启则会出现一些DEBUG的提示信息或工具按钮等，以便于更好的开发调试
 * @type {boolean}
 */
config.DEBUG = process.env.VUE_APP_DEBUG;


/**
 * 用户登录身份id
 * @type {string|number}
 */
config.USER_ID = process.env.VUE_APP_USER_ID;

/**
 * 用户登录身份token
 * @type {string|string}
 */
config.USER_TOKEN = process.env.VUE_APP_USER_TOKEN;

config.TEST_API = process.env.VUE_APP_TEST_API;


export default config;

