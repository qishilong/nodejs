# nodemon

nodemon 是一个工具，可在检测到目录中的文件更改时自动重新启动节点应用程序，从而帮助开发基于 Node.js 的应用程序。

nodemon 不需要**对**您的代码或开发方法进行任何额外的更改*。*nodemon 是`node`. 要使用，请在执行脚本时`nodemon`替换命令行上的单词。`node`

# 安装

通过使用 git 克隆或使用[npm](http://npmjs.org/)（推荐方式）：

```
npm install -g nodemon # or using yarn: yarn global add nodemon
```

并且 nodemon 将全局安装到您的系统路径。

您还可以安装 nodemon 作为开发依赖项：

```
npm install --save-dev nodemon # or using yarn: yarn add nodemon -D
```

对于本地安装，nodemon 将在您的系统路径中不可用，或者您无法直接从命令行使用它。相反，可以通过从 npm 脚本（例如`npm start`）中调用它或使用 来运行 Nodemon 的本地安装`npx nodemon`。

# 用法

nodemon 包装您的应用程序，因此您可以传递通常传递给应用程序的所有参数：

```
nodemon [your node app]
```

对于 CLI 选项，请使用`-h`(或`--help`) 参数：

```
nodemon -h
```

使用nodemon很简单，如果我的应用程序接受主机和端口作为参数，我会这样启动它：

```
nodemon ./server.js localhost 8080
```

此脚本的任何输出都以 为前缀`[nodemon]`，否则应用程序的所有输出（包括错误）都将按预期回显。

您还可以`inspect`像平常一样通过命令行将标志传递给节点：

```
nodemon --inspect ./server.js 80
```

如果您有`package.json`应用程序的文件，则可以完全省略主脚本，nodemon 将读取`package.json`属性`main`并使用该值作为应用程序 ( [ref](https://github.com/remy/nodemon/issues/14) )。

nodemon 还将搜索（从 nodemon 1.1.x 开始）`scripts.start`中的属性。`package.json`

另请查看Nodemon 的[常见问题解答](https://github.com/remy/nodemon/blob/master/faq.md)或[问题。](https://github.com/remy/nodemon/issues)

## 自动重新运行

nodemon 最初是为了重新启动挂起的进程（例如 Web 服务器）而编写的，但现在支持干净退出的应用程序。如果您的脚本干净退出，nodemon 将继续监视目录（或多个目录）并在发生任何更改时重新启动脚本。

## 手动重启

`rs`当nodemon正在运行时，如果您需要手动重新启动应用程序，您可以输入回车符，而不是停止并重新启动nodemon， nodemon将重新启动您的进程。

## 配置文件

Nodemon 支持本地和全局配置文件。它们通常被命名`nodemon.json`并且可以位于当前工作目录或您的主目录中。可以使用该`--config <file>`选项指定替代的本地配置文件。

具体如下，因此命令行参数将始终覆盖配置文件设置：

-   命令行参数
-   本地配置
-   全局配置

配置文件可以将任何命令行参数作为 JSON 键值，例如：

```
{
  "verbose": true,
  "ignore": ["*.test.js", "**/fixtures/**"],
  "execMap": {
    "rb": "ruby",
    "pde": "processing --sketch={{pwd}} --run"
  }
}
```

上面的`nodemon.json`文件可能是我的全局配置，以便我支持 ruby 文件和处理文件，并且我可以运行`nodemon demo.pde`，nodemon 将自动知道如何运行脚本，即使对处理脚本的开箱即用支持也是如此。

选项的进一步示例可以在[sample-nodemon.md中看到](https://github.com/remy/nodemon/blob/master/doc/sample-nodemon.md)

这是一个示例文件 `nodemon.json`

```json
{
  "restartable": "rs",
  "ignore": [
    ".git",
    "node_modules/**/node_modules"
  ],
  "verbose": true,
  "execMap": {
    "js": "node --harmony"
  },
  "events": {
    "restart": "osascript -e 'display notification \"App restarted due to:\n'$FILENAME'\" with title \"nodemon\"'"
  },
  "watch": [
    "test/fixtures/",
    "test/samples/"
  ],
  "env": {
    "NODE_ENV": "development"
  },
  "ext": "js,json"
}
```

### 包.json

如果你想将所有包配置保存在一个地方，nodemon 支持使用`package.json`for 配置。以与配置文件相同的格式指定配置，但在文件`nodemonConfig`中`package.json`，例如，采用以下内容`package.json`：

```
{
  "name": "nodemon",
  "homepage": "http://nodemon.io",
  "...": "... other standard package.json values",
  "nodemonConfig": {
    "ignore": ["**/test/**", "**/docs/**"],
    "delay": 2500
  }
}
```

请注意，如果您指定`--config`文件或提供本地`nodemon.json`任何`package.json`配置都会被忽略。

*本节需要更好的文档，但现在您还可以查看`nodemon --help config`（[也在此处](https://github.com/remy/nodemon/blob/master/doc/cli/config.txt)）*。

## 使用nodemon作为模块

请参阅[doc/requireable.md](https://github.com/remy/nodemon/blob/main/doc/requireable.md)

## 使用nodemon作为子进程

请参阅[doc/events.md](https://github.com/remy/nodemon/blob/main/doc/events.md#Using_nodemon_as_child_process)

## 运行非节点脚本

nodemon 还可以用于执行和监视其他程序。nodemon 将读取正在运行的脚本的文件扩展名并监视该扩展名，而不是`.js`如果没有`nodemon.json`：

```
nodemon --exec "python -v" ./app.py
```

现在，nodemon 将以`app.py`详细模式与 python 一起运行（请注意，如果您没有将参数传递给 exec 程序，则不需要引号），并查找带有扩展名的新文件或修改过的文件`.py`。

### 默认可执行文件

使用`nodemon.json`配置文件，您可以使用属性定义自己的默认可执行文件`execMap`。如果您正在使用 Nodemon 默认不支持的语言，这尤其有用。

要添加对 nodemon 的支持以了解扩展`.pl`（对于 Perl），该`nodemon.json`文件将添加：

```
{
  "execMap": {
    "pl": "perl"
  }
}
```

现在运行以下命令，nodemon 将知道用作`perl`可执行文件：

```
nodemon script.pl
```

通常建议使用全局`nodemon.json`来添加您自己的`execMap`选项。但是，如果缺少通用默认值，可以将其合并到项目中，以便通过更改[default.js](https://github.com/remy/nodemon/blob/master/lib/config/defaults.js)并发送拉取请求，nodemon 默认支持它。

## 监控多个目录

默认情况下，nodemon 监视当前工作目录。如果您想控制该选项，请使用该`--watch`选项添加特定路径：

```
nodemon --watch app --watch libs app/server.js
```

`./app`现在，仅当或目录发生更改时，nodemon 才会重新启动`./libs`。默认情况下，nodemon 将遍历子目录，因此无需显式包含子目录。

Nodemon 还支持 unix globbing，例如`--watch './lib/*'`. 必须引用通配模式。

## 指定扩展监视列表

默认情况下，nodemon 查找具有`.js`、`.mjs`、`.coffee`、`.litcoffee`和`.json`扩展名的文件。如果您使用该`--exec`选项并监视`app.py`nodemon将监视扩展名为`.py`. 但是，您可以使用`-e`(或`--ext`) 开关指定您自己的列表，如下所示：

```
nodemon -e js,pug
```

现在，nodemon 将在目录（或子目录）中扩展名为 , 的文件发生任何更改时重新`.js`启动`.pug`。

## 忽略文件

默认情况下，nodemon 仅在 JavaScript 文件更改时才会重新启动`.js`。在某些情况下，您可能希望忽略某些特定的文件、目录或文件模式，以防止 nodemon 过早重新启动您的应用程序。

这可以通过命令行完成：

```
nodemon --ignore lib/ --ignore tests/
```

或者可以忽略特定文件：

```
nodemon --ignore lib/app.js
```

模式也可以被忽略（但一定要引用参数）：

```
nodemon --ignore 'lib/*.js'
```

**重要的**是，忽略规则是与完整绝对路径匹配的模式，这决定了监视的文件数量。如果使用通配符 glob 模式，则需要将其用作`**`或完全省略。例如，`nodemon --ignore '**/test/**'`会起作用，而`--ignore '*/test/*'`不会。

请注意，默认情况下，nodemon 将忽略`.git`、`node_modules`、`bower_components`、`.nyc_output`和目录，并将忽略的模式*添加*到列表中。如果您确实想监视类似的目录，则需要[覆盖底层的默认忽略规则](https://github.com/remy/nodemon/blob/master/faq.md#overriding-the-underlying-default-ignore-rules)。`coverage``.sass-cache``node_modules`

## 应用程序未重新启动

在某些网络环境中（例如运行 nodemon 的容器在已安装的驱动器上读取数据），您将需要使用它来`legacyWatch: true`启用 Chokidar 的轮询。

通过 CLI，使用`--legacy-watch`或`-L`简称：

```
nodemon -L
```

尽管这应该是最后的手段，因为它会轮询它能找到的每个文件。

## 延迟重启

在某些情况下，您可能需要等到许多文件发生更改。检查新文件更改之前的超时时间为 1 秒。如果您上传多个文件并且需要花费几秒的时间，这可能会导致您的应用不必要地重新启动多次。

要添加额外的限制或延迟重新启动，请使用以下`--delay`命令：

```
nodemon --delay 10 server.js
```

为了获得更高的精度，可以指定毫秒。作为浮动：

```
nodemon --delay 2.5 server.js
```

或者使用时间说明符（毫秒）：

```
nodemon --delay 2500ms server.js
```

延迟数字是重新启动之前延迟的秒数（或毫秒数，如果指定）。*因此，nodemon 只会在上次*文件更改后的给定秒数内重新启动您的应用程序。

如果您在 中设置此值`nodemon.json`，则该值将始终以毫秒为单位解释。例如，以下是等效的：

```
nodemon --delay 2.5

{
  "delay": 2500
}
```

## 优雅地重新加载您的脚本

可以让 nodemon 向应用程序发送您指定的任何信号。

```
nodemon --signal SIGHUP server.js
```

您的应用程序可以按如下方式处理信号。

```
process.once("SIGHUP", function () {
  reloadSomeConfiguration();
})
```

请注意，nodemon 会将这个信号发送到进程树中的每个进程。

如果您使用`cluster`，那么每个工人（以及主人）都会收到信号。如果您希望在收到 时终止所有工作人员，常见的模式是在 master 中`SIGHUP`捕获，然后转发给所有工作人员，同时确保所有工作人员忽略。`SIGHUP``SIGTERM``SIGHUP`

```
if (cluster.isMaster) {
  process.on("SIGHUP", function () {
    for (const worker of Object.values(cluster.workers)) {
      worker.process.kill("SIGTERM");
    }
  });
} else {
  process.on("SIGHUP", function() {})
}
```

## 控制脚本的关闭

当 nodemon 看到文件更新时，它会向您的应用程序发送终止信号。如果您需要在脚本内关闭时进行清理，您可以捕获终止信号并自行处理。

以下示例将侦听一次信号`SIGUSR2`（由 nodemon 用于重新启动），运行清理进程，然后终止自身以让 nodemon 继续控制：

```
process.once('SIGUSR2', function () {
  gracefulShutdown(function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});
```

请注意，*只有*在关闭作业完成后`process.kill`才会调用 。感谢[Benjie Gillam](http://www.benjiegillam.com/2011/08/node-js-clean-restart-and-faster-development-with-nodemon/)撰写了这项技术。

## 当nodemon状态改变时触发事件

如果您希望在 nodemon 重新启动时发出类似于咆哮的通知，或者在事件发生时触发操作，那么您可以使用`require`nodemon 或将事件操作添加到您的`nodemon.json`文件中。

例如，要在 Nodemon 重新启动时在 Mac 上触发通知，`nodemon.json`如下所示：

```
{
  "events": {
    "restart": "osascript -e 'display notification \"app restarted\" with title \"nodemon\"'"
  }
}
```

[事件状态 wiki](https://github.com/remy/nodemon/wiki/Events#states)上列出了可用事件的完整列表。请注意，您可以绑定到状态和消息。

## 通过管道输出到其他地方

```
nodemon({
  script: ...,
  stdout: false // important: this tells nodemon not to output to console
}).on('readable', function() { // the `readable` event indicates that data is ready to pick up
  this.stdout.pipe(fs.createWriteStream('output.txt'));
  this.stderr.pipe(fs.createWriteStream('err.txt'));
});
```

## 在 gulp 工作流程中使用 nodemon

查看[gulp-nodemon](https://github.com/JacksonGariety/gulp-nodemon)插件，将 nodemon 与项目的 gulp 工作流程的其余部分集成。

## 在 Grunt 工作流程中使用 nodemon

查看[grunt-nodemon](https://github.com/ChrisWren/grunt-nodemon)插件，将 nodemon 与项目 grunt 工作流程的其余部分集成。

## 发音

>   nodemon，它的发音是：node-mon、no-demon 还是node-e-mon（如神奇宝贝）？

嗯...我之前已经被问过很多次了。我喜欢以前被问过这个问题。有人猜测它到底是哪一个。

答案很简单，但可能会令人沮丧。我不是说（我如何发音）。您可以随意称呼它。所有答案都是正确的:)

## 设计原则

-   标志越少越好
-   适用于所有平台
-   功能较少
-   让个人在 Nodemon 之上构建
-   以 API 形式提供所有 CLI 功能
-   贡献必须经过测试

Nodemon 并不完美，CLI 争论已经超出了我完全满意的范围，但也许有一天它可以减少一点。