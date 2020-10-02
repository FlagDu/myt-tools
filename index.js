const commandContextManager = require('./lib/command-context')
const mdTitleLevel = require('./tools-lib/md-title-level')
const cssToExcel = require('./tools-lib/css-to-excel')
// 注册顶层命令
commandContextManager.setCommand('md-title-level', '给md文件的所有标题进行升级或降级', function (options) {
  // 如果是--hlep
  if (options[0] == '--help') {
    console.log('  命令格式为：md-title-level <u（升级）|d（降级）> <源文件路径> <目标文件路径>')
    return
  }
  // 如果命令行参数少于三个
  if (options.length < 3) {
    console.log('  参数错误，使用--help参数来查看帮助')
    return
  }
  // 获取参数
  const direction = options[0]
  const resFilePath = options[1]
  const desFilePath = options[2]
  // 执行命令
  mdTitleLevel(direction, resFilePath, desFilePath)
})
commandContextManager.setCommand('css-to-xlsx', '将css文件转为xlsx', function (options) {
  // 如果是--hlep
  if (options[0] == '--help') {
    console.log('  命令格式为：css-to-xlsx <源文件路径>')
    return
  }
  // 如果命令行参数少于三个
  if (options.length < 1) {
    console.log('  参数错误，使用--help参数来查看帮助')
    return
  }
  // 获取参数
  const resFilePath = options[0]
  // 执行命令
  cssToExcel(resFilePath)
})



// 监听控制台
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
process.stdout.write('> ')
rl.on('line', function (line) {
  // 解析line
  const fragments = line.split(' ')
  const commandName = fragments[0]
  const options = fragments.splice(1)
  // 执行命令
  commandContextManager.executeCommand(commandName, options)
  // 执行完毕后，输出命令提示符，等待输入
  process.stdout.write('> ')
})