cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //---cc.EditBox
        //用于获取用户的输入文本

        //---editBox.string
        //输入框的初始输入内容（String）---如果为空则会显示占位符的文本

        //---editBox.backgroundImage
        //输入框的背景图片（SpriteFrame）

        //---editBox.returnType
        //指定移动设备上的回车按钮样式（Enum）
        //默认---cc.EditBox.KeyboardReturnType.DEFAULT
        //完成---cc.EditBox.KeyboardReturnType.DONE
        //发送---cc.EditBox.KeyboardReturnType.SEND
        //搜索---cc.EditBox.KeyboardReturnType.SEARCH
        //跳转---cc.EditBox.KeyboardReturnType.GO

        //---editBox.inputFlag
        //指定输入标志位（Enum）---用于设置文本显示和文本格式化的标志位
        //保密数据---cc.EditBox.InputFlag.PASSWORD---隐藏
        //敏感数据---cc.EditBox.InputFlag.SENSITIVE---禁止存储到字典或表里面，也不能用来自动补全和提示用户输入；如信用卡号码
        //每一个单词的首字母大写---cc.EditBox.InputFlag.INITIAL_CAPS_WORD
        //每个句子的首字母大写---cc.EditBox.InputFlag.INITIAL_CAPS_SENTENCE
        //所有字符大写---cc.EditBox.InputFlag.INITIAL_CAPS_ALL_CHARACTERS

        //---editBox.inputMode
        //指定输入模式
        //多行文本---cc.EditBox.InputMode.ANY---任何文本（包括换行符）
        //单行文本---cc.EditBox.InputMode.SINGLE_LINE---任何文本（除了换行符）
        //电子邮件地址---cc.EditBox.InputMode.EMAIL_ADDR
        //整数值---cc.EditBox.InputMode.NUMERIC
        //电话号码---cc.EditBox.InputMode.PHONE_NUMBER
        //URL---cc.EditBox.InputMode.URL
        //实数---cc.EditBox.InputMode.DECIMAL

        //---输入框文本
        //1---editBox.fontSize
        //输入框文本的字体大小（Number）
        //2---editBox.fontColor
        //输入框文本的字体颜色（Color）
        //3---editBox.lineHeight
        //输入框文本的行高（Number）
        //4---editBox.maxLength
        //输入框最大允许输入的字符个数（Number）
        //0-不允许用户进行任何输入
        //<0-不会限制输入字符个数

        //---输入框占位符
        //1---editBox.placeholder
        //输入框占位符的文本内容（String）
        //2---editBox.placeholderFontSize
        //3---输入框占位符的字体大小
        //4---editBox.placeholderFontColor
        //输入框占位符的字体颜色

        //---editBox.stayOnTop
        //输入框是否总是可见（Boolean）---永远在游戏视图的上面

        //---焦点
        //1---editBox.setFocus()
        //当editBox.stayOnTop === true时有效
        //让当前EditBox获得焦点---only available on Web at the moment
        //2---editBox.isFocused()
        //当editBox.stayOnTop === true时有效
        //判断EditBox是否获得了焦点---only available on Web at the moment


    },

    //---事件回调
    //1---editingDidBegan
    //开始编辑文本输入框时，触发的事件回调
    onEditingDidBegan: function (sender, customEventData) {
        console.log('editBoxEditingDidBegan ' + sender.name); //EditBox<EditBox>---节点名（组件所在节点）<组件名>
        console.log('customEventData = ' + customEventData); //began
    },
    //2---textChanged
    //编辑文本输入框时，触发的事件回调
    onTextChanged: function (text, sender, customEventData) {
        console.log('editBoxTextChanged ' + sender.name + ' text = ' + text);
        console.log('customEventData = ' + customEventData);
    },
    //3---editingDidEnded
    //结束编辑文本输入框时，触发的事件回调
    onEditingDidEnded: function (sender, customEventData) {
        console.log('editBoxEditingDidEnded ' + sender.name + 'string = ' + sender.string);
        console.log('customEventData = ' + customEventData);
    },
    //4---editingReturn
    //当用户按下回车键时，触发的事件回调

    // start() {},

    // update (dt) {}
});