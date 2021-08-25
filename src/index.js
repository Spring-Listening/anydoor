/*
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-08-25 16:20:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-25 16:42:47
 */
const yargs = require('yargs')
const Server = require('./app')

const { argv } = yargs
  .usage('anywhere [options]')
  .option('p', { alias: 'port', describe: '端口号', default: 9527 })
  .option('h', {
    alias: 'hostname',
    describe: 'host',
    default: '127.0.0.1'
  })
  .option('d', {
    alias: 'root',
    describe: 'root path',
    default: process.cwd()
  })
  .version()
  .alias('v', 'version')
  .help()

console.log(argv)
const server = new Server(argv)
server.start()
