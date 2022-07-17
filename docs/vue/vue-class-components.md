---
title: vue-class-component 源码解析
---

```ts
import { componentFactory, $internalHooks } from './component';
// createDecorator 用于创建自定义的装饰器
export { createDecorator, mixins } from './util';
function Component(options) {
  	// typeof Class === 'function'  true
    if (typeof options === 'function') {
      	// 如果options是一个累的情况
      	// 则是 @Component 直接走工厂函数
        return componentFactory(options);
    }
  	// 如果是Component({
	  //	// 所有的组件选项都可以放在这里
  	//  template: `<div></div>`
		// })
  	// 这种结构 则闭包配置参数 此时的配置参数就是options 接收到的类是Component
    return function (Component) {
        return componentFactory(Component, options);
    };
}
// registerHooks 用于注册别的第三方的hooks 例如 vue-router的hooks
Component.registerHooks = function registerHooks(keys) {
    $internalHooks.push(...keys);
};
export default Component;
```

再次继续分析 `componentFactory`包的作用

```js
export const $internalHooks = [
  'data',
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeDestroy',
  'destroyed',
  'beforeUpdate',
  'updated',
  'activated',
  'deactivated',
  'render',
  'errorCaptured',
  'serverPrefetch', // 2.6
]

// componentFactory函数的作用就是将我们class 声明的类中的属性转换成options的形式
//options 就是我们平时写的export default {}  的对象
export function componentFactory(Component, options = {}) {
  // vue 组件的名字
  options.name = options.name || Component._componentTag || Component.name
  // 获取类的实例属性
  // prototype props.
  const proto = Component.prototype
  // 获取原型上的所有的可以枚举或者不可枚举的所有属性值 进行遍历
  Object.getOwnPropertyNames(proto).forEach(function (key) {
    if (key === 'constructor') {
      return
    }
    // 如果存在hooks选择 例如options中的beforeRouteEnter 这种hook 就会被添加到 options中
    if ($internalHooks.indexOf(key) > -1) {
      options[key] = proto[key]
      return
    }
    // getOwnPropertyDescriptor 获取该对象上的属性的操作符 而不获取原形链上的操作符
    // 因此可能获取到的key为 undefined
    const descriptor = Object.getOwnPropertyDescriptor(proto, key)
    // void 0 === undefined // true
    if (descriptor.value !== void 0) {
      // methods
      if (typeof descriptor.value === 'function') {
        ;(options.methods || (options.methods = {}))[key] = descriptor.value
      } else {
        // 因为ts用的class 继承的关系 这里获取到的属性都是实力对象身上的属性 也就是
        // options中的data的返回值的属性
        // typescript decorated data
        ;(options.mixins || (options.mixins = [])).push({
          data() {
            return { [key]: descriptor.value }
          },
        })
      }
    } else if (descriptor.get || descriptor.set) {
      // 当前的属性如果实现了 get 或者 set方法 则是一个计算属性
      // computed properties
      ;(options.computed || (options.computed = {}))[key] = {
        get: descriptor.get,
        set: descriptor.set,
      }
    }
  })
  ;(options.mixins || (options.mixins = [])).push({
    data() {
      // collectDataFromConstructor的作用就是区别我们定义的data 和
      // （方法 属性以及vue的自有属性）的区别
      // 将data从类中提取出来
      return collectDataFromConstructor(this, Component)
    },
  })
  // decorate options
  // 这里用于创建自定义的装饰器
  const decorators = Component.__decorators__
  if (decorators) {
    decorators.forEach((fn) => fn(options))
    delete Component.__decorators__
  }
  // find super
	// Component.prototype.__proto__ === (所继承的直父类).prototype
  const superProto = Object.getPrototypeOf(Component.prototype)
  const Super = superProto instanceof Vue ? superProto.constructor : Vue
  // 创建一个vue的子类
  const Extended = Super.extend(options)
  // forwardStaticMembers如下
  forwardStaticMembers(Extended, Component, Super)
  // 如果支持反射 则将组件反射收集的值也映射到 vue的实例对象上
  if (reflectionIsSupported()) {
    copyReflectionMetadata(Extended, Component)
  }
  return Extended
}
const reservedPropertyNames = [
    // Unique id
    'cid',
    // Super Vue constructor
    'super',
    // Component options that will be used by the component
    'options',
    'superOptions',
    'extendOptions',
    'sealedOptions',
    // Private assets
    'component',
    'directive',
    'filter'
];
const shouldIgnore = {
    prototype: true,
    arguments: true,
    callee: true,
    caller: true
};
//这个方法的作用是将Component的静态类型转发到vue创建子类的身上
function forwardStaticMembers(Extended, Original, Super) {
    // We have to use getOwnPropertyNames since Babel registers methods as non-enumerable
		// 遍历原Component的每一个静态实例
    Object.getOwnPropertyNames(Original).forEach(key => {
        // Skip the properties that should not be overwritten
        if (shouldIgnore[key]) {
            return;
        }
        // Some browsers does not allow reconfigure built-in properties
        const extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key);
      	// 如果实例在vue子类上存在了并且不可以改变配置 则直接return
        if (extendedDescriptor && !extendedDescriptor.configurable) {
            return;
        }
        const descriptor = Object.getOwnPropertyDescriptor(Original, key);
        // If the user agent does not support `__proto__` or its family (IE <= 10),
        // the sub class properties may be inherited properties from the super class in TypeScript.
        // We need to exclude such properties to prevent to overwrite
        // the component options object which stored on the extended constructor (See #192).
        // If the value is a referenced value (object or function),
        // we can check equality of them and exclude it if they have the same reference.
        // If it is a primitive value, it will be forwarded for safety.
        if (!hasProto) {
            // Only `cid` is explicitly exluded from property forwarding
            // because we cannot detect whether it is a inherited property or not
            // on the no `__proto__` environment even though the property is reserved.
            if (key === 'cid') {
                return;
            }
            const superDescriptor = Object.getOwnPropertyDescriptor(Super, key);
          	// 如果是一个基本的数据类型 并且环境并不支持__proto__ 的形式 子类和父类都有相同的引用 则将其排除
            if (!isPrimitive(descriptor.value) &&
                superDescriptor &&
                superDescriptor.value === descriptor.value) {
                return;
            }
        }
        // Warn if the users manually declare reserved properties
        if (process.env.NODE_ENV !== 'production' &&
            reservedPropertyNames.indexOf(key) >= 0) {
            warn(`Static property name '${key}' declared on class '${Original.name}' ` +
                'conflicts with reserved property name of Vue internal. ' +
                'It may cause unexpected behavior of the component. Consider renaming the property.');
        }
      	// 这里将静态属性以及配置转移到vue.extend 出来的子类中了
        Object.defineProperty(Extended, key, descriptor);
    });
}


```

> collectDataFromConstructor 函数的解释

```js
import Vue from 'vue';
import { warn } from './util';
export function collectDataFromConstructor(vm, Component) {
    // override _init to prevent to init as Vue instance
  	// 这里重写了vue在constructor中的_init函数
    const originalInit = Component.prototype._init;
    Component.prototype._init = function () {
        // proxy to actual vm
      	// 获取vue实例上的所有属性集合 是 $options _uid 方法等参数 对其进行数据劫持
      	// 后续为了使其不可遍历
        const keys = Object.getOwnPropertyNames(vm);
        // 2.2.0 compat (props are no longer exposed as self properties)
        if (vm.$options.props) {
            for (const key in vm.$options.props) {
                if (!vm.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
        }
        keys.forEach(key => {
          // ie8对于访问器属性描述符，configurable 必须设置为 true，enumerable 必须设置为 false
          // 这里设置了configurable（configurable 默认为false）
          // 后续的init操作后 会将这些属性加上不可遍历的
            Object.defineProperty(this, key, {
                get: () => vm[key],
                set: value => { vm[key] = value; },
                configurable: true
            });
        });
    };
    // should be acquired class property values
    const data = new Component();
    // restore original _init to avoid memory leak (#209)
    Component.prototype._init = originalInit;
    // create plain data object
    const plainData = {};
  	// new 出来的对象中的props 方法 以及vue的一些属性都被添加上了不可枚举的属性
  	// 因此这里的枚举出来的data就是所需要的data
    Object.keys(data).forEach(key => {
        if (data[key] !== undefined) {
            plainData[key] = data[key];
        }
    });
    if (process.env.NODE_ENV !== 'production') {
        if (!(Component.prototype instanceof Vue) && Object.keys(plainData).length > 0) {
            warn('Component class must inherit Vue or its descendant class ' +
                'when class property is used.');
        }
    }
    return plainData;
}

```

relect.js

```js
// The rational behind the verbose Reflect-feature check below is the fact that there are polyfills
// which add an implementation for Reflect.defineMetadata but not for Reflect.getOwnMetadataKeys.
// Without this check consumers will encounter hard to track down runtime errors.
export function reflectionIsSupported() {
    return typeof Reflect !== 'undefined' && Reflect.defineMetadata && Reflect.getOwnMetadataKeys;
}
export function copyReflectionMetadata(to, from) {
    forwardMetadata(to, from);
    Object.getOwnPropertyNames(from.prototype).forEach(key => {
        forwardMetadata(to.prototype, from.prototype, key);
    });
    Object.getOwnPropertyNames(from).forEach(key => {
        forwardMetadata(to, from, key);
    });
}
function forwardMetadata(to, from, propertyKey) {
    const metaKeys = propertyKey
        ? Reflect.getOwnMetadataKeys(from, propertyKey)
        : Reflect.getOwnMetadataKeys(from);
    metaKeys.forEach(metaKey => {
        const metadata = propertyKey
            ? Reflect.getOwnMetadata(metaKey, from, propertyKey)
            : Reflect.getOwnMetadata(metaKey, from);
        if (propertyKey) {
            Reflect.defineMetadata(metaKey, metadata, to, propertyKey);
        }
        else {
            Reflect.defineMetadata(metaKey, metadata, to);
        }
    });
}
```


# utils

```js
import Vue from 'vue';
export const noop = () => { };
const fakeArray = { __proto__: [] };
export const hasProto = fakeArray instanceof Array;
export function createDecorator(factory) {
    return (target, key, index) => {
        const Ctor = typeof target === 'function'
            ? target
            : target.constructor;
        if (!Ctor.__decorators__) {
            Ctor.__decorators__ = [];
        }
        if (typeof index !== 'number') {
            index = undefined;
        }
        Ctor.__decorators__.push(options => factory(options, key, index));
    };
}
export function mixins(...Ctors) {
    return Vue.extend({ mixins: Ctors });
}
export function isPrimitive(value) {
    const type = typeof value;
    return value == null || (type !== 'object' && type !== 'function');
}
export function warn(message) {
    if (typeof console !== 'undefined') {
        console.warn('[vue-class-component] ' + message);
    }
}
```