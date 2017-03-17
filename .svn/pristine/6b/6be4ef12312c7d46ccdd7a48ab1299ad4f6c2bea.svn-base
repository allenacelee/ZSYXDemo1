import React, {Component} from 'react';
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const width = Dimensions.get('window').width;

export default class TaskCheckComponent extends Component {
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
                    <Text style={[
                        styles.infotext,
                        {fontSize: 13, color: '#555'}
                    ]}>
                        任务名称：
                        {rowData.taskName}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[
                            styles.infotext,
                            {fontSize: 13, color: '#555',}
                        ]}>
                            涉及门店：
                        </Text>
                        <Text style={{fontSize: 13, width: width * 0.66, color: '#555'}}>
                            {rowData.officeName}
                        </Text>
                    </View>
                    <View style={styles.timeinfo}>
                        <Text style={{fontSize: 13, marginLeft: 10, color: '#555'}}>
                            责&nbsp;&nbsp;&nbsp;任&nbsp;&nbsp;人：{rowData.manager}
                        </Text>
                        <Text style={{fontSize: 13, color: '#555', marginLeft: width < 330 ? 10 : 20}}>
                            要求完成时间：{rowData.endTime}
                        </Text>
                    </View>
                    <View style={[{flexDirection: 'row', marginBottom: 10}, styles.infotext]}>
                        <Text style={{fontSize: 13, color: '#555'}}>
                            状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：
                            {
                                rowData.state == 'A' ?
                                    "未处理" : rowData.state == 'B' ?
                                    "已处理" : "过期未处理"
                            }
                        </Text>
                        <Text style={{fontSize: 13, marginLeft: width < 330 ? 10 : 20, color: '#555'}}>
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
        //fontSize:13,
    },
    timeinfo: {
        flexDirection: 'row',
    },
    angle: {
        position: 'absolute',
        top: 60,
        right: width * 0.03,
    }
});