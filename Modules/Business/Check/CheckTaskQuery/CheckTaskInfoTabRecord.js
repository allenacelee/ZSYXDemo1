/**
 * =========================================================================
 *
 * @file CheckTaskInfoTabRecord
 * @description 巡店任务查询功能点巡店执行页面Tab页面巡店记录
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
    Text,
    Dimensions,
    ScrollView,
    TextInput
} from 'react-native';

import CheckController from '../CheckController';

//测试数据
import evaluationData from '../TaskCheck/test_task_check_record.json'

const {height, width} = Dimensions.get('window');

export default class CheckTaskInfoTabRecord extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            dataSource: [],
            id: '0000',
        };
        this.checkController = new CheckController(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{flex: 1}}>
                    <View style={{width: width - 10, marginLeft: 5, marginRight: 5,}}>
                        {this.renderItem()}
                    </View>
                    <View
                        style={{width: width - 10, marginTop: 20, marginLeft: 5, marginRight: 5, marginBottom: 20,}}>
                        <Text style={{fontSize: 20}}>巡店记录：</Text>
                        <Text
                            style={styles.textInputStyle}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{evaluationData.detail}</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }

    renderItem() {
        let itemArray = [];
        for (o in evaluationData.categoryA) {
            itemArray.push(
                <View key={o}
                      style={ [styles.scrollCellStyle, {backgroundColor: o % 2 == 0 ? 'rgba(248,248,240,1.0)' : 'white'}]}>
                    <View style={styles.scrollViewItemStyle}>
                        <Text style={{fontSize: 15}}>
                            {evaluationData.categoryA[o].name}——{evaluationData.categoryA[o].item}：
                        </Text>
                    </View>
                    <View style={styles.scrollViewSituationStyle}><Text
                        style={{fontSize: 15}}>{evaluationData.categoryA[o].situation}</Text></View>
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
    scrollViewItemStyle: {
        width: width * 0.7,
        margin: 5,
        justifyContent: 'center',
    },
    scrollViewSituationStyle: {
        width: width * 0.25,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollCellStyle: {
        height: 50,
        width: width - 10,
        flexDirection: 'row',
    },
    textInputStyle: {
        width: width - 10,
        textAlign: 'left',
        fontSize: 15,
    },
});