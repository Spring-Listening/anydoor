/*
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-08-20 18:10:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-25 15:33:39
 */
const fs = require('fs')
const { promisify } = require('util')
const handlebars = require('handlebars')
const path = require('path')
const mime = require('./mime')
const compress = require('./compress')

const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const tplPath = path.join(__dirname, '../template/dir.tpl')
const source = fs.readFileSync(tplPath)
const template = handlebars.compile(source.toString())
// const config = require('../config/defaultConfig')
const range = require('./range')
const isFresh = require('./cache')
// eslint-disable-next-line func-names
module.exports = async function (req, res, filePath, config) {
  try {
    const stats = await stat(filePath)
    if (stats.isFile()) {
      const contentType = mime(filePath)
      res.setHeader('Content-Type', contentType)

      // 设置缓存拦截
      if (isFresh(stats, req, res)) {
        res.statusCode = 304
        res.end()
        return
      }

      let rs
      const { code, start, end } = range(stats.size, req, res)
      if (code === 200) {
        res.statusCode = 200
        rs = fs.createReadStream(filePath)
      } else {
        res.statusCode = 206
        rs = fs.createReadStream(filePath, { start, end })
      }
      if (filePath.match(config.compress)) {
        rs = compress(rs, req, res)
      }
      rs.pipe(res)
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath)
      console.log('files=====', files)
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      const dir = path.relative(config.root, filePath)
      console.log('dir=====', config.root)
      console.log('dir=====', filePath)
      console.log('dir=====', dir)
      const data = {
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : '',
        files: files.map((file) => {
          return {
            file,
            icon: mime(file)
          }
        })
      }
      console.log('data======', data)
      res.end(template(data))
    }
  } catch (error) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end(`${filePath} is not a diretory or file \n ${error.toString()}`)
    console.error(error)
  }
}
