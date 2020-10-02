class CommandContext {
  constructor () {
    this.commandDict = {
      // 每个命令上下文都有以下命令
      'cls': {
        description: '清空控制台',
        callback: () => {
          console.clear()
        }
      }
    }
  }
  setCommand (commandName, description, callback) {
    if (this.commandDict[commandName]) {
      throw `命令${commandName}已存在`
    }
    this.commandDict[commandName] = {
      callback,
      description
    }
  }
  executeCommand (commandName, options) {
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
  showCommands () {
    for (let key in this.commandDict) {
      let command = this.commandDict[key]
      console.log(`  ● ${key} ${command.description}`)
    }
  }
}

const commandContextStack = [new CommandContext()]

module.exports = {
  setCommand (commandName, description, callback) {
    const currentCommandContext = commandContextStack[commandContextStack.length - 1]
    currentCommandContext.setCommand(commandName, description, callback)
  },
  executeCommand (commandName, options) {
    const currentCommandContext = commandContextStack[commandContextStack.length - 1]
    currentCommandContext.executeCommand(commandName, options)
  },
  enterNewCommandContext () {
    commandContextStack.push(new CommandContext())
  },
  exitCurrentCommandContext () {
    commandContextStack.pop()
  }
}