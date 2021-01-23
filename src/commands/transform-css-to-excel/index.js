const fs = require('fs')
const css2json = require('./css2json')
const xlsx = require('node-xlsx')
const path = require('path')
const commandLine = require('../../command-line')

commandLine.setCommand('transform-css-to-xlsx', '将css文件转为xlsx', function (options) {
  // 1. 回应--help
  if (options[0] == '--help') {
    console.log('  命令格式为：css-to-xlsx <源文件路径>')
    return
  }
  // 2. 检查错误
  if (options.length < 1) {
    console.log('  参数错误，使用--help参数来查看帮助')
    return
  }
  // 3. 执行命令
  const resFilePath = options[0]
  transformCssToExcel(resFilePath)
})

const propertyOrder = [
  'position', 'top', 'right', 'bottom', 'left', 'z-index',
  'display', 'float', 'width', 'height',
  'font', 'font-family', 'line-height', 'color', 'text-align',
  'background-color', 'border', 'border-radius',
  'opacity'
]

propertyOrder.reverse()

function transformCssToExcel(resFilePath) {
  // 检查文件名
  const exname = path.extname(resFilePath)
  if (exname != '.css') {
    throw '文件名后缀不为.css，不予转换'
  }
  // 读取并转换
  fs.readFile(resFilePath, function (err, data) {
    if (err) {
      console.log(err)
      return
    }
    // 读取css文件，并转为json对象
    const cssString = data.toString()
    const result = css2json(cssString)
    const cssObject = result.cssObject
    const mediaAndFont = result.mediaAndFont
    // 获取所有属性
    const propertySet = new Set()
    Object.keys(cssObject).forEach(selector => {
      Object.keys(cssObject[selector]).forEach(property => {
        propertySet.add(property)
      })
    })
    const properties = [...propertySet]
    // 将属性按照指定的顺序排序
    properties.sort(function (a, b) {
      return propertyOrder.indexOf(b) - propertyOrder.indexOf(a)
    })
    // 获取所有选择器
    let selectors = Object.keys(cssObject)
    // 建立表格
    let table = []
    selectors.forEach(selector => {
      let row = []
      row.push(selector)
      properties.forEach(property => {
        if (cssObject[selector][property] != undefined) {
          row.push(cssObject[selector][property])
        } else {
          row.push('')
        }
      })
      table.push(row)
    })
    // 创建表头，组合到表中
    let caption = ['selector', ...properties]
    table = [caption, ...table]
    // 导出为excel
    let buffer = xlsx.build([
      {
        name: 'sheet1',
        data: table
      }
    ])
    const xlsxFileName = resFilePath + '.xlsx'
    const mediaAndFontCssFileName = resFilePath + '.mediaAndFont.css'
    fs.writeFileSync(xlsxFileName, buffer, { 'flag': 'w' })
    fs.writeFileSync(mediaAndFontCssFileName, mediaAndFont, { 'flag': 'w' })
    console.log('转换完成，目标文件为：')
    console.log(xlsxFileName)
    console.log(mediaAndFontCssFileName)
  })
}
