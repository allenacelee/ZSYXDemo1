/**
 * =========================================================================
 *
 * @file ModalAreaPickerDemo
 * @description 营销单元格选择器Demo
 * =========================================================================
 *
 * @author linzixiong
 * @date 2017/1/10
 * @version 1.0
 * =========================================================================
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import NavigationBar from '../../NavigationBar/NavigationBar'
import ModalAreaPicker from '../ModalAreaPicker'

export default class ModalAreaPickerDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            areaId: '0010',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title="营销单元选择器Demo"
                    {...this.props}
                />
                <ModalAreaPicker
                    pickerTitle='营销单元'
                    callbackPickerValue={(callbackPickerValue)=>this.setState({
                        areaId: callbackPickerValue,
                    })}
                    viewStyle={{backgroundColor: 'orange', alignItems: 'center'}}
                    textStyle={{fontSize: 20}}
                />
                <Text></Text>
                <Text>areaId:{this.state.areaId}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
});
