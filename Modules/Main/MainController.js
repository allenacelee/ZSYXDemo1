/**
 * =========================================================================
 *
 * @file MainController
 * @description 请在每个页面中的constructor()方法里实例化一个当前controller，逻辑类型方法全部放在controller中
 * =========================================================================
 *
 * @param initStorage()     //初始化全局变量storages，并跳转到登录页面
 * @param doLogin()         //在线登录
 * @param doLoginOffline()  //离线登录（测试使用）
 * =========================================================================
 *
 * @example constructor()中实例化后：this.mainController.initStorage();
 *
 * @author linzixiong
 * @date 2016/12/28
 * @version 1.0
 * =========================================================================
 */
import {AsyncStorage} from 'react-native';
import Storage from 'react-native-storage';
import ConstantService from '../System/Service/ConstantService'
import MD5Service from '../System/Service/MD5Service'
import CommunicateService from '../System/Service/CommunicateService'
import Main from './Main'
import LoginPage from './LoginPage'
import tsconfig from './tsconfig.json'

export default class MainController {
    constructor(that) {
        this.that = that;
    }

    /**
     * 初始化全局变量storages，并跳转到登录页面
     */
    initStorage() {
        /** 设置全局变量*/
        var storages = new Storage({
            // 最大容量，默认值1000条数据循环存储
            size: 1000,

            // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
            // 如果不指定则数据只会保存在内存中，重启后即丢失
            storageBackend: AsyncStorage,

            // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
            defaultExpires: 1000 * 3600 * 24,

            // 读写时在内存中缓存数据。默认启用。
            enableCache: true,

            // 如果storage中没有相应数据，或数据已过期，
            // 则会调用相应的sync方法，无缝返回最新数据。
            // 你可以在构造函数这里就写好sync的方法
            // 或是写到另一个文件里，这里require引入
            // 或是在任何时候，直接对storage.sync进行赋值修改
            //sync: require('./sync')
            sync: {
                userId(params){
                    let {resolve, reject} = params;
                    console.log('【用户唯一标识id】默认给1000');
                    resolve && resolve('1000');
                },


                /** 若没有登录信息或登录信息过期则强制重新登录*/
                isLogged(params){
                    let {id, resolve, reject} = params;
                    console.log('【强制重新登录】没有登录信息或登录信息过期');
                    resolve && resolve(false);
                },

                /** 第一次进入登陆页面不记住用户名*/
                isRememberUserName(params){
                    let {resolve, reject} = params;
                    console.log('【不记住用户名】第一次进入登陆页面不记住用户名');
                    resolve && resolve(false);
                },

                /** 第一次进入登陆页面不记住用户名*/
                rememberUserName(params){
                    let {resolve, reject} = params;
                    console.log('【置空记住用户名】第一次进入登陆页面置空记住的用户名')
                    resolve && resolve('');
                },

                /**
                 * 确认是否存储了所有数据
                 * @param params
                 */
                isLoaded(params){

                }
            }
        });
        // 最好在全局范围内创建一个（且只有一个）storage实例，方便直接调用
        // 这样，在此之后的任意位置即可以直接调用storage
        console.log('初始化全局变量');
        global.storage = storages;
        global.userId = '';

        /** 添加同步方法*/
        console.log('添加同步方法');
        //require('./sync');

        console.log('添加同步方法成功');
        /** 获取用户唯一标识id并设置全局变量*/
        storage.load({
            key: 'userId',
            syncInBackground: false
        }).then(id=> {
            console.log('读取userId并设置userId的全局变量：' + id);
            userId = id;
        }).then(()=> {

            /** 读取是否已有登录信息*/
            storage.load({
                key: 'isLogged',
                //id: userId,
                // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
                autoSync: true,

                /** 过期则必须重新登录*/
                // syncInBackground(默认为true)意味着如果数据过期，
                // 在调用sync方法的同时先返回已经过期的数据。
                // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
                syncInBackground: false
            }).then(isLogged => {
                // 如果找到数据，则在then方法中返回
                // 注意：这是异步返回的结果
                // 你只能在then这个方法内继续处理ret数据
                // 而不能在then以外处理
                // 也没有办法“变成”同步返回
                // 你也可以使用“看似”同步的async/await语法
                // TODO 增加时间判断方法
                if (isLogged) {
                    /** 若已登录，则跳过登录页面直接进入主页*/
                    setTimeout(()=> {
                        this.that.props.navigator.replace({
                            component: Main
                        })
                    }, 2000);
                } else {
                    /** 若登录信息过期或未登录，则进入登录页面*/
                    /** 读取是否记住用户名和已记住的用户名*/
                    // 使用和load方法一样的参数读取批量数据，但是参数是以数组的方式提供。
                    // 会在需要时分别调用相应的sync方法，最后统一返回一个有序数组
                    storage.getBatchData([
                        {key: 'isRememberUserName'},
                        {key: 'rememberUserName'}]).then(result=> {
                        console.log(result);
                        let [isRememberUserName, rememberUserName]=result;
                        setTimeout(()=> {
                            this.that.props.navigator.replace({
                                    component: LoginPage,
                                    params: {
                                        isRememberUserName: isRememberUserName,
                                        rememberUserName: rememberUserName
                                    }
                                }
                            )
                        }, 1000);
                    });
                }
            }).catch(err => {
                //如果没有找到数据且没有sync方法，
                //或者有其他异常，则在catch中返回
                console.warn(err.name);
                console.warn(err.message);
            });
        });

    }


    /**
     * 在线登录操作
     */
    doLogin() {
        //加载遮罩层
        this.that.setState({
            modalVisible: true,
        });
        //构造网络连接数据
        let contentUser = {
            username: this.that.state.userName,
            userpassword: MD5Service.hex_md5(this.that.state.userPassword),
            userimei: null,
            usermobile: null,
            clientVersion: ConstantService.CLIENT_VERSION
        };

        //更新是否记住用户名信息
        if (this.that.state.isRememberUserName) {
            //若选择记住用户名则保存用户名
            storage.save({key: 'isRememberUserName', rawData: true});
            storage.save({key: 'rememberUserName', rawData: this.that.state.userName});
            storage.getBatchData([
                {key: 'isRememberUserName'},
                {key: 'rememberUserName'}]).then(result=> {
                console.log('记住用户名并保存: isRememberUserName:' + result[0] + 'rememberUserName:' + result[1]);
            });
        } else {
            //若选择不记住用户名则清空
            storage.save({key: 'isRememberUserName', rawData: false});
            storage.save({key: 'rememberUserName', rawData: ''});
        }

        //网络连接进行登录
        CommunicateService.communicate('loginService', 'login', contentUser)
            .then((msg)=> {
                if (msg.isSuccess == '1' && (msg.data.initPwdFlag == 'N' || msg.data.initPwdFlag == '')) {
                    //登录成功
                    //CommunicateService.isLogged = true;
                    let data = msg.data;
                    // 存储登录用户信息
                    for (let key in data) {
                        storage.save({
                            key: key,
                            id: userId,
                            rawData: data[key],
                        });
                    }
                    //存储页面信息到 pageCode+'PageData'（eg.主页key为'homePageData',报表key为'reportPageData'）
                    let pages = data.pages;
                    for (let value of pages) {
                        storage.save({
                            key: value.pageCode + 'PageData',
                            id: userId,
                            rawData: value,
                        })
                    }
                    //设置isLoaded存储变量用于辨识存储是否结束
                    storage.save({
                        key: "isLoaded",
                        id: userId,
                        rawData: true,
                    });

                    let int = setInterval(()=> {
                        storage.load({key: "isLoaded", id: userId})
                            .then((isLoaded)=> {
                                if (isLoaded) {
                                    console.log("读取到isLoaded并为true");
                                    //更新登录状态 TODO
                                    //storage.save({key: 'isLogged', id: userId, rawData: true})
                                    //解除遮罩层
                                    this.that.setState({
                                        modalVisible: false,
                                    });
                                    //跳转到主页面
                                    this.that.props.navigator.replace({
                                        component: Main
                                    });
                                    clearInterval(int);
                                }
                            })
                            .catch((e)=> {
                                console.warn(e);
                            })
                    }, 10);
                } else if (msg.isSuccess == '1' && msg.data.initPwdFlag == 'Y') {
                    //密码修改
                    //解除遮罩层
                    this.that.setState({
                        modalVisible: false,
                    });
                    alert(`{type: "info", title: "密码修改", body: "登录密码为初始密码，请修改后重新登录"}`);
                } else {
                    //登录失败
                    //解除遮罩层
                    this.that.setState({
                        modalVisible: false,
                    });
                    console.log(msg);
                    alert(`{type: "error", title: "登录失败", body: "登录用户名或密码错误"}`);

                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    /**
     * 离线登录操作
     */
    doLoginOffline() {
        //加载遮罩层
        this.that.setState({
            modalVisible: true,
        });
        //构造网络连接数据
        let contentUser = {
            username: this.that.state.userName,
            userpassword: MD5Service.hex_md5(this.that.state.userPassword),
            userimei: null,
            usermobile: null,
            clientVersion: ConstantService.CLIENT_VERSION
        };

        //更新是否记住用户名信息
        if (this.that.state.isRememberUserName) {
            //若选择记住用户名则保存用户名
            storage.save({key: 'isRememberUserName', rawData: true});
            storage.save({key: 'rememberUserName', rawData: this.that.state.userName});
            storage.getBatchData([
                {key: 'isRememberUserName'},
                {key: 'rememberUserName'}]).then(result=> {
                console.log(result);
            });
        } else {
            //若选择不记住用户名则清空
            storage.save({key: 'isRememberUserName', rawData: false});
            storage.save({key: 'rememberUserName', rawData: ''});
        }

        //离线登录
        if (true) {
            let msg = tsconfig;
            if (msg.isSuccess == '1' && (msg.data.initPwdFlag == 'N' || msg.data.initPwdFlag == '')) {
                //登录成功
                //CommunicateService.isLogged = true;
                let data = msg.data;
                // 存储登录用户信息
                for (let key in data) {
                    storage.save({
                        key: key,
                        id: userId,
                        rawData: data[key],
                    });
                }
                //存储页面信息到 pageCode+'PageData'（eg.主页key为'homePageData',报表key为'reportPageData'）
                let pages = data.pages;
                // storage.load({key: 'pages', id: userId}).then(pages=> {
                for (let value of pages) {
                    storage.save({
                        key: value.pageCode + 'PageData',
                        id: userId,
                        rawData: value,
                    })
                }
                // });

                storage.save({
                    key: "isLoaded",
                    id: userId,
                    rawData: true,
                });

                let int = setInterval(()=> {
                    storage.load({key: "isLoaded", id: userId})
                        .then((isLoaded)=> {
                            if (isLoaded) {
                                console.log("读取到isLoaded并为true");
                                //更新登录状态 TODO
                                //storage.save({key: 'isLogged', id: userId, rawData: true})
                                //解除遮罩层
                                this.that.setState({
                                    modalVisible: false,
                                });
                                //跳转到主页面
                                this.that.props.navigator.replace({
                                    component: Main
                                });
                                clearInterval(int);
                            }
                        })
                        .catch((e)=> {
                            console.warn(e);
                        })
                }, 1);
            } else if (msg.isSuccess == '1' && msg.data.initPwdFlag == 'Y') {
                //密码修改
                //解除遮罩层
                this.that.setState({
                    modalVisible: false,
                });
                alert(`{type: "info", title: "密码修改", body: "登录密码为初始密码，请修改后重新登录"}`);
            } else {
                //登录失败
                //解除遮罩层
                this.that.setState({
                    modalVisible: false,
                });
                console.log(msg);
                alert(`{type: "error", title: "登录失败", body: "登录用户名或密码错误"}`);
            }
        } else {
            //登录失败
            //解除遮罩层
            this.that.setState({
                modalVisible: false,
            });
            alert(`{type: "error", title: "登录失败", body: "登录用户名或密码错误"}`);
        }
    }

    /**
     * Android用户点击返回键取消登录
     */
    cancelLogin() {

    }
}