const xss = require('xss')
const { exec } = require('../db/mysql')

const getListById = async (id) => {
  let sql = `SELECT * FROM comments WHERE blogId='${id}' `
  sql += `ORDER BY id DESC;`
  // 返回promise
  return await exec(sql)
}

const addComment = async (commentData = {}) => {
  const blogId = xss(commentData.blogId)
  const content = xss(commentData.content)
  const username = xss(commentData.username)
  const createTime = Date.now()
  const sql = `
    INSERT INTO comments (blogId, content, createTime, username)
    VALUES ('${blogId}', '${content}', '${createTime}', '${username}')
  `
  const insertData = await exec(sql)
  return {
    id: insertData.insertId
  }
}

// const updateComment = async (id, blogData = {}) => {
//   // const { title, content } = blogData
//   const title = xss(blogData.title)
//   const content = xss(blogData.content)
//   const sql = `
//     update comments set title='${title}', content='${content}' where id=${id}
//   `
//   const updateData = await exec(sql)
//   if (updateData.affectedRows > 0) {
//     return true
//   }
//   return false
// }

const delComment = async (id, author) => {
  console.log('del blog data..', id)
  const sql = `
    DELETE FROM comments WHERE id=${id} AND author='${author}'
  `
  const deleteData = await exec(sql)
  if (deleteData.affectedRows > 0) {
    return true
  }
  return false
}

module.exports = {
  getListById,
  addComment
  // updateComment,
  // delComment
}
