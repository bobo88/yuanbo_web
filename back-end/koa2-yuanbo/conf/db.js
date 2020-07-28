const env = process.env.NODE_ENV

// 配置
let MYSQL_CONF

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: '3306',
    database: 'yuanbo_web'
  }
}

if (env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: '3306',
    database: 'yuanbo_web'
  }
  // MYSQL_CONF = {
  //   host: 'rm-2ze3600k407b420lhno.mysql.rds.aliyuncs.com',
  //   user: 'yuanbo_web',
  //   password: 'woailaopo_1209',
  //   port: '3306',
  //   database: 'yuanbo_web'
  // }
}

module.exports = {
    MYSQL_CONF
}
