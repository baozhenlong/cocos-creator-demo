module.exports.introduce = 'exports';
module.exports.funcA = function() {
    console.log('funcA')
};
module.exports.funcB = function() {
    console.log('funcB')
};
//module.expors默认是一个空对象（{}），可以直接往里面增加新的字段
//等价于
// module.exports = {
//     introduce: 'exports',
//     funcA = function() {
//         console.log('funcA')
//     },
//     funcB = function() {
//         console.log('funcB')
//     },
// };