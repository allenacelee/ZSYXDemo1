/**
 * =========================================================================
 *
 * @file CheckTaskQueryComponent
 * @description 自主巡店功能点列表公共组件
 * =========================================================================
 *
 * @author linzixiong
 * @date 2017/3/6
 * @version 1.0
 * =========================================================================
 */

import React, {Component} from 'react';
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const width = Dimensions.get('window').width;

export default class CheckTaskQueryComponent extends Component {
    static defaultProps = {
        rowData: {},
        backgroundColor: 'white'
    };

    constructor(props) {
        super(props);
    }

    render() {
        let rowData = this.props.rowData;
        return (
            <View style={[styles.container, {backgroundColor: this.props.backgroundColor}]}>
                <View style={styles.info}>
                    <Text style={[styles.infotext, styles.textStyle]}>
                        任务名称：{rowData.taskName}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[
                            styles.infotext,
                            styles.textStyle
                        ]}>
                            涉及门店：
                        </Text>
                        <Text style={[styles.officeView, styles.textStyle]}>
                            {rowData.officeName}
                        </Text>
                    </View>

                    <View style={styles.chargeInfo}>
                        <Text style={styles.textStyle}>
                            责&nbsp;&nbsp;任&nbsp;&nbsp;人：
                            {rowData.manager}
                        </Text>
                        <Text style={[styles.textStyle, {marginLeft: width < 330 ? 30 : 45,}]}>
                            完成时间：
                            {rowData.endTime}
                        </Text>
                    </View>
                    <View style={[{flexDirection: 'row', marginBottom: 10}, styles.infotext]}>
                        <Text style={styles.textStyle}>
                            状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：
                            {
                                rowData.state == 'A' ?
                                    "未处理" : rowData.state == 'B' ?
                                    "已处理" : "过期未处理"
                            }
                        </Text>
                        <Text style={[styles.textStyle, {marginLeft: width < 330 ? 30 : 45}]}>
                            是否过期：
                            {
                                rowData.isOver ? "已过期" : "未过期"
                            }
                        </Text>

                    </View>
                </View>
                <View style={styles.angle}>
                    <Icon name="angle-right" size={30} style={{color: 'orange'}}/>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderTopColor: '#e5e5e5',
        height: 150,
        flexDirection: 'row',
    },
    info: {
        marginTop: 6,
        justifyContent: 'space-around',
    },
    infotext: {
        marginLeft: width * 0.03,
    },
    angle: {
        position: 'absolute',
        top: 60,
        right: width * 0.05,
    },
    chargeInfo: {
        flexDirection: 'row',
        marginLeft: width * 0.03,
    },
    /*门店名称布局*/
    officeView: {
        width: width * 0.66,
    },
    textStyle: {
        color: '#555',
        fontSize: 13,
    }
});