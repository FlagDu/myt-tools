
const fs = require('fs')
const path = require('path')

/**
 * 
 * @param {string} direction 操作，u表示升级，d表示降级
 * @param {string} resFilePath 源文件路径
 * @param {string} desFilePath 目标文件路径
 */
module.exports = function (direction, resFilePath, desFilePath) {
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