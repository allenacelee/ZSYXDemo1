/**
 * =========================================================================
 *
 * @file WorkQuery
 * @description 工作查询功能点入口页面
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
    TextInput,
    Dimensions,
    ListView,
    Text,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import NavigationBar from '../../../Pub/NavigationBar/NavigationBar';
import ModalDropPicker from '../../../Pub/ModalDropPicker/ModalDropPicker'

import CheckController from '../CheckController';
import WorkQueryComponent from './WorkQueryComponent'
//测试数据

const {width} = Dimensions.get("window");

export default class WorkQuery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            workName: "",
            sts: "W",
            dataSource: [],
            isSelected: false, //是否多选
            modalVisible: false, //下拉选择框
            indicator: false, //加载框
            deleteIdList: [], //多选删除id
        };
        this.checkController = new CheckController(this);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2});
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title="工作查询"
                    indicator={this.state.indicator}
                    {...this.props}
                />
                <View style={styles.searchView}>
                    <TextInput style={styles.searchTextInput}
                               returnKeyType="done"
                               underlineColorAndroid="transparent"
                               placeholder="请输入工作名称"
                               onChangeText={(workName)=>this.setState({
                                   workName: workName,
                               })}
                    >
                    </TextInput>
                    <TouchableOpacity
                        onPress={()=>this.checkController.queryWorkList(this.state.sts, this.state.workName)}>
                        <Icon name={"search"} size={25} color="orange"/>
                    </TouchableOpacity>
                </View>
                <View style={styles.modalPickerView}>
                    {this.state.isSelected ?
                        <Text onPress={()=>this.setState({
                            isSelected: false,
                        })}>取消</Text>
                        : <View></View>}
                    <ModalDropPicker
                        modalVisible={this.state.modalVisible}
                        selectedValue={this.state.sts}
                        labelArray={["待办工作", "过期工作", "已办工作"]}
                        valueArray={["W", "P", "Y"]}
                        callbackPickerValue={(data)=>this.setState({
                            sts: data,
                            modalVisible: false,
                        })}
                    />
                    <TouchableOpacity onPress={()=>this.setState({
                        modalVisible: true,
                    })}>
                        <View style={{backgroundColor: '#F7F7F7'}}>
                            <Text
                                style={styles.modalPickerText}>{["待办工作", "过期工作", "已办工作"][["W", "P", "Y"].indexOf(this.state.sts)]}</Text>
                        </View>
                    </TouchableOpacity>
                    {this.state.isSelected ?
                        <TouchableOpacity onPress={()=>this.checkController.delCompletedTasks(this.state.deleteIdList)}>
                            <Icon name={"trash-o"} size={25} color="#666"/>
                        </TouchableOpacity>
                        : <View></View>}
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
        this.checkController.queryWorkList(this.state.sts, this.state.workName);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.sts == this.state.sts && nextState.workName == this.state.workName) {
            return true;
        } else {//修改查询类型
            this.checkController.queryWorkList(nextState.sts, nextState.workName);
            return true;
        }
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity
                onPress={()=>this.checkController.goToWorkInfo(rowData)}
                onLongPress={()=> {
                    if (this.state.sts == "Y") {
                        this.setState({
                            isSelected: true,
                        })
                    }
                }}
                style={styles.touchableView}
            >
                <WorkQueryComponent
                    rowData={rowData}
                    isSelected={this.state.isSelected}
                    backgroundColor={rowID % 2 == 1 ? '#F3F3F5' : '#E5EBF5'}
                    callbackID={(callbackID)=> {
                        let deleteIdList = this.state.deleteIdList;
                        let index = deleteIdList.indexOf(callbackID);
                        if (index == -1) {
                            deleteIdList.push(callbackID);
                        } else {
                            deleteIdList.splice(index, 1);
                        }
                        this.setState({
                            deleteIdList: deleteIdList,
                        });
                    }}
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
    modalPickerView: {
        backgroundColor: '#F7F7F7',
        alignItems: 'center',
        width: width,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#E7E7E7',
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalPickerText: {
        fontSize: 20,
        color: '#666'
    },
    touchableView: {}
});
