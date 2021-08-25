/*
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-08-19 16:19:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-25 17:21:34
 */
const http = require('http')
const path = require('path')
const chalk = require('chalk')

const route = require('./helper/route')
const openUrl = require('./helper/openUrl')
// const { port, hostname, root } = require('./config/defaultConfig')

class Server {
  constructor(config) {
    this.conf = { ...config }
  }

  start() {
    const server = http.createServer((req, res) => {
      const { url } = req
      const filePath = path.join(this.conf.root, url)
      console.log(filePath)
      route(req, res, filePath, this.conf)
    })

    server.listen(this.conf.port, this.conf.hostname, () => {
      console.log(
        chalk.greenBright(`Server running at http://${this.conf.hostname}:${this.conf.port}/`)
      )
      openUrl(`http://${this.conf.hostname}:${this.conf.port}/`)
    })
  }
}

module.exports = Server
