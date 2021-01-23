class CommandContext {
  /**
   * 构造函数
   */
  constructor() {
    // 设置一个初始命令：cls
    this.commandDict = {
      'cls': {
        description: '清空控制台',
        callback: () => {
          console.clear()
        }
      }
    }
  }
  /**
   * 设置命令
   * @param {*} commandName 命令名
   * @param {*} description 命令描述
   * @param {*} callback 命令回调
   */
  setCommand(commandName, description, callback) {
    if (this.commandDict[commandName]) {
      throw `命令${commandName}已存在`
    }
    this.commandDict[commandName] = {
      callback,
      description
    }
  }
  /**
   * 执行命令
   * @param {*} commandName 命令名
   * @param {*} options 命令参数
   */
  executeCommand(commandName, options) {
    if (commandName == 'show') {
      if (options.length == 0) {
        this.showCommands()
      } else {
        console.log('命令不存在，使用show命令可查看当前上下文中的命令')
      }
      return
    }
    const command = this.commandDict[commandName]
    if (command == undefined) {
      console.log('命令不存在，使用show命令可查看当前上下文中的命令')
      return
    }
    command.callback(options)
  }
  /**
   * 打印所有命令
   */
  showCommands() {
    for (let key in this.commandDict) {
      let command = this.commandDict[key]
      console.log(`  ● ${key} ${command.description}`)
    }
  }
}

class CommandLine {
  commandContextStack = [new CommandContext()]
  constructor() {
    console.log('[sys]控制台监听器启动中')
    // 1. 监听控制台
    const readline = require('readline')
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    rl.on('line', (line) => {
      // 解析line
      const fragments = line.split(' ')
      const commandName = fragments[0]
      const options = fragments.splice(1)
      // 执行命令
      this.executeCommand(commandName, options)
      // 执行完毕后，输出命令提示符，等待输入
      process.stdout.write('> ')
    })
    // 2. 输出命令提示符
    console.log('[sys]控制台监听器启动完毕')
    process.stdout.write('> ')
  }
  _getCurrentCommandContext() {
    const index = this.commandContextStack.length - 1
    return this.commandContextStack[index]
  }
  setCommand(commandName, description, callback) {
    const currentCommandContext = this._getCurrentCommandContext()
    currentCommandContext.setCommand(commandName, description, callback)
  }
  executeCommand(commandName, options) {
    const currentCommandContext = this._getCurrentCommandContext()
    currentCommandContext.executeCommand(commandName, options)
  }
  enterNewCommandContext() {
    this.commandContextStack.push(new CommandContext())
  }
  exitCurrentCommandContext() {
    this.commandContextStack.pop()
  }
}

module.exports = new CommandLine()

