// typescript中继承Array、Map、Set报错
/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnionArr = (arr1, arr2) => {
    return Array.from(new Set([...arr1, ...arr2]))
}
