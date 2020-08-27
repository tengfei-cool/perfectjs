import {getUnionArr} from './other.js'
/**
 *防抖
 * @param fn 回调函数
 * @param t  单位时间
 * @constructor
 */
export const Debounce :(fn:Function,t:number)=> Function = function(fn,t){
    let delay : number = t || 500
    let timer : any
    let _this = this
    return function () {
        let args = arguments
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            timer = null
            fn.apply(_this, args)
        }, delay)
    }
}
/**
 *节流
 * @param fn  回调函数
 * @param t  单位时间内
 * @constructor
 */
export const Throttle : (fn:Function,t:number) => Function = function(fn,t){
    let start : any = new Date()
    return function () {
        let end : any = new Date()
        if(end - start >= t){
            let context = this ;
            let args = arguments
            fn.apply(context, args)
            start = new Date()
        }
    }
}
/**
 * 保存local
 * @param key  名称
 * @param value  值
 */
export const localSave:(key:string,value:string) => void = function (key,value) {
    localStorage.setItem(key, value)
}
/**
 *读取local
 * @param key  名称
 */
export const localRead:(key:string) => any = function (key) {
    return localStorage.getItem(key) || ''
}
/**
 * 删除 local
 * @param key  名称
 */
export const localRemove:(key:string) => void =function (key) {
    localStorage.removeItem(key)
}
/**
 * 获取url参数
 * @param url  url地址
 */
export const getParams : (url:string) => object = function (url) {
    const keyValueArr:any = url.split('?')[1].split('&')
    let paramObj:object = {}
    keyValueArr.forEach(item => {
        const keyValue = item.split('=')
        paramObj[keyValue[0]] = keyValue[1]
    })
    return paramObj
}
/**
 *获取元素类型
 * @param elem
 */
export const getTypeof : (elem:any) => any = function(elem):any{
    let type : any
    if(!elem){
        type = elem
    }else{
        type = elem.constructor
    }
    return type
}
/**
 * 数组求和
 * @param arr
 * @param prop 对象数组 指定元素之和
 */
export const sum :(arr:Array<any> ,prop?:string) =>
    number = function(arr:Array<any> ,prop):number
{
    let len = arr.length
    let sum:number = 0
    for(let i :number = 0 ; i < len ; i++){
        let type :any = getTypeof(arr[i])
        if(type === Number || type === String){
            sum += Number(arr[i])
        }else if(type === Object){
            try {
                if(prop){
                    sum += Number(arr[i][prop])
                }else{
                    throw  'sum()对象数组未指定属性参数';
                }
            }catch  (err){
                throw err
            }
        }
    }
    return sum
}
/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on : () => Function = function() {
    if (document.addEventListener) {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false)
            }
        }
    } else {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler)
            }
        }
    }
}

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off : () => Function = function(){
    if (document.removeEventListener) {
        return function (element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false)
            }
        }
    } else {
        return function (element, event, handler) {
            if (element && event) {
                element.detachEvent('on' + event, handler)
            }
        }
    }
}
export const getUnion = getUnionArr
/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
 */
export const getIntersection :(arr1:Array<number|string>,arr2:Array<number|string>)=>
    Array<any>= (arr1, arr2) => {
    let len = Math.min(arr1.length, arr2.length)
    let i = -1
    let res = []
    while (++i < len) {
        const item = arr2[i]
        if (arr1.indexOf(item) > -1) res.push(item)
    }
    return res
}
/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf:(target:Array<any>,arr:Array<any>)=>Boolean = (target, arr) => {
    return target.some(_ => arr.indexOf(_) > -1)
}


/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer:() => string = () => {
    const ua = window.navigator.userAgent
    const isExplorer = (exp) => {
        return ua.indexOf(exp) > -1
    }
    if (isExplorer('MSIE')) return 'IE'
    else if (isExplorer('Firefox')) return 'Firefox'
    else if (isExplorer('Chrome')) return 'Chrome'
    else if (isExplorer('Opera')) return 'Opera'
    else if (isExplorer('Safari')) return 'Safari'
}
/**
 * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
 * 如果没有传入key这个参数，则判断obj对象是否有键值对
 */
export const hasKey:(obj:object,key:string)=>
    any = (obj, key) => {
    if (key) return key in obj
    else {
        let keysArr = Object.keys(obj)
        return keysArr.length
    }
}
let perfect = {
    sum,
    getTypeof,
    getParams,
    localSave,
    localRemove,
    localRead,
    Debounce,
    Throttle,
    on,
    off,
    getUnion,
    getIntersection,
    hasOneOf,
    getExplorer,
    hasKey
}
export default perfect