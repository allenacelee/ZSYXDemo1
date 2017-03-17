/**
 * =========================================================================
 *
 * @file【公共组件】下拉选择器
 * @description 点击事件下拉型picker
 * =========================================================================
 *
 * @requires react-native-picker
 *
 * @param pickerData: [],               //【必填】数据格式参考示例
 * @param selectedValue: [],            //【必填】默认选择值 eg. ['北京','二区','请选择']
 * @param callbackPickerValue: null,    //【必填】回传选择值 eg. callbackPickerValue={(callbackPickerValue)=>this.setState({
 *                                                                                       province: callbackPickerValue[0],
 *                                                                                       eparchy: callbackPickerValue[1],
 *                                                                                       city: callbackPickerValue[2]
 *                                                                                   })}
 * @param pickerTitle: '请选择',         //【可选】弹出Picker的标题
 * @param textStyle: {},                //【可选】文字样式 eg. textStyle={{fontSize: 20}}
 * @param viewStyle: {},                //【可选】View样式 eg. viewStyle={{backgroundColor: 'green', alignItems: 'center'}}
 * =========================================================================
 *
 * @example ./Demo.js  TODO
 * @todo 优化数据创建方法，增添value、label型数据结构
 *
 * @author linzixiong
 * @date 2017/3/7
 * @version 1.0
 * =========================================================================
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    Button,
    Text,
    Dimensions,
    Modal,
    TouchableHighlight,
    StatusBar,
} from 'react-native';


export default class ModalDropPicker extends Component {

    static defaultProps = {
        selectedValue: '',//选择值
        callbackPickerValue: null,//回传选择值
        labelArray: [], //显示值label数组
        valueArray: [], //显示值对应value数组
        textStyle: {},//文字样式
        viewStyle: {},//View样式
        modalVisible: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedValue: this.props.selectedValue,
            selectedLabel: this.props.labelArray[this.props.valueArray.indexOf(this.props.selectedValue)],
        };
    }

    render() {
        return (
            <Modal
                animationType={"none"}
                transparent={true}
                visible={this.props.modalVisible}
                onRequestClose={()=>this.hidePicker()}
            >
                <TouchableWithoutFeedback onPress={()=>this.hidePicker()}>
                    <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                        {__IOS__ ?
                            <View style={{height: 24, backgroundColor: "white"}}></View>
                            :
                            <View></View>
                        }
                        <View style={{}}>
                            {this.renderPickerItem()}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal >
        );
    }

    renderPickerItem() {
        let result = [];
        let labelArray = this.props.labelArray;
        let valueArray = this.props.valueArray;
        for (let i = 0; i < labelArray.length; i++) {
            if (i == valueArray.indexOf(this.props.selectedValue)) {//选中样式
                result.push(
                    <TouchableHighlight onPress={()=>this.props.callbackPickerValue(valueArray[i])} key={i}>
                        <View style={styles.itemView}>
                            <Text style={[styles.itemText, {color: 'orange'}]}>{labelArray[i]}</Text>
                        </View>
                    </TouchableHighlight>
                )
            } else {
                result.push(
                    <TouchableHighlight onPress={()=>this.props.callbackPickerValue(valueArray[i])} key={i}>
                        <View style={styles.itemView}>
                            <Text style={styles.itemText}>{labelArray[i]}</Text>
                        </View>
                    </TouchableHighlight>
                )
            }
        }
        return result;
    }

    hidePicker() {
        this.props.callbackPickerValue(this.props.selectedValue);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    itemView: {
        width: Dimensions.get("window").width,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: '#999'
    },
    itemText: {
        fontSize: 17,
    }
});