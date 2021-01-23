const fs = require('fs')
const path = require('path')
const commandLine = require('../../command-line')

commandLine.setCommand('justify-md-title-level', '给md文件的所有标题进行升级或降级', function (options) {
  // 1. 回应--help
  if (options[0] == '--help') {
    console.log('  命令格式为：md-title-level <u（升级）|d（降级）> <源文件路径> <目标文件路径>')
    return
  }
  // 2. 检查错误
  if (options.length < 3) {
    console.log('  参数错误，使用--help参数来查看帮助')
    return
  }
  // 3. 执行命令
  const direction = options[0]
  const resFilePath = options[1]
  const desFilePath = options[2]
  justifyMdTitleLevel(direction, resFilePath, desFilePath)
})

/**
 *
 * @param {string} direction 操作，u表示升级，d表示降级
 * @param {string} resFilePath 源文件路径
 * @param {string} desFilePath 目标文件路径
 */
function justifyMdTitleLevel(direction, resFilePath, desFilePath) {
  // 检查文件名
  const exname = path.extname(resFilePath)
  if (exname != '.md') {
    throw '文件名后缀不为.md，不予转换'
  }
  // 检查文件是否存在
  // 读取文件
  fs.readFile(resFilePath, function (err, data) {
    if (err) {
      console.log('发生错误', err)
      return
    }
    let text = data.toString()
    // 如果是升级
    if (direction == 'u') {
      if (text[0] == '#') {
        text = text.substring(1)
      }
      text = text.replace(new RegExp('\\n#', 'gm'), '\n')
    }
    // 如果是降级
    else if (direction == 'd') {
      if (text[0] == '#') {
        text = '#' + text
      }
      text = text.replace(new RegExp('\\n#', 'gm'), '\n##')
    }
    // 如果参数有误
    else {
      console.log('输入指令有误')
      return
    }
    // 输出
    fs.writeFileSync(desFilePath, text)
    console.log('处理完毕')
  })
}
