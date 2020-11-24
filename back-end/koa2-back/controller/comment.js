const xss = require('xss')
const { exec } = require('../db/mysql')

const getListById = async (id) => {
  let sql = `SELECT * FROM comments WHERE blogId='${id}' `
  sql += `ORDER BY id DESC;`
  // 返回promise
  return await exec(sql)
}
const getListByPage = async (blogData = {}) => {
  const {pageIndex, blogId} = blogData;
  const username = xss(blogData.username)
  let pageSize = 20;
  let limitStart = pageSize * (pageIndex - 1);
  let sqlTotal = 'SELECT COUNT(*) as total FROM comments WHERE 1=1 ';
  let sql = `SELECT * FROM comments WHERE 1=1 `
  if (username) {
    sql += `AND username="${username}" `
    sqlTotal += `AND username="${username}" `
  }
  if (blogId) {
    sql += `AND blogId=${blogId} `
    sqlTotal += `AND blogId=${blogId} `
  }
  sql += `ORDER BY id DESC `
  if (pageIndex) {
    sql += `LIMIT ${limitStart}, ${pageSize} `
  } else {
    sql += `LIMIT 0, 10 `
  }
  sql += ';';
  sqlTotal += ';';
  // console.log('sql: ', sql)
  let rows = await exec(sqlTotal);
  return {
    total: rows[0].total || 0,
    list: await exec(sql)
  }
}
// 添加评论
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
// 编辑评论
const editComment = async (topicData = {}) => {
  const id = xss(topicData.id)
  const blogId = xss(topicData.blogId)
  const content = xss(topicData.content)
  const username = xss(topicData.username)
  const updateTime = Date.now()
  const sql = `UPDATE comments SET blogId='${blogId}', content='${content}', username='${username}', updateTime='${updateTime}' WHERE id=${id}`
  const updateData = await exec(sql)
  if (updateData.affectedRows > 0) {
    return true
  }
  return false
}
// 删除评论
const deleteComment = async (id) => {
  const sql = `DELETE FROM comments WHERE id=${id};`
  const deleteData = await exec(sql)
  if (deleteData.affectedRows > 0) {
    return true
  }
  return false
}

module.exports = {
  getListById,
  getListByPage,
  addComment,
  editComment,
  deleteComment
}
