/*
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-08-25 17:15:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-25 17:17:35
 */
const { exec } = require('child_process')

module.exports = (url) => {
  switch (process.platform) {
    case 'darwin':
      exec(`open ${url}`)
      break
    case 'win32':
      exec(`start ${url}`)
      break
    default:
      break
  }
}
