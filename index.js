"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var other_js_1 = require("./other.js");
/**
 *防抖
 * @param fn 回调函数
 * @param t  单位时间
 * @constructor
 */
exports.Debounce = function (fn, t) {
    var delay = t || 500;
    var timer;
    var _this = this;
    return function () {
        var args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            timer = null;
            fn.apply(_this, args);
        }, delay);
    };
};
/**
 *节流
 * @param fn  回调函数
 * @param t  单位时间内
 * @constructor
 */
exports.Throttle = function (fn, t) {
    var start = new Date();
    return function () {
        var end = new Date();
        if (end - start >= t) {
            var context = this;
            var args = arguments;
            fn.apply(context, args);
            start = new Date();
        }
    };
};
/**
 * 保存local
 * @param key  名称
 * @param value  值
 */
exports.localSave = function (key, value) {
    localStorage.setItem(key, value);
};
/**
 *读取local
 * @param key  名称
 */
exports.localRead = function (key) {
    return localStorage.getItem(key) || '';
};
/**
 * 删除 local
 * @param key  名称
 */
exports.localRemove = function (key) {
    localStorage.removeItem(key);
};
/**
 * 获取url参数
 * @param url  url地址
 */
exports.getParams = function (url) {
    var keyValueArr = url.split('?')[1].split('&');
    var paramObj = {};
    keyValueArr.forEach(function (item) {
        var keyValue = item.split('=');
        paramObj[keyValue[0]] = keyValue[1];
    });
    return paramObj;
};
/**
 *获取元素类型
 * @param elem
 */
exports.getTypeof = function (elem) {
    var type;
    if (!elem) {
        type = elem;
    }
    else {
        type = elem.constructor;
    }
    return type;
};
/**
 * 数组求和
 * @param arr
 * @param prop 对象数组 指定元素之和
 */
exports.sum = function (arr, prop) {
    var len = arr.length;
    var sum = 0;
    for (var i = 0; i < len; i++) {
        var type = exports.getTypeof(arr[i]);
        if (type === Number || type === String) {
            sum += Number(arr[i]);
        }
        else if (type === Object) {
            try {
                if (prop) {
                    sum += Number(arr[i][prop]);
                }
                else {
                    throw 'sum()对象数组未指定属性参数';
                }
            }
            catch (err) {
                throw err;
            }
        }
    }
    return sum;
};
/**
 * @description 绑定事件 on(element, event, handler)
 */
exports.on = function () {
    if (document.addEventListener) {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    }
    else {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        };
    }
};
/**
 * @description 解绑事件 off(element, event, handler)
 */
exports.off = function () {
    if (document.removeEventListener) {
        return function (element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false);
            }
        };
    }
    else {
        return function (element, event, handler) {
            if (element && event) {
                element.detachEvent('on' + event, handler);
            }
        };
    }
};
exports.getUnion = other_js_1.getUnionArr;
/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
 */
exports.getIntersection = function (arr1, arr2) {
    var len = Math.min(arr1.length, arr2.length);
    var i = -1;
    var res = [];
    while (++i < len) {
        var item = arr2[i];
        if (arr1.indexOf(item) > -1)
            res.push(item);
    }
    return res;
};
/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
exports.hasOneOf = function (target, arr) {
    return target.some(function (_) { return arr.indexOf(_) > -1; });
};
/**
 * @returns {String} 当前浏览器名称
 */
exports.getExplorer = function () {
    var ua = window.navigator.userAgent;
    var isExplorer = function (exp) {
        return ua.indexOf(exp) > -1;
    };
    if (isExplorer('MSIE'))
        return 'IE';
    else if (isExplorer('Firefox'))
        return 'Firefox';
    else if (isExplorer('Chrome'))
        return 'Chrome';
    else if (isExplorer('Opera'))
        return 'Opera';
    else if (isExplorer('Safari'))
        return 'Safari';
};
/**
 * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
 * 如果没有传入key这个参数，则判断obj对象是否有键值对
 */
exports.hasKey = function (obj, key) {
    if (key)
        return key in obj;
    else {
        var keysArr = Object.keys(obj);
        return keysArr.length;
    }
};
var perfect = {
    sum: exports.sum,
    getTypeof: exports.getTypeof,
    getParams: exports.getParams,
    localSave: exports.localSave,
    localRemove: exports.localRemove,
    localRead: exports.localRead,
    Debounce: exports.Debounce,
    Throttle: exports.Throttle,
    on: exports.on,
    off: exports.off,
    getUnion: exports.getUnion,
    getIntersection: exports.getIntersection,
    hasOneOf: exports.hasOneOf,
    getExplorer: exports.getExplorer,
    hasKey: exports.hasKey
};
exports.default = perfect;
//# sourceMappingURL=index.js.map