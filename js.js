/*
    about OOP and "this" 
 */
(function() {
    /*代表单个实例，无法重复便捷的利用*/
    var desen = {
        age: 24,
        name: 'xyf',
        job: 'fontEnd',
        getName: function() {
            console.log(this.name);
        },
        setName: function(name) {
            this.name = name;

        }
    }


    /*构造函数模式，能够快捷创建实例，同时能很轻易的定位到实例的构造函数 */
    function Desen(age, name) {
        this.age = age;
        this.name = 'name';
        this.getName = function() {
            console.log(this.name);
        }
        this.setName = function(name) {
            this.name = name;
        }
    }
    /*加入Prototype概念，将每个实例都会用到的方法，全部指向一个地址，从而减少内存占用*/
    function Desen(age, name) {
        this.age = age;
        this.name = name;
        this.height = '1.8';
        this.getName = function() {
            console.log(this.name);
        }
    }
    Desen.prototype.setName = function(name) {
            this.name = name;
        }
        //二、构造函数的继承
        /*call apply的使用使得Chenlu继承了Desen中的方法和属性，但是无法继承Desen.prototype中的属性*/
    function Chenlu(age, name) {
        // 下面的代码同等于 Desen.apply(this,arguments);
        Desen.call(this, age, name);
    }

    Chenlu.prototype.action = function() {
        console.log('walk');
    }
    var d1 = new Desen(24, 'xyf');
    var d2 = new Desen(24, 'enmeen');
    var c1 = new Chenlu(25, 'cl');


    //Desen.prototype.constructor === Desen ==> true
    function Dog() {
        this.name = 'beibei';
    }

    function Animal() {
        this.species = "动物";
    }
    //下面使用prototype模式实现Animal中的方法继承到Dog中
    Dog.prototype = new Animal(); //这一步后  就已经实现了方法的继承
    Dog.prototype.constructor = Dog; //这一步是为了纠正错误的constructor指向，将constructor重新指向Dog
    var dog = new Dog();


    //三，非构造函数的继承

    /*优雅的学习this*/
    //在strict模式下，普通函数的this指向 underfined
    //而在非strict模式下，普通函数的this指向window（在浏览器中）
    function thisInstrict(name) {
        'use strict';
        this.name = name;
        console.log(this);
    }

    //内部函数中的this陷阱
    var numberz = {
        numberA: 5,
        numberB: 10,
        sum: function() {
            console.log(this === numberz); // => true
            function calculate() {
                // this is window or undefined in strict mode
                console.log(this === window); // => true
                console.log(this === numberz); // => false;
                return this.numberA + this.numberB;
            };
            return calculate.call(this);
        }
    };
    numberz.sum();

    //从Object中分离的方法
    function People(name) {
        this.name = name;
        this.action = function() {
            console.log("this是否等于window " + this === window)
            console.log(this.name); //注意是这里的this 指向的应该是 window
        }
    }
    var xiaoA = new People('xyf');
    var zz = xiaoA.action.bind(xiaoA);
    zz(); //输出xyf
    xiaoA.action() // 输出 xyf
    setInterval(xiaoA.action, 500000); //错误
    setInterval(xiaoA.action.bind(xiaoA), 500000); //输出正确

    //隐式调用中的this
    var rabbit = {
        name: 'White Rabbit'
    };

    function concatName(string) {
        console.log(this === rabbit); // => true
        return string + this.name;
    }

    concatName.call(rabbit, 'Hello '); // => 'Hello White Rabbit'
    concatName.apply(rabbit, ['Bye ']); // => 'Bye White Rabbit'

    //绑定函数中的this
    var numbers = {
        array: [3, 5, 10],
        getNumbers: function() {
            return this.array;
        }
    };
    var bindName = numbers.getNumbers.bind(numbers);
    bindName(); //==> [3, 5, 10]

    //没有立即调用错过了作为方法调用，当作为errorName函数调用的话，this指向全局
    var errorName = numbers.getNumbers;
    errorName(); // ==> underfined

    //but
    //这里直接调用了 所以是属于方法调用
    var canKonw = numbers.getNumbers(); // ==>[3, 5, 10]

})()

/*
   Four kinds of asynchronous callback way of programming
 */

function f1() {
    //code
}

function f2() {
    //code
}
//1.回调函数,假设f2等f1的执行结果，但是f1非常耗时
function f1(fun) {
    setTimeout(fun, 1000);
}

function f2() {
    //code
}

f1(f2);
//2. event listening（ps。事件驱动型）
f1.on('done',f2);
function f1(){
    setTimeout(function(){
        f1.trigger('done');
    },1000)
}

//3.observer pattern
//这里举例的时候使用了jq的一个插件
　jQuery.subscribe("done", f2);
function f1(){
    setTimeout(function(){
        jQuery.publish('done');
    },1000)
}

//4.promises对象 在es5里已经提供了原生的api