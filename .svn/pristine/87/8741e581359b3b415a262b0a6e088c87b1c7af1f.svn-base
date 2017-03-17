/**
 * =========================================================================
 *
 * @file CheckTaskCreaterQuery
 * @description 巡店任务查询创建人查询选择页面
 * =========================================================================
 *
 * @author linzixiong
 * @date 2017/3/7
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
    TouchableOpacity,
    DeviceEventEmitter,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationBar from '../../../Pub/NavigationBar/NavigationBar'
import ModalAreaPicker from '../../../Pub/ModalAreaPicker/ModalAreaPicker'
import GridTable from '../../../Pub/GridTable/GridTable'
import CheckController from "../CheckController";

const {width} = Dimensions.get("window");

export default class CheckTaskCreaterQuery extends Component {
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
        };
        this.checkController = new CheckController(this);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2});
    }

    render() {
        return (
            <View style={styles.container}>
                {/*导航条*/}
                <NavigationBar
                    title="选择员工"
                    //rightButtonIcon="magnifying-glass"
                    //onPressRightIcon={()=>this.search()}
                    {...this.props}
                />
                <View style={styles.searchView}>
                    <TextInput style={styles.searchTextInput}
                               returnKeyType="done"
                               underlineColorAndroid="transparent"
                               placeholder="员工姓名"
                               onChangeText={(workName)=>this.setState({
                                   workName: workName,
                               })}
                    >
                    </TextInput>
                    <TouchableOpacity onPress={()=>this.checkController.checkTaskCreaterQuery()}>
                        <Icon name={"search"} size={25} color="orange"/>
                    </TouchableOpacity>
                </View>
                {/* 营销单元选择器 */}
                <ModalAreaPicker
                    pickerTitle='营销单元'
                    callbackPickerValue={(callbackPickerValue)=>this.setState({
                        areaId: callbackPickerValue,
                    })}
                    viewStyle={styles.modalPickerView}
                    textStyle={styles.modalPickerText}
                />
                {/*表格数据*/}
                <GridTable
                    titleArray={['分公司', '分局', '网格', '员工编码', '员工姓名']}
                    titleWidthArray={[80, 130, 130, 100, 100]}
                    titleHeight={40}
                    dataSource={this.state.dataSource}
                    dataNameArray={['qujuName', 'fenjuName', 'wanggeName', 'staffId', 'staffName']}
                    isTouchable={true}
                    onTouchable={(rowData)=>this.callBackCreaterName(rowData)}
                    //stickyColumnNumber={1}
                />
            </View>
        );
    }

    callBackCreaterName(rowData) {
        DeviceEventEmitter.emit("createrName", rowData);
        this.props.navigator.pop();
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
        justifyContent: 'center',
    },
    modalPickerText: {
        fontSize: 20,
        color: '#666'
    }
});
