#库管理工具Bower学习
##Bower是干什么的？
对各种库（如JQuery、bootstrap）进行管理，比如搜索、自动安装\卸载、检查更新、确保依赖关系等等。
##安装
```
sudo npm install bower -g
```
##配置文件
配置有文件两个：`.bowerrc`和`bower.json`。在项目根目录创建了这两个文件之后，你基本就可以获得你想得到的库了。
###.bowerrc
Bower的配置文件,放在项目根目录下
```
{
  "directory" : "script_lib",
  "endpoint"  : "",
  "searchpath"  : "",
  "shorthand_resolver" : ""
}
```

属性含义：
> * directory：存放库文件的子目录名。
> * endpoint：在线索引的网址，用来搜索各种库。
> * searchpath：一个数组，储存备选的在线索引网址。如果某个库在endpoint中找不到，则继续搜索该属性指定的网址，通常用于放置某些不公开的库。
> * shorthand_resolver：定义各个库名称简写形式。
###bower.json
用于保存项目的库信息，供项目安装时使用，以及Bower的在线索引读取
```
bower init
```

通过init命令可以自动生成bower.json
```
{
  "name": "CoderJ's Blog",
  "version": "0.0.5",
  "homepage": "http://coderj.github.io",
  "authors": [
    "jixin <jixin@umeng.com>"
  ],
  "description": "My Blog",
  "dependencies":{
    "bootstrap":"~3.0.0",
    "jquery":"latests",
    "d3":"latests",
    "jquery-qrcode":"*"
  },
  "devDependencies":{

  },
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "test",
    "script_lib",
    "tests"
  ]
}
```

>其中，`dependencies`是需要安装的库及对应的版本。在写入`dependencies`后，执行`bower install`即可一次性全部安装所有库。

##常用命令
###install
安装库。上文中提到使用`bower install`可以一次性安装bower.json中的所有库。
```
	#安装JQuery
	bower install jquery

	#安装github中的库
	bower install git://github.com/documentcloud/backbone.git

	#安装某个网址中的库
	bower install http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min.js

	#安装本地库
	bower install ./some/path/relative/to/this/directory/backbone.js	
```
###uninstall、update
```
	#卸载JQuery
	bower uninstall jquery

	#更新JQuery
	bower update jquery
```
###list 
```
	#列出项目所使用的所有库
	bower list
```
##参考
	<http://javascript.ruanyifeng.com/tool/bower.html>
	<http://blog.fens.me/nodejs-bower-intro/>