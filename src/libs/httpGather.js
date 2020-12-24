import * as Methods from './httpFun'
import * as Url from './Api'
//登陆
export const loginFun = (param) => {
    return Methods.post(Url.login,param,true)
}
//用户信息
export const infoFun = (data) => {
    return Methods.get(Url.info,data)
}