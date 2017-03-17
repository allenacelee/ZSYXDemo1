/**
 * Created by xxx on 2017/3/3.
 * 工作查询详细信息
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ScrollView
} from 'react-native';
import NavigationBar from '../../../Pub/NavigationBar/NavigationBar'
export default class WorkQueryInfo extends Component {
    static defaultProps = {
        data: {
            'WorkName': '检查实名信息保护公章',
            'Worktype': '巡店任务',
            'CreatTime': '2017-03-01',
            'WorkRecipient': '安明磊',
            'WorkState': '已完成',
            'CompletionTime': '2017-03-01 11:44:39'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title="工作查询详细信息"
                    {...this.props}
                />
                {/* 工作名称 */}
                <ScrollView>
                    <View style={styles.cellStyle}>
                        <Text style={styles.textStyle}>{'工作名称: ' + this.props.data.WorkName}</Text>
                    </View>
                    <View style={styles.cellStyle}>
                        <Text style={styles.textStyle}>{'工作类型: ' + this.props.data.Worktype}</Text>
                    </View>
                    <View style={styles.cellStyle}>
                        <Text style={styles.textStyle}>{'工作接收人: ' + this.props.data.WorkRecipient}</Text>
                    </View>
                    <View style={styles.cellStyle}>
                        <Text style={styles.textStyle}>{'工作状态: ' + this.props.data.WorkState}</Text>
                    </View>
                    <View style={styles.cellStyle}>
                        <Text style={styles.textStyle}>{'创建时间: ' + this.props.data.CreatTime}</Text>
                    </View>
                    <View style={styles.cellStyle}>
                        <Text style={styles.textStyle}>{'完成时间: ' + this.props.data.CompletionTime}</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    cellStyle: {
        flexDirection: 'row',
        height: 44,
        borderBottomColor: '#e8e8e8',
        borderBottomWidth: 1.0,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: Dimensions.get('window').width - 20,
        marginLeft: 10
    },
    textStyle: {
        color: 'gray'
    }
});

