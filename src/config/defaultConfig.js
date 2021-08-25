/*
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-08-19 17:26:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-25 15:08:36
 */
module.exports = {
  root: process.cwd(),
  port: '3000',
  hostname: '127.0.0.1',
  compress: /\.(html|js|css|md)/,
  cache: {
    maxAge: 600,
    expires: true,
    cacheControl: true,
    lastModified: true,
    etag: true
  }
}
