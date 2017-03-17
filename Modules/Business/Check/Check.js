/**
 * =========================================================================
 *
 * @file Check
 * @description 巡店功能点入口页面
 * =========================================================================
 *
 * @author linzixiong
 * @date 2017/3/3
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
import CheckController from "./CheckController";

//页面导入
import AutoCheck from "./AutoCheck/AutoCheck";
import WorkQuery from "./WorkQuery/WorkQuery";
import CheckTaskQuery from "./CheckTaskQuery/CheckTaskQuery";
import TaskCheck from "./TaskCheck/TaskCheck";

const {width} = Dimensions.get("window");

export default class Check extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            dataSource: [],
        };
        this.checkController = new CheckController(this);
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
                    {this.renderItem("工作查阅", WorkQuery, "#67BBCA")}
                    {this.renderItem("巡店任务查询", CheckTaskQuery, "#77B945")}
                    {this.renderItem("任务巡店", TaskCheck, "#FA861E")}
                    {this.renderItem("自主巡店", AutoCheck, "#EE5353")}
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
        width: width * 0.45,
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
        justifyContent: 'space-around',
        alignItems: 'center',
    }
});
