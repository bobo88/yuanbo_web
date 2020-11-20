const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

const con = mysql.createConnection(MYSQL_CONF)

// 开始连接
con.connect()

function exec(sql) {
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if(err) {
        reject(err)
        return
      }
      // console.log(66, result)
      resolve(result)
    })
  })
  // console.log(88, promise)
  return promise
}

module.exports = {
  exec,
  escape: mysql.escape
}

