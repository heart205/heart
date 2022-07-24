/**
 * @author heart
 * @description 反射
 * @Date 2022-07-21
 */

function OneClass() {
  console.log('OneClass')
  console.log(new.target)
}
function OtherClass() {
  console.log('OtherClass')
  console.log(new.target)
}

var obj1 = Reflect.construct(OneClass, ['123'])
// 输出：
//     OneClass
//     function OneClass { ... }

// 改变new.target的值
var obj2 = Reflect.construct(OneClass, ['1234'], OtherClass)

const sy = Symbol('case')
// get
const obj = {
  name: 'OneClass',
  description: 'details',
  [sy]: ' case ',
}

Reflect.defineProperty(obj, 'name', {
  get: function () {
    console.log(this)
    return 123
  },
  set: function (value) {
    console.log(this)
    return true
  },
})
// Reflect.get 的 第三个参数 receiver 如果指定了 则是get方法的this指向 如果没有指定 则指向的是这个对象本身
Reflect.get(obj, 'name', {})

// Reflect.set 的第四个参数 receiver 如果指定了 则是set方法的this指向 如果没有指定 则指向的是这个对象本身
Reflect.set(obj, 'name', 'name', {})

// Reflect.deleteProperty 可以用于删除一个属性
const bool = Reflect.deleteProperty(obj, 'description')
bool && console.log('delete property success')

// Reflect.getPrototypeOf() 获取隐式原型
console.log(Reflect.getPrototypeOf(obj) === obj.__proto__)

// Reflect.setPrototypeOf 设置隐式原型
Reflect.setPrototypeOf(obj, {})

// 默认情况下，对象是可扩展的：即可以为他们添加新的属性
// Object.preventExtensions，Object.seal 或 Object.freeze 方法都可以标记一个对象为不可扩展（non-extensible）
// Object.preventExtensions 使其对象不可扩展 但是可以改变其属性值
// Object.seal()方法封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要原来是可写的就可以改变。

// Reflect.isExtensible() 表示一个对象是否可以扩展
console.log(Reflect.isExtensible(obj))

// Reflect.preventExtensions 使其对象不可扩展 但是可以改变其属性值
Reflect.preventExtensions(obj)

// Reflect.getOwnPropertyDescriptor 获取指定属性的描述符
console.log(Reflect.getOwnPropertyDescriptor(obj, 'name'))

// Reflect.ownKeys 返回一个由目标对象自身的属性键组成的数组
// 返回值等同于Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))
// 与Object.keys 不同的是 Object.keys 返回的是只有可枚举的数组也不包括Symbol属性  Reflect.ownKeys会返回所有可枚举不可枚举的属性
console.log(Reflect.ownKeys(obj))
console.log(Object.keys(obj))

const caseObject = {
  detail: 'names',
  [sy]: 'names',
}

Reflect.defineProperty(caseObject, 'detail', {
  enumerable: false,
})
