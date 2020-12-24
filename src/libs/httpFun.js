import service from './request'
import qs from 'qs'
// console.log(service)
/**
 * get 请求方法
 * @param url
 * @param params
 * @returns { Promise }
 */
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        service.get(url, {
            params: params
        }).then(response => {
            resolve(response.data);
        }, err => {
            reject(err)
        }).catch(err => {
            reject(err)
        })
    })
}

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns { Promise }
 */
export function post(url, data = {},stringFromat) {
    return new Promise((resolve, reject) => {
        if(stringFromat){
            data = qs.stringify(data, {arrayFormat: 'brackets'})
        }
        service.post(url, data)
            .then(response => {
                // resolve(response.data);
                resolve(response);
            }, err => {
                reject(err)
            }).catch(err => {
                reject(err)
            })
    })
}

/**
 * put 请求方法
 * @param url
 * @param data
 * @returns { Promise }
 */
export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        service.put(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            }).catch(err => {
                reject(err)
            })
    })
}