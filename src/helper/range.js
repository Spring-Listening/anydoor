/*
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-08-24 20:01:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-25 14:47:15
 */
module.exports = (totalSize, req, res) => {
  const { range } = req.headers
  if (!range) {
    return {
      code: 200
    }
  }
  const sizes = range.match(/bytes=(\d*)-(\d*)/)
  const end = sizes[2] || totalSize - 1
  const start = sizes[1] || totalSize - end
  if (start > end || start < 0 || end > totalSize) {
    return {
      code: 200
    }
  }

  res.setHeader('Accept-Ranges', 'bytes')
  res.setHeader('Content-Range', `bytes ${start}-${end}/${totalSize}`)
  res.setHeader('Content-Length', end - start)

  return {
    code: 206,
    start: global.parseInt(start),
    end: global.parseInt(end)
  }
}
