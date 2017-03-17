/**
 * =========================================================================
 *
 * @file【公共组件】级联型选择器
 * @description 滚动型选择器
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
 * @date 2016/12/8
 * @version 1.0
 * =========================================================================
 */

import React, {Component} from 'react';
import {
    TouchableWithoutFeedback,
    View,
    Button,
    Text,
    Dimensions,
    Platform,
    Modal
} from 'react-native';
import Picker from 'react-native-picker';

import RootModal from 'react-native-root-modal'

export default class ModalPicker extends Component {

    static defaultProps = {
        pickerTitle: '请选择',//标题
        selectedValue: '',//选择值
        callbackPickerValue: null,//回传选择值
        labelArray: [], //显示值label数组
        valueArray: [], //显示值对应value数组
        textStyle: {},//文字样式
        viewStyle: {},//View样式
        initTitle: '',//初始显示值
    };

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.labelArray[this.props.valueArray.indexOf(this.props.selectedValue)],
            modalVisible: false,
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            selectedValue: [this.props.selectedValue],
            initTitle: this.props.initTitle,
        };
    }

    render() {
        return (
            <View style={this.props.viewStyle}>
                {__IOS__ ?
                    <RootModal visible={this.state.modalVisible}>
                        <TouchableWithoutFeedback onPress={()=>this.hidePicker()}>
                            <View style={{
                                width: this.state.height,
                                height: this.state.height,
                                backgroundColor: 'rgba(0,0,0,0.5)'
                            }}>
                            </View>
                        </TouchableWithoutFeedback>
                    </RootModal>
                    :
                    <Modal
                        animationType={"fade"}
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={()=>this.hidePicker()}
                    >
                        <TouchableWithoutFeedback onPress={()=>this.hidePicker()}>
                            <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                }
                <Text onPress={()=>this.showPicker()}
                      style={[{color: '#080808'}, this.props.textStyle]}>
                    {this.state.initTitle == '' ? this.state.title : this.state.initTitle}
                </Text>
            </View>
        );
    }

    showPicker() {
        //显示遮罩层

        this.setState({modalVisible: true});
        //初始化Picker
        Picker.init({
            pickerConfirmBtnText: '确认',
            pickerCancelBtnText: '取消',
            pickerTitleText: this.props.pickerTitle,
            pickerData: this.props.labelArray,
            selectedValue: this.state.selectedValue,
            onPickerConfirm: (selectedValue, selectedIndex)=> {
                this.onPickerConfirm(selectedValue, selectedIndex)
            },
            onPickerCancel: ()=> {
                this.setState({modalVisible: false})
            },
            wheelFlex: this.props.wheelFlex
        });
        //弹出Picker
        setTimeout(()=> {
            Picker.show();
        }, 10);
    }
    onPickerConfirm(selectedValue, selectedIndex) {
        console.log(selectedIndex);
        if(__IOS__){//ios单列无法获取index
            if(selectedValue[0]=="0"){
                selectedValue[0] = this.props.labelArray[0];
            }
            this.setState({
                modalVisible: false,
                selectedValue: selectedValue,
                title: selectedValue[0],
                initTitle: '',
            });
            let index = this.props.labelArray.indexOf(selectedValue[0]);
            this.props.callbackPickerValue(this.props.valueArray[index]);
        }else {
            this.setState({
                modalVisible: false,
                selectedValue: selectedValue,
                title: selectedValue[0],
                initTitle: '',
            });
            this.props.callbackPickerValue(this.props.valueArray[selectedIndex[0]]);
        }
    }

    hidePicker() {
        Picker.hide();
        this.setState({
            modalVisible: false
        })
    }
}