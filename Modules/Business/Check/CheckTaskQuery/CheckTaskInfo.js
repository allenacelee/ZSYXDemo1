/**
 * =========================================================================
 *
 * @file CheckTaskInfo
 * @description 巡店任务功能点巡店任务详细信息页面
 * =========================================================================
 *
 * @author linzixiong
 * @date 2017/3/6
 * @version 1.0
 * =========================================================================
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Button,
    TextInput,
    Dimensions,
    ListView,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import NavigationBar from '../../../Pub/NavigationBar/NavigationBar';

import CheckController from '../CheckController';
import CheckTaskInfoTabSign from "./CheckTaskInfoTabTask";
import CheckTaskInfoTabPhoto from './CheckTaskInfoTabPhoto';
import CheckTaskInfoTabRecord from "./CheckTaskInfoTabRecord";

//测试数据

const {width} = Dimensions.get("window");

export default class CheckTaskInfo extends Component {
    static defaultProps = {
        data: {
            state: "D",
            createTime: "2017-03-03",
            taskName: "检查实名信息保护公章"
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            isSelected: "sign" //sing photo record
        };
        this.checkController = new CheckController(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.props.data.taskName}
                    {...this.props}
                />
                <View style={styles.tabBarView}>
                    {this.renderTabBarComponent("巡店任务", "sign", "location-pin")}
                    {this.renderTabBarComponent("巡店照片", "photo", "camera")}
                    {this.renderTabBarComponent("巡店记录", "record", "new-message")}
                </View>
                {this.renderTabView()}
            </View>
        )
    }

    renderTabBarComponent(label, value, icon) {
        return (
            <TouchableWithoutFeedback onPress={()=> {
                this.setState({
                    isSelected: value,
                })
            }}>
                <View style={styles.tabButtonView}>
                    <Icon name={icon} size={18}
                          color={this.state.isSelected == value ? "#38A2E8" : "#C7C7C7"}/>
                    <Text
                        style={this.state.isSelected == value ? styles.tabBarTextSelect : styles.tabBarText}>{label}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    renderTabView() {
        let TabComponent;
        switch (this.state.isSelected) {
            case "sign":
                TabComponent = CheckTaskInfoTabSign;
                break;
            case "photo":
                TabComponent = CheckTaskInfoTabPhoto;
                break;
            case "record":
                TabComponent = CheckTaskInfoTabRecord;
                break;
        }
        return (
            <TabComponent/>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    tabBarView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width,
        height: 40,
        paddingVertical: 5,
        backgroundColor: "#F7F7F7",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#C7C7C7",
    },
    tabButtonView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,

    },
    tabBarTextSelect: {
        marginLeft: 5,
        fontSize: 15,
        color: "#38A2E8"
    },
    tabBarText: {
        marginLeft: 5,
        fontSize: 15,
        color: "#C7C7C7"
    },
});