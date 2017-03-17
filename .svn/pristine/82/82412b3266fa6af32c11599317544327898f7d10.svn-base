/**
 * =========================================================================
 *
 * @file ModalDatePickerDemo
 * @description 日期选择器demo
 * =========================================================================
 *
 * @author linzixiong
 * @date 2016/12/8
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
import ModalDatePicker from '../ModalDatePicker'
import Picker from 'react-native-picker';

export default class ModalDatePickerDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            acctDate_day: '20170101',
            acctDate_month: '201701',
            acctDate_year: '2017',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title="日期选择器Demo"
                    {...this.props}
                />
                <ModalDatePicker
                    pickerTitle='日选择器'
                    type='day'
                    minDate='20160101'
                    maxDate='20170101'
                    selectedValue={this.state.acctDate_day}
                    callbackPickerValue={(callbackPickerValue)=>this.setState({
                        acctDate_day: callbackPickerValue,
                    })}
                    viewStyle={{backgroundColor: 'orange', alignItems: 'center'}}
                    textStyle={{fontSize: 20}}
                />
                <ModalDatePicker
                    type='month'
                    minDate='201501'
                    maxDate='201701'
                    selectedValue={this.state.acctDate_month}
                    callbackPickerValue={(callbackPickerValue)=>this.setState({
                        acctDate_month: callbackPickerValue,
                    })}
                    viewStyle={{backgroundColor: 'red', alignItems: 'center'}}
                    textStyle={{fontSize: 20}}
                />
                <ModalDatePicker
                    pickerTitle='年选择器'
                    type='year'
                    minDate='2013'
                    maxDate='2018'
                    selectedValue={this.state.acctDate_year}
                    callbackPickerValue={(callbackPickerValue)=>this.setState({
                        acctDate_year: callbackPickerValue,
                    })}
                    viewStyle={{backgroundColor: 'green', alignItems: 'center'}}
                    textStyle={{fontSize: 30}}
                />
                <Text onPress={()=>this.show()}>
                    aaaaa
                </Text>
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
