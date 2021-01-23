const fs = require('fs')
const xlsx = require('node-xlsx')
const path = require('path')
const commandLine = require('../../command-line')

commandLine.setCommand('transform-word-lib', '将xlsx文件的词库转为json格式', function (options) {
  // 1. 回应--help
  if (options[0] == '--help') {
    console.log('  命令格式为：transform-word-lib <文件路径>')
    return
  }
  // 2. 检查错误
  if (options.length < 1) {
    console.log('  参数错误，使用--help参数来查看帮助')
    return
  }
  // 3. 执行命令
  const resXlsxName = options[0]
  transformWordLib(resXlsxName)
})

/**
 * 将xlsx格式的词库转为json格式的
 * @param {resXlsxPath} resXlsxPath 源xlsx文件路径
 */
function transformWordLib(resXlsxPath) {
  // 检查文件名
  const exname = path.extname(resXlsxPath)
  if (exname != '.xlsx') {
    throw '文件名后缀不为.xlsx，不予转换'
  }
  // 读取文件
  const tableList = xlsx.parse(resXlsxPath)
  const table1Data = tableList[0].data
  // 转换
  const wordDict = {}
  table1Data.forEach(ele => {
    ele = ele.filter(item => typeof item == 'string')
    if (ele.length < 2) {
      console.log(ele)
    }
    wordDict[ele[0]] = ele[1]
  })
  //
  // 然后写入为json格式的文件
  const jsonString = JSON.stringify(wordDict)
  fs.writeFileSync('./word.json', jsonString, { 'flag': 'w' })
}
