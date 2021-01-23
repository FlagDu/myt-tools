const commandLine = require('../../command-line')
const fs = require('fs')
const path = require('path')

commandLine.setCommand('make-depency-graph', '画出js项目中模块的依赖关系', function (options) {
  // 1. 回应--help
  if (options[0] == '--help') {
    console.log('  命令格式为：make-depency-graph <目录相对路径>',)
    return
  }
  // 2. 检查错误
  if (options.length != 1) {
    console.log('  参数错误，使用--help参数来查看帮助')
    return
  }
  // 3. 执行命令
  const resFilePath = options[0]
  makeDependencyGraph(resFilePath)
})

function makeDependencyGraph(relativePath) {
  dirPath = path.join(process.cwd(), relativePath)
  console.log('当前路径为' + dirPath);
  ergodicDir(dirPath);
  function ergodicDir(dirPath) {
    fs.readdir(dirPath, function (err, files) {
      if (err) {
        console.warn(err)
        return
      }
      files.forEach(function (fileName) {
        const absolutePath = path.join(dirPath, fileName)
        fs.stat(absolutePath, function (err, stats) {
          if (err) {
            console.warn(err)
            return
          }
          if (stats.isFile()) {
            const extname = path.extname(absolutePath)
            if (extname != '.js') {
              return
            }
            console.log(fileName, absolutePath)
            const content = fs.readFileSync(absolutePath, 'utf-8')
            //console.log(content);
            return
          }
          if (stats.isDirectory()) {
            ergodicDir(absolutePath)
            return
          }
        })
      })
    })

  }
}

