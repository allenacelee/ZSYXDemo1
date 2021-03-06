﻿/**
 * =========================================================================
 *
 * @file TaskCheck
 * @description 任务巡店功能点入口页面
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
    Button,
    TextInput,
    Dimensions,
    ListView,
    Text,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import NavigationBar from '../../../Pub/NavigationBar/NavigationBar';
import ModalDropPicker from '../../../Pub/ModalDropPicker/ModalDropPicker';

import CheckController from '../CheckController';

import TaskCheckComponent from './TaskCheckComponent';

//测试数据

const {width} = Dimensions.get("window");

export default class TaskCheck extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taskName: "",
            sortType: "U",
            dataSource: [],
            modalVisible: false,
        };
        this.checkController = new CheckController(this);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2});
    }

    render() {
        return (
            <View style={styles.container}>
                <ModalDropPicker
                    modalVisible={this.state.modalVisible}
                    selectedValue={this.state.sortType}
                    labelArray={["要求完成时间升序", "要求完成时间降序"]}
                    valueArray={["U", "D"]}
                    callbackPickerValue={(callbackPickerValue)=>this.setState({
                        sortType: callbackPickerValue,
                        modalVisible: false,
                    })}
                />
                <NavigationBar
                    title="任务巡店"
                    rightButtonIcon="menu"
                    onPressRightIcon={()=>this.setState({
                        modalVisible: true,
                    })}
                    {...this.props}
                />
                <View style={styles.searchView}>
                    <TextInput style={styles.searchTextInput}
                               returnKeyType="done"
                               underlineColorAndroid="transparent"
                               placeholder="请输入任务名称"
                               onChangeText={(taskName)=>this.setState({
                                   taskName: taskName,
                               })}
                    >
                    </TextInput>
                    <TouchableOpacity onPress={()=>this.checkController.queryTaskList(this.state.sortType)}>
                        <Icon name={"search"} size={25} color="orange"/>
                    </TouchableOpacity>
                </View>
                <ListView
                    dataSource={this.ds.cloneWithRows(this.state.dataSource)}
                    renderRow={this.renderRow.bind(this)}
                    style={{flex: 1, width: width}}
                    enableEmptySections={true}
                />
            </View>
        )
    }

    componentDidMount() {
        this.checkController.queryTaskList(this.state.sortType);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.sortType == this.state.sortType && nextState.taskName == this.state.taskName) {
            return true;
        } else {//修改查询类型
            this.checkController.queryTaskList(nextState.sortType);
            return true;
        }
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity onPress={()=>this.checkController.goToCheck(rowData, true, false)}>
                <TaskCheckComponent
                    rowData={rowData}
                    backgroundColor={rowID % 2 == 1 ? '#F3F3F5' : '#E5EBF5'}//F9AB6B//E6E2EB//rgba(248,248,240,1.0)//F9F9FB//F5F7F7
                />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    searchView: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: "#E7E7E7",
        width: width * 0.95,
        height: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
        marginVertical: 10,
    },
    searchTextInput: {
        width: width * 0.8,
        color: '#666',
    },
});