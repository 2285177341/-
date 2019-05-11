// require 调用模块，接收二个参数。
// 第1个参数是一个数组，表示所依赖的模块(调用的模块)  
// 第2个参数是一个回调函数，当前面指定的模块都加载成功后，它将被调用。


//require调用模块:页面允许有多个require调用模块。
// require(['module1'],function(m1){//m1代表模块module1返回的对象
//     console.log(m1.num);
//     m1.fn();
// });

//前面的三个模块是异步执行的，回调函数一定是模块加载完成之后再执行。
// require(['module1','module2','module3'],function(m1,m2,m3){

// });

require(['module1', 'index']);