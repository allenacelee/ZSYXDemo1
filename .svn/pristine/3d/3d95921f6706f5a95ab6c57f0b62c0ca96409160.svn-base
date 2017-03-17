/**
 * =========================================================================
 *
 * @file 网络连接服务公共类
 * @description
 * =========================================================================
 *
 * @requires ConstantService
 * @requires EncryptService
 * =========================================================================
 *
 * @example
 * @todo
 *
 * @author linzixiong
 * @date 2016/12/20
 * @version 1.0
 * =========================================================================
 */

import ConstantService from './ConstantService'
import EncryptService from './EncryptService'

export default class CommunicateService {
    /**
     * 网络请求通用接口
     * @param serviceName 需要调用的服务名称
     * @param methodName 需要调用的方法 默认是action
     * @param data 入参
     * @returns {Promise.<TResult>}
     */
    static communicate(serviceName, methodName, data) {
        let body = EncryptService.encrypt(_transfer(serviceName, methodName, data));
        // console.log(_transfer(serviceName, methodName, data));
        // console.log(body);
        return fetch(ConstantService.URL, {
            method: 'POST',
            body: body
        }).then((response) => {
            return response.json();
        });
    };

    /**
     * 图片上传专用网络接口
     * @param serviceName 需要调用的服务名称
     * @param methodName 需要调用的方法
     * @param data
     * @returns {Promise.<TResult>}
     */
    static communicateImage(serviceName, methodName, data) {
        return fetch(ConstantService.URL, {
            method: 'POST',
            body: EncryptService.encrypt(_transfer(serviceName, methodName, {
                data: data.data,
                fileName: data.fileName
            })),
        }).then((response) => {
            return response.json();
        });
    };
}

let _transfer = function (targetService, targetMethod, data) {
    let json = {
        "mobileParam": {
            "serviceName": "appService",
            "methodName": "action"
        },
        "mobileBody": {
            "targetService": targetService,
            "targetMethod": targetMethod,
            "content": data
        },
        "mobileHead": {
            "client": {
                "applicationId": "mms",
                "netType": "WIFI",
                "versionCode": 1,
                "versionName": "1.0.0-SNAPSHOT"
            },
            "equipment": {
                "deviceId": "8888888888",
                "phoneNum": "18600463618",
                "name": "虚拟测试机",
                "osName": "Android",
                "osVersion": "19",
                "version": "4.2.2"
            },
            "other": {
                "country": "中国",
                "lan": "zh",
                "timeZone": "中国标准时间"
            },
            "personal": {
                "userId": "111111"
            }

        }
    };
    return JSON.stringify(json);
};