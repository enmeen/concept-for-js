/* 
* @Author: Marte
* @Date:   2016-07-27 15:25:29
* @Last Modified by:   Marte
* @Last Modified time: 2016-07-27 17:36:53
*/

(function(){
    var root = this;
    var previousDesen = root._;
    var _ = function(obj){
        if (obj instanceof _) return;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    }
})();

/*代表单个实例，无法重复便捷的利用*/
var desen = {
    age:24,
    name:'xyf',
    job:'fontEnd',
    getName:function(){
        console.log(this.name);
    },
    setName:function(name){
        this.name = name;
        
    }
}


/*构造函数模式，能够快捷创建实例，同时能很轻易的定位到实例的构造函数 */
function Desen(age,name){
    this.age = age;
    this.name = 'name';
    this.getName=function(){
         console.log(this.name);
    }
    this.setName=function(name){
        this.name = name;
    }
}
/*加入Prototype概念，将每个实例都会用到的方法，全部指向一个地址，从而减少内存占用*/
function Desen(age,name){
    this.age = age;
    this.name = name;
    this.height = '1.8';
    this.getName=function(){
         console.log(this.name);
    }
}
Desen.prototype.setName = function(name){
    this.name  = name;
}
//二、构造函数的继承
/*call apply的使用使得Chenlu继承了Desen中的方法和属性，但是无法继承Desen.prototype中的属性*/
function Chenlu(age,name){
    // 下面的代码同等于 Desen.apply(this,arguments);
    Desen.call(this,age,name);
}

Chenlu.prototype.action = function(){
    console.log('walk');
}
var d1 =new Desen(24,'xyf');
var d2 =new Desen(24,'enmeen');
var c1 = new Chenlu(25,'cl');


//Desen.prototype.constructor === Desen ==> true
function Dog(){
    this.name = 'beibei';
}
function Animal(){
    this.species = "动物";
}
//下面使用prototype模式实现Animal中的方法继承到Dog中
Dog.prototype = new Animal();//这一步后  就已经实现了方法的继承
Dog.prototype.constructor = Dog;//这一步是为了纠正错误的constructor指向，将constructor重新指向Dog
var dog = new Dog();


//三，非构造函数的继承