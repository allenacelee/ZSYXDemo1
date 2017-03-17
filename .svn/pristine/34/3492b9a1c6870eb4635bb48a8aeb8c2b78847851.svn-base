/**
 * =========================================================================
 *
 * @file DetailOperateComponent
 * @description 客户回访列表内部公共组件
 * =========================================================================
 *
 * @author liana
 * @date 2017/3/2
 * @version 1.0
 * =========================================================================
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class DetailOperateComponent extends Component {
    static defaultProps = {};

    constructor(props) {
        super(props);
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.testView}
                    onPress={() => {
                        alert("Phone")
                    }}>
                    <Icon name="phone" size={35} style={styles.icon}/>
                    <Text style={styles.text}>呼叫</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.testView}
                    onPress={() => {
                        alert("Edit")
                    }}>
                    <Icon name="edit" size={35} style={styles.icon}/>
                    <Text style={styles.text}>记录</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.testView}
                    onPress={() => {
                        alert("Plus")
                    }}>
                    <Icon name="plus" size={30} style={styles.icon}/>
                    <Text style={styles.text}>添加到今日</Text>
                </TouchableOpacity>
            </View>
        )
    };
}
const styles = StyleSheet.create({
    container: {
        height: 70,
        flexDirection: 'row',
        backgroundColor: '#e5e5e5',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    testView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 15,
        marginLeft: 5,
    },
    icon: {
        color: 'orange',
    },
});


