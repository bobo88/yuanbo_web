const xss = require('xss')
const { exec } = require('../db/mysql')

//--------------------------------- BLOG -------------------------------------------------------------
// 1、API：-- 博客列表接口
const blogList = async (typeId, pageIndex, topicId) => {
  // console.log(typeId, pageIndex)
  let pageSize = 20;
  let limitStart = pageSize * (pageIndex - 1);
  let sqlTotal = 'SELECT COUNT(*) as total FROM blogs WHERE 1=1 ';
  let sql = `SELECT * FROM blogs WHERE 1=1 `
  if (typeId) {
    sql += `AND typeId=${typeId} `
    sqlTotal += `AND typeId=${typeId} `
  }
  if (topicId) {
    sql += `AND topicId=${topicId} `
    sqlTotal += `AND topicId=${topicId} `
  }
  sql += `ORDER BY id DESC `
  if (pageIndex) {
    sql += `LIMIT ${limitStart}, ${pageSize} `
  } else {
    sql += `LIMIT 0, 5 `
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

// 2、API：-- 博客详情接口
const getDetail = async (id) => {
  const sql = `SELECT * FROM blogs WHERE id='${id}'`
  const rows = await exec(sql)
  return rows[0]
}

const addBlog = async (blogData = {}) => {
  const title = xss(blogData.title) || ''
  const brief = xss(blogData.brief) || ''
  const content = xss(blogData.content) || ''
  const author = xss(blogData.author) || ''
  const hot = xss(blogData.hot) || 0
  const source = xss(blogData.source) || ''
  const typeId = xss(blogData.typeId) || 0
  const banner = xss(blogData.banner) || ''
  const topicId = xss(blogData.topicId) || 0
  const createTime = Date.now()
  const sql = `
  INSERT INTO blogs (title, brief, content, author, hot, source, typeId, banner, topicId, createTime)
  VALUES ('${title}', '${brief}', '${content}', '${author}', '${hot}', '${source}', '${typeId}', '${banner}', '${topicId}', '${createTime}')
  `
  const insertData = await exec(sql)
  if (insertData.affectedRows > 0) {
    return true
  }
  return false
}

const updateBlog = async (blogData = {}) => {
  const id = xss(blogData.id) || 0
  const title = xss(blogData.title) || ''
  const brief = xss(blogData.brief) || ''
  const content = xss(blogData.content) || ''
  const author = xss(blogData.author) || ''
  const hot = xss(blogData.hot) || 0
  const source = xss(blogData.source) || ''
  const typeId = xss(blogData.typeId) || 0
  const banner = xss(blogData.banner) || ''
  const topicId = xss(blogData.topicId) || 0
  const updateTime = Date.now()
  const sql = `UPDATE blogs SET 
  title='${title}', brief='${brief}', updateTime='${updateTime}', 
  content='${content}', author='${author}', hot='${hot}', 
  source='${source}', typeId='${typeId}', banner='${banner}', 
  topicId='${topicId}' where id=${id}`
  const updateData = await exec(sql)
  if (updateData.affectedRows > 0) {
    return true
  }
  return false
}

const deleteBlog = async (id) => {
  const sql = `DELETE FROM blogs WHERE id=${id};`
  const deleteData = await exec(sql)
  if (deleteData.affectedRows > 0) {
    return true
  }
  return false
}

//--------------------------------- RANK -------------------------------------------------------------
// 3、API：-- 博客排名列表接口
const rankList = async (type) => {
  let pageSize = 8;
  let sql = `SELECT * FROM blogs WHERE 1=1 `
  if (type) {
    sql += `AND typeId=${type} `
  }
  sql += `ORDER BY hot DESC `
  sql += `LIMIT 0, ${pageSize} `
  sql += ';';
  return {
    list: await exec(sql)
  }
}

//--------------------------------- topic -------------------------------------------------------------
// 4、API：-- 博客专题列表接口
const getTopicList = async (id) => {
  const sql = `SELECT * FROM topictype;`
  console.log(58, sql)
  return  {
    list: await exec(sql)
  }
}
// 5、API：-- Add 专题分类接口
const addTopicType = async (topicData = {}) => {
  const title = xss(topicData.title)
  const description = xss(topicData.description)
  const createTime = Date.now()
  const sql = `
    INSERT INTO topictype (title, description, createTime)
    VALUES ('${title}', '${description}', '${createTime}')
  `
  const insertData = await exec(sql)
  return {
    id: insertData.insertId
  }
}
// 6、API：-- edit 专题分类接口
const editTopicType = async (topicData = {}) => {
  const id = xss(topicData.id)
  const title = xss(topicData.title)
  const description = xss(topicData.description)
  const updateTime = Date.now()
  const sql = `UPDATE topictype SET title='${title}', description='${description}', updateTime='${updateTime}' WHERE id=${id}`
  const updateData = await exec(sql)
  if (updateData.affectedRows > 0) {
    return true
  }
  return false
}
// 7、API：-- delete 专题分类接口
const deleteTopicType = async (id) => {
  const sql = `DELETE FROM topictype where id=${id};`
  const deleteData = await exec(sql)
  if (deleteData.affectedRows > 0) {
    return true
  }
  return false
}

module.exports = {
  blogList,
  getDetail,
  addBlog,
  updateBlog,
  deleteBlog,
  rankList,
  getTopicList,
  addTopicType,
  editTopicType,
  deleteTopicType
}
