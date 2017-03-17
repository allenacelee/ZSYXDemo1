/**
 * =========================================================================
 *
 * @file【公共组件】导航栏
 * @description 可定制型导航栏，自动检测层级，并在二级以上页面增添左侧返回按钮
 *              实现Android实体返回键的监听
 * =========================================================================
 *
 * @param backgroundColor: '#F7F7F7',
 * @param leftButtonIcon: 'chevron-left',           //左侧图标，Entypo库,返回的左箭头为“chevron-left”
 * @param //onPressLeftIcon: ()=>{},                //左侧图标点击事件，多数情况使用返回功能（传入{()=>this.props.navigator.pop()}）
 * @param title: 'Title',                           //中部标题
 * @param titleColor: 'orange',                     //中部标题颜色
 * @param isRightButtonText: false,                 //判断右侧是否为文字
 * @param rightButtonIcon: '',                      //右侧内容，Entypo库图标（isRightButtonText为false时）或文字（isRightButtonText为true时）
 * @param onPressRightIcon: ()=> {},                //右侧点击事件
 * @param disableBackAndroid: false,                //是否禁用返回键返回到上一级页面
 * @param width: Dimensions.get('window').width     //整体宽度，横屏时传入屏幕高度即可
 * =========================================================================
 *
 * @example ./Demo.js  TODO
 * @todo 优化数据创建方法
 *
 * @author linzixiong
 * @date 2016/12/8
 * @version 1.0
 * =========================================================================
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    BackAndroid,
    StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';


export default class NavigationBar extends Component {
    static defaultProps = {
        backgroundColor: '#F7F7F7',
        leftButtonIcon: 'chevron-left',//左侧图标，Entypo库,返回的左箭头为“chevron-left”
        //onPressLeftIcon: ()=>{},//左侧图标点击事件，多数情况使用返回功能（传入{()=>this.props.navigator.pop()}）
        title: 'Title',//中部标题
        titleColor: 'orange',//中部标题颜色
        isRightButtonText: false,//判断右侧是否为文字
        rightButtonIcon: '',//右侧内容，Entypo库图标（isRightButtonText为false时）或文字（isRightButtonText为true时）
        onPressRightIcon: ()=> {
        },//右侧点击事件
        disableBackAndroid: false,//是否禁用返回键返回到上一级页面
        width: Dimensions.get('window').width //整体宽度，横屏时传入屏幕高度即可
    };

    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        return (
            <View>
                <StatusBar
                    backgroundColor='rgba(0, 0, 0, 0.4)'
                    //barStyle="light-content"
                    translucent={true}
                />
                {/*ios增加宽度为24的状态栏*/}
                {/*Android已启用沉浸式状态栏，与ios通用*/}
                {/*<View style={{height: __IOS__ ? 24 : 24, backgroundColor: this.props.backgroundColor}}></View>*/}
                <View style={{height: 24, backgroundColor: this.props.backgroundColor}}></View>
                {/*导航条视图*/}
                <View style={[styles.navBarViewStyle, {
                    backgroundColor: this.props.backgroundColor,
                    width: this.props.width,
                }]}>
                    {/*左部视图（默认为返回键）*/}
                    {this.renderLeftView()}
                    {/*中部视图（默认为标题）*/}
                    {this.renderMiddleView()}
                    {/*右部按钮视图（默认为空）*/}
                    {this.renderRightView()}

                </View>
            </View>
        )
    };

    // 左侧视图View
    renderLeftView() {
        let nav = this.props.navigator;
        let routers = nav.getCurrentRoutes();
        // if (this.props.leftButtonIcon == '') {
        if (routers.length <= 1) {
            return (
                <View style={{width: 25}}></View>
            )
        } else {
            return (
                <TouchableOpacity onPress={()=>this.onBack()}>
                    <Icon name={this.props.leftButtonIcon} size={30} color="orange"/>
                </TouchableOpacity>
            )
        }
    };

    // 中部标题视图View
    renderMiddleView() {
        return (
            <View style={{width: this.props.width * 0.7, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: this.props.titleColor, fontSize: 20,}} numberOfLines={1}>{this.props.title}</Text>
            </View>
        )
    };

    // 右部视图View
    renderRightView() {
        if (this.props.rightButtonIcon == '') {//没有右侧视图
            return (
                <View style={{width: 25}}></View>
            )
        } else {
            if (this.props.isRightButtonText) {//右侧视图为文字
                return (
                    <TouchableOpacity onPress={()=> {
                        this.props.onPressRightIcon()
                    }}>
                        <Text style={{fontSize: 17, color: "orange"}}>{this.props.rightButtonIcon}</Text>
                    </TouchableOpacity>
                )
            } else {
                return (
                    <TouchableOpacity onPress={()=> {//右侧视图为Entypo库图标
                        this.props.onPressRightIcon()
                    }}>
                        <Icon name={this.props.rightButtonIcon} size={30} color="orange"/>
                    </TouchableOpacity>
                )
            }
        }
    };


    componentWillMount() {
        // 为Android增加返回键的监听事件
        if (__ANDROID__ && !this.props.disableBackAndroid) {
            BackAndroid.addEventListener('hardwareBackPress', ()=>this.onBack());
        }
        this.setState({
            width: Dimensions.get('window').width,
        })
    }

    componentWillUnmount() {
        // 为Android卸载返回键的监听事件
        if (__ANDROID__ && !this.props.disableBackAndroid) {
            BackAndroid.removeEventListener('hardwareBackPress', ()=>this.onBack());
        }
    };

    // 返回前一页
    onBack() {
        let nav = this.props.navigator;
        let routers = nav.getCurrentRoutes();
        if (routers.length > 1) {
            nav.pop();
            return true;
            // } else if (this.lastBackPressed && (this.lastBackPressed + 2000 >= Date.now())) {
            //     //最近2秒内按过back键，可以退出应用。
            //     return false;
        } else {
            // this.lastBackPressed = Date.now();
            // ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
            // return true;
            return false;
        }
    };
}

const styles = StyleSheet.create({
    navBarViewStyle: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    navImageStyle: {
        width: 25,
        height: 25,
        marginLeft: 3,
    },
});
