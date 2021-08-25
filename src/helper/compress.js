/*
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-08-24 17:57:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-24 18:05:23
 */
const { createGzip, createDeflate } = require('zlib')

module.exports = (rs, req, res) => {
  const acceptEncoding = req.headers['accept-encoding']
  if (!acceptEncoding || !acceptEncoding.match(/\b(gizp|deflate)\b/)) {
    return rs
  }
  if (acceptEncoding.match(/\bgizp\b/)) {
    res.setHeader('Content-Encoding', 'gzip')
    return rs.pipe(createGzip())
  }
  if (acceptEncoding.match(/\bdeflate\b/)) {
    res.setHeader('Content-Encoding', 'deflate')
    return rs.pipe(createDeflate())
  }
  return false
}
