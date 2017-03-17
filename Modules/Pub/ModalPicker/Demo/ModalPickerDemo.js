/**
 * =========================================================================
 *
 * @file ModalPickerDemo
 * @description 普通选择器Demo
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
import ModalPicker from '../ModalPicker'

export default class ModalPickerDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '0010',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title="普通选择器Demo"
                    {...this.props}
                />
                <ModalPicker
                    pickerTitle='普通选择'
                    selectedValue={this.state.id}
                    callbackPickerValue={(data)=>this.setState({
                        id: data,
                    })}
                    labelArray={["选择项A", "选择项B", "选择项C", "选择项D", "选择项E", "选择项F", "选择项G",]}
                    valueArray={["0010", "0020", "0030", "0040", "0050", "0060", "0070"]}
                    viewStyle={{backgroundColor: 'orange', alignItems: 'center'}}
                    textStyle={{fontSize: 20}}
                />
                <Text>valueId:{this.state.id}</Text>
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
