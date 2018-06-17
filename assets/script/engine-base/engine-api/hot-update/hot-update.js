cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //1---设计思路
        //Cocos Creator中的热更新主要源于Cocos引擎中的AssetsManager模块对热更新的支持
        //服务端和本地均保存完整版本的游戏资源，热更新过程中通过比较服务端和本地版本的差异来决定更新哪些内容
        //可天然支持跨版本更新，比如本地版本为A，远程版本为C，则直接更新A和C之间的差异，并不需要生成A到B和B到C的更新包，依次更新
        //在这种设计思路下，新版本的文件以离散的方式保存在服务端，更新时以文件为单位下载
        //资源热更新只适用于原生发布版本
        //AssetsManager类也只在jsb命名空间下，在使用的时候需要注意判断运行环境

        //2---Manifest文件
        //对于不同版本的文件级差异，AssetsManager中使用Manifest文件来进行版本比对
        //本地和远端的Manifest分别标示本地和远端的当前版本包含的文件列表和文件版本，这样就可以通过比对每个文件的版本来确定需要更新的文件列表
        //Manifest文件中包含以下几个重要信息：
        //Manifest---1---远程资源包的根路径
        //Manifest---2---远程Manifest文件地址
        //Manifest---3---远程Version文件地址（非必需）
        //Manifest---4---主版本号
        //Manifest---5---文件列表：以文件路径来索引，包含文件版本信息，一般推荐使用文件的md5校验码来作为版本号
        //Manifest---6---搜索路径列表
        //其中Version文件内容是Manifest文件内容的一部分，不包含文件列表
        //由于Manifest文件可能比较大，每次检查更新的时候都完整下载的话可能影响体验，所以开发者可以额外提供一个非常小的Version文件
        //AssetsManager会首先检查Version文件提供的主版本号来判断是否需要继续下载Manifest文件并更新

        //3---在Cocos Creator项目中支持热更新
        //对于Cocos Creator来说，所有JS脚本将会打包到src目录中，其它Assets资源将会被导出到res目录
        //热更新思路---1---基于原生打包目录中的res和src目录生成本地的Manifest文件
        //热更新思路---2---创建一个热更新组件来负责热更新逻辑
        //热更新思路---3---游戏发布后，如需要更新版本，则生成一套远程版本资源，包含res目录、src目录和Mainifest文件，将远程版本部署到服务端
        //热更新思路---4---当热更新组件检测到服务端Manifest版本不一致时，就会开始热更新

        //4---生成Manifest文件---官网文档详解

        //5---热更新组件---官网文档详解

        //6---部署服务器
        //assets/project.manifest：游戏的本地 Manifest 文件中的 packageUrl、remoteManifestUrl 和 remoteVersionUrl
        //remote-assets/project.manifest：远程包的 Manifest 文件中的 packageUrl、remoteManifestUrl 和 remoteVersionUrl
        //remote-assets/version.manifest：远程包的 Version 文件中的 packageUrl、remoteManifestUrl 和 remoteVersionUrl


    },

    // start () {

    // },

    // update (dt) {},
});