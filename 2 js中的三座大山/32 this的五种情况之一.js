// 1. this: 给元素的某个事件绑定方法，这个事件执行的时候，方法内的this一般指向这个元素
btn.onclick = function () {
    console.log(this);  // btn
};

function fn () {
    console.log(this);
}
// fn.bind(window)首先会返回一个匿名函数(AM),把AM绑定给事件；
// 点击触发执行AM，AM中的THIS是元素，但是会在AM中执行FN，FN中的THIS是预先指定的WINDOW
btn.onclick = fn.bind(window); 
// 等同下面的 
btn.onclick = (function () {
    return function () {
        fn.call(window);
    }
})();

// 2. this： 普通函数执行，它里面的this值向谁，取决于方法执行前面的是否有 点 “ . ”，
// 有的话，点“ .” 前面是谁，this就指向谁，没有的话，this就指向window
function fn () {
    console.log(this);
}
let obj  = {
    name: '哈哈',
    fn: fn
};
// fn();  // window
// obj.fn();  // obj

// hasOwnProperty: 用来检测某个属性名是否属于当前对象的私有属性（对象自己定义的属性，不是原型上面的属性）
// in 是用来检测是否为其属性（不论是共有还是私有）
console.log(obj.hasOwnProperty('name'));  // true
console.log('name' in obj);   // true

console.log(obj.hasOwnProperty('toString'));  // false
console.log('toString' in obj)  // true

// hasOwnProperty 是判断 当前实例上有没有私有属性
// obj.__proto__ 是obj的原型对象，原型上面没有name属性了
console.log(obj.__proto__.hasOwnProperty('name'));  // false 
console.log(obj.__proto__.hasOwnProperty.call(obj, 'name'));  // true
 
// 3. this: 构造函数执行（new xxx），函数中的this是当前类的实例
function Person () {
    console.log(this);
    // this.xxx = xxx;   给当前实例绑定属性
}
let p = new Person();   // this 指向当前实例


// 4. 箭头函数中自身是没有this的，所以用到的this都是其上下文中寻找的this
//       (1).  他没有prototype（也就是没有构造器），所以不能被new执行
//       (2).  他没有arguments实参集合（可以基于 ...args剩余运算符获取）
//       (3).  箭头函数没有this，call没法强制改变  
//       (4).  箭头函数是Function的实例，也会有call等一系列的方法

let obj = {
    name: '哈哈',
    fn () {
        console.log(this);  // obj
        return function () {
            console.log(this);  // window
        }
    }
};
let f = obj.fn();
f();

let obj = {
    name: '哈哈',
    fn () {
        console.log(this);    // obj
        return () => {
            console.log(this);  // obj
        }
    }
};

let fn = () => {
    console.log(arguments);   // Uncaught ReferenceError: arguments is not defined
};
fn(1, 2 , 3)

function f () {
    console.log(arguments);
}
f(1, 2, 3)





~function (proto) {
    function bind () {
        console.log('px');
    }
    proto.bind = bind;
}(Function.prototype);

let obj = {
    fn(x, y) {
        console.log(this, x, y);
    }
};
setTimeout(obj.fn.bind(window, 10, 20), 1000);