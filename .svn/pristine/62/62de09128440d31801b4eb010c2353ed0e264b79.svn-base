/**
 * =========================================================================
 *
 * @file Store
 * @description 巡店功能点入口页面
 * =========================================================================
 *
 * @author linzixiong
 * @date 2017/3/20
 * @version 1.0
 * =========================================================================
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

import NavigationBar from '../../Pub/NavigationBar/NavigationBar'
import StoreController from "./StoreController";

//页面导入
import StoreEvaluate from './StoreEvaluate/StoreEvaluate';
import StoreEvaluateCheck from './StoreEvaluateCheck/StoreEvaluateCheck';
import StoreLocation from './StoreLocation/StoreLocation';
import StoreLocationCheck from './StoreLocationCheck/StoreLocationCheck';

const {width} = Dimensions.get("window");

export default class Store extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            dataSource: [],
        };
        this.storeController = new StoreController(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title="巡店管理"
                    {...this.props}
                />
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                    horizontal={true}
                >
                    {this.renderItem("门店评级", StoreEvaluate, "#67BBCA")}
                    {this.renderItem("门店评级审核", StoreEvaluateCheck, "#77B945")}
                    {this.renderItem("门店位置采集", StoreLocation, "#FA861E")}
                    {this.renderItem("门店位置采集审核", StoreLocationCheck, "#EE5353")}
                </ScrollView>
            </View>
        )
    }

    renderItem(title, component, backgroundColor) {
        return (
            <TouchableOpacity onPress={()=> this.props.navigator.push({
                component: component,//具体版块
            })}>
                <View style={[styles.itemView, {backgroundColor: backgroundColor}]}>
                    <Icon name="logo-buffer" size={40} color="white"/>
                    <Text style={{color: 'white', fontSize: 16, flex: 1, textAlign: 'center'}}>{title}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    itemView: {
        width: width * 0.75,
        borderRadius: 5,
        height: 50,
        flexDirection: 'row',
        marginTop: 30,
        alignItems: 'center',
        paddingLeft: 10,
    },
    scrollView: {
        width: width,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
