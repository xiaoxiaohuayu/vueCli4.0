// 存储
const _setStorage = (key, value)=>{
    sessionStorage.setItem(key, JSON.stringify(value));
}
// 查找
const _getStorage = (key)=>{
    return JSON.parse(sessionStorage.getItem(key));
}
 
const _getForIndexStorage = (index)=>{
    return sessionStorage.key(index)
}
// 删除
const _removeStorage = (key)=>{
    sessionStorage.removeItem(key);
}
// 清空
const _removeAllStorage = ()=>{
    sessionStorage.clear();
}
 
export default {
    _removeAllStorage,
    _removeStorage,
    _getForIndexStorage,
    _getStorage,
    _setStorage,
}