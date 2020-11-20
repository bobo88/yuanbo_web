// const xss = require('xss')
const { exec } = require('../db/mysql')

const blogList = async (type, pageNum) => {
  console.log(type, pageNum)
  let pageSize = 20;
  let limitStart = pageSize * (pageNum - 1);
  let sqlTotal = 'SELECT COUNT(*) as total FROM blogs WHERE 1=1 ';
  let sql = `SELECT * FROM blogs WHERE 1=1 `
  if (type) {
    sql += `AND typeId=${type} `
    sqlTotal += `AND typeId=${type};`
  }
  sql += `ORDER BY id DESC `
  if (pageNum) {
    sql += `LIMIT ${limitStart}, ${pageSize} `
  }
  sql += ';';
  // console.log('sql: ', sql)
  let rows = await exec(sqlTotal);
  // 返回promise
  return {
    total: rows[0].total || 0,
    list: await exec(sql)
  }
}

const getDetail = async (id) => {
  const sql = `select * from blogs where id='${id}'`
  const rows = await exec(sql)
  return rows[0]
}

// const newBlog = async (blogData = {}) => {
//   // const { title, content, author } = blogData
//   const title = xss(blogData.title)
//   const content = xss(blogData.content)
//   const author = xss(blogData.author)
//   const createTime = Date.now()
//   const sql = `
//     insert into blogs (title, content, createTime, author)
//     values ('${title}', '${content}', '${createTime}', '${author}')
//   `
//   const insertData = await exec(sql)
//   return {
//     id: insertData.insertId
//   }
// }

// const updateBlog = async (id, blogData = {}) => {
//   // const { title, content } = blogData
//   const title = xss(blogData.title)
//   const content = xss(blogData.content)
//   const sql = `
//     update blogs set title='${title}', content='${content}' where id=${id}
//   `
//   const updateData = await exec(sql)
//   if (updateData.affectedRows > 0) {
//     return true
//   }
//   return false
// }

// const delBlog = async (id, author) => {
//   console.log('del blog data..', id)
//   const sql = `
//     delete from blogs where id=${id} and author='${author}'
//   `
//   const deleteData = await exec(sql)
//   if (deleteData.affectedRows > 0) {
//     return true
//   }
//   return false
// }

module.exports = {
  blogList,
  getDetail
  // newBlog,
  // updateBlog,
  // delBlog
}
