/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Dimensions,
    Image,
    View,
    StatusBar
} from 'react-native';
import Storage from 'react-native-storage';

/**导入登陆页面**/
import LoginPage from './LoginPage'
/**导入主页页面**/
import Main from './Main'
import MainController from './MainController'

const {width, height} = Dimensions.get('window');

export default class Launch extends Component {
    constructor(props) {
        super(props);
        this.mainController = new MainController(this);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    backgroundColor='rgba(0, 0, 0, 0)'
                    //barStyle="light-content"
                    translucent={true}/>
                <Image style={styles.launchImageStyle} source={require('./../Img/launchImage.png')}/>
            </View>
        );
    }

    componentDidMount() {
        this.mainController.initStorage();

        /** 设置全局变量
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
            // sync: require('./sync')
        });
        // 最好在全局范围内创建一个（且只有一个）storage实例，方便直接调用
        // 这样，在此之后的任意位置即可以直接调用storage
        console.log('开始设置全局变量');
        global.storage = storages;
        global.userId = '';

        /** 添加同步方法
        console.log('添加同步方法');
        require('./sync');
        /** 获取用户唯一标识id并设置全局变量
        storage.load({
            key: 'userId',
            syncInBackground: false
        }).then(id=> {
            userId = id;
        }).then(()=> {

            /** 读取是否已有登录信息
            storage.load({
                key: 'isLogged',
                //id: userId,
                // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
                autoSync: true,

                /** 过期则必须重新登录
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
                    /** 若已登录，则跳过登录页面直接进入主页
                    setTimeout(()=> {
                        this.props.navigator.replace({
                                component: Main
                            }
                        )
                    }, 2000);
                } else {
                    /** 若登录信息过期或未登录，则进入登录页面
                    /** 读取是否记住用户名和已记住的用户名
                    // 使用和load方法一样的参数读取批量数据，但是参数是以数组的方式提供。
                    // 会在需要时分别调用相应的sync方法，最后统一返回一个有序数组
                    storage.getBatchData([
                        {key: 'rememberUserIsSelected'},
                        {key: 'rememberUserName'}]).then(result=> {
                        console.log(result);
                        let [rememberUserIsSelected, rememberUserName]=result;
                        setTimeout(()=> {
                            this.props.navigator.replace({
                                    component: LoginPage,
                                    params: {
                                        rememberUserIsSelected: rememberUserIsSelected,
                                        rememberUserName: rememberUserName
                                    }
                                }
                            )
                        }, 2000);
                    });
                }
            }).catch(err => {
                //如果没有找到数据且没有sync方法，
                //或者有其他异常，则在catch中返回
                console.warn(err.name);
                console.warn(err.message);
            });
        });*/
    }
}

const styles = StyleSheet.create({
    launchImageStyle: {
        width: width,
        height: height
    }
});
