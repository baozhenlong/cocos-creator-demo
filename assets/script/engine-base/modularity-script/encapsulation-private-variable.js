//每个脚本都是一个单独的作用域，在脚本内使用var定义的局部变量，将无法被模块外部访问
//可以很轻松地封装模块内的私有变量
var data = null;
module.exports = {
    setData: function(msg) {
        data = msg;
    },
    getData: function() {
        return data;
    }
};