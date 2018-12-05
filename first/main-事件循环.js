var events = require('events')

// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();

/**
 * eventEmitter.on() 要在 eventEmitter.emit() 前注册
 */

// 创建事件处理程序
var connectHeadler = function connected(){
    console.log('连接成功')
    // 触发 data_received 事件 
    eventEmitter.emit('data-received');
}

eventEmitter.on('data-received',function(){
    console.log('数据接受成功');
})

// 绑定 connection 事件处理程序
eventEmitter.on('connection',connectHeadler);

// 触发 connection 事件 
eventEmitter.emit('connection');

console.log("程序执行完毕。");