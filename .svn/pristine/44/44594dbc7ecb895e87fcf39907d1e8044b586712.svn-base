/**
 * =========================================================================
 *
 * @file TaskCheckExecuteTabRecord
 * @description 任务巡店功能点巡店执行页面Tab页面巡店记录
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
    Text,
    Dimensions,
    ScrollView,
    TextInput,
    TouchableOpacity
} from 'react-native';

import CheckController from '../CheckController';
import ModalPicker from '../../../Pub/ModalPicker/ModalPicker';

//测试数据
import templetData from './test_task_check_record.json'
const {height, width} = Dimensions.get('window');

export default class TaskCheckExecuteTabRecord extends Component {
    static defaultProps = {
        autoCheck: false,
        templetId: '0',
    };

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            dataSource: [],
            id: '0000',
            templetId: this.props.autoCheck ? '0' : 'A',
        };
        this.checkController = new CheckController(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {this.props.autoCheck ?
                        <ModalPicker
                            initTitle="点击选择检查模板"
                            pickerTitle='检查模板'
                            selectedValue={this.state.templetId}
                            callbackPickerValue={(data)=>this.setState({templetId: data})}
                            labelArray={['合作营业厅', '营业厅专区模板', '普通沃代理点', '大兴-代理点模板', '不使用模板']}
                            valueArray={['A', 'B', 'C', 'D', '0']}
                            viewStyle={styles.modalPickerView}
                            textStyle={styles.modalPickerText}
                        />
                        :
                        <View>
                        </View>
                    }

                    <View style={{width: width - 10, marginLeft: 5, marginRight: 5,}}>
                        {this.renderItem()}
                    </View>
                    <View
                        style={{height: height / 3, width: width - 10, marginTop: 30, marginLeft: 5, marginRight: 5,}}>
                        <Text style={{fontSize: 20}}>巡店记录：</Text>
                        <TextInput
                            placeholder="请在此处输入"
                            style={styles.textInputStyle}
                            editable={true}
                            multiline={true}
                        >
                        </TextInput>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={()=> {
                            alert("已提交")
                        }}><View style={styles.buttonStyle}><Text
                            style={{color: 'white'}}>提交</Text></View></TouchableOpacity>
                        <TouchableOpacity onPress={()=> {
                            alert("取消")
                        }}><View style={styles.buttonStyle}><Text
                            style={{color: 'white'}}>取消</Text></View></TouchableOpacity>
                        <TouchableOpacity onPress={()=> {
                            alert("签退")
                        }}><View style={styles.buttonStyle}><Text
                            style={{color: 'white'}}>签退</Text></View></TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }

    renderItem() {
        let evaluationData = [];
        switch (this.state.templetId) {
            case 'A':
                evaluationData = templetData.categoryA;
                break;
            case 'B':
                evaluationData = templetData.categoryB;
                break;
            case 'C':
                evaluationData = templetData.categoryC;
                break;
            case 'D':
                evaluationData = templetData.categoryD;
                break;
        }
        let itemArray = [];
        for (o in evaluationData) {
            itemArray.push(
                <View key={o}
                      style={ [styles.scrollCellStyle, {backgroundColor: o % 2 == 0 ? 'rgba(248,248,240,1.0)' : 'white'}]}>
                    <View style={styles.scrollViewItemStyle}>
                        <Text style={{fontSize: 15}}>
                            {evaluationData[o].name}——{evaluationData[o].item}：
                        </Text>
                    </View>
                    <ModalPicker
                        pickerTitle='评价选择'
                        selectedValue={this.state.id}
                        callbackPickerValue={(data)=>this.setState({id: data})}
                        labelArray={templetData.evaluation}
                        valueArray={templetData.evaluationCode}
                        viewStyle={styles.pickerStyle}
                        textStyle={{fontSize: 15, color: "#666"}}
                    />
                </View>
            );

        }
        return itemArray;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    scrollViewStyle: {
        height: height / 3,
        borderWidth: 0.5,
        borderColor: 'white'

    },
    scrollViewItemStyle: {
        width: width * 0.7,
        margin: 5,
        justifyContent: 'center',
    },
    scrollCellStyle: {
        height: 50,
        width: width - 10,
        flexDirection: 'row',
    },
    pickerStyle: {
        width: width * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInputStyle: {
        width: width - 10,
        height: 150,
        borderWidth: 1,
        borderColor: '#666',
        textAlign: 'left',
        fontSize: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30,
    },
    buttonStyle: {
        backgroundColor: '#00B1F0',
        margin: 20,
        width: (width - 45) / 3,
        height: 30,
        borderRadius: 10,
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: 'center'
    },
    modalPickerView: {
        backgroundColor: '#F7F7F7',
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: '#E7E7E7',
        paddingVertical: 5,
        height: 40,
    },
    modalPickerText: {
        fontSize: 15,
        color: '#666'
    }
});