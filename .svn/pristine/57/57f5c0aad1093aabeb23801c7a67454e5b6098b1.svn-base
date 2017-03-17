/**
 * =========================================================================
 *
 * @file【公共组件】时间选择器
 * @description 可设置最大时间、最小时间以及日、月、年型
 * =========================================================================
 *
 * @requires react-native-picker
 *
 * @param callbackPickerValue: null,            //【必填】回传值 eg. callbackPickerValue={(date)=>this.setState({
 *                                                                                       acctDate: date})}
 * @param selectedValue: getCurrentDateValue(), //【可选】Picker的初始选择值（前台的显示值） eg. '20170101'
 * @param pickerTitle: '请选择',                //【可选】弹出Picker的标题
 * @param type: 'day',                          //【可选】选择器类型：日:'day'、月:'month'、年:'year' (默认为日选择器)
 * @param minDate: '20150101',                  //【可选】日期最小值 【格式】日：'yyyymmdd' 月：'yyyymm' 年：'yyyy'
 * @param maxDate: '20201212',                  //【可选】日期最大值 【格式】日：'yyyymmdd' 月：'yyyymm' 年：'yyyy'
 * @param wheelFlex: [1,1,1],                   //【可选】选项比例数组 默认平均分配(1:1:1)
 * @param textStyle: {},                    //【可选】文字样式 eg. textStyle={{fontSize: 20}}
 * @param viewStyle: {},                    //【可选】View样式 eg. viewStyle={{backgroundColor: 'green'}}
 *
 * @param calcDate(oldDate, count)          //【function】时间计算方法，可进行日期的加减
 * =========================================================================
 *
 * @example ./Demo.js  TODO
 * @todo 优化数据创建方法
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
    Modal,
} from 'react-native';
import Picker from 'react-native-picker';
import RootModal from 'react-native-root-modal'

function getCurrentDateValue() {
    let date = new Date();
    let dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString();
    let mm = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1).toString();
    let yyyy = date.getFullYear().toString();
    console.log('getCurrentDateValue' + yyyy + mm + dd);
    return (yyyy + mm + dd)
}

export default class ModalDatePicker extends Component {

    static defaultProps = {
        pickerTitle: '请选择',                   //弹出Picker的标题
        type: 'day',                            //日('day')选择类型or月('month')选择类型or年(year)选择类型
        minDate: '20150101',                    //日期最小值
        maxDate: '20201212',                    //日期最大值
        wheelFlex: [1, 1, 1],                   //选项比例
        selectedValue: getCurrentDateValue(),   //选择值,默认为当前日期
        callbackPickerValue: null,              //回传选择值
        textStyle: {},                          //文字样式
        viewStyle: {},                          //View样式
        initTitle: '',                          //初始显示值
    };

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            selectedValue: this.props.selectedValue,
            initTitle: this.props.initTitle,
        };

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            selectedValue: nextProps.selectedValue,
        })
    }

    render() {
        return (
            <View style={[{alignItems: 'center'}, this.props.viewStyle]}>
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
                    {this.state.initTitle == '' ? this.renderTitle() : this.state.initTitle}
                </Text>
            </View>
        );
    }

    showPicker() {
        //显示遮罩层
        this.setState({modalVisible: true});

        let selectedValue = [];
        selectedValue[0] = this.state.selectedValue.slice(0, 4) + '年';
        selectedValue[1] = this.state.selectedValue.slice(4, 6) + '月';
        selectedValue[2] = this.state.selectedValue.slice(6, 8) + '日';

        //弹出Picker
        Picker.init({
            pickerConfirmBtnText: '确认',
            pickerCancelBtnText: '取消',
            pickerTitleText: this.props.pickerTitle,
            pickerData: this.createDateData(),
            selectedValue: selectedValue,
            onPickerConfirm: (selectedValue, selectedIndex)=> {
                console.log(selectedValue, selectedIndex);
                this.onPickerConfirm(selectedValue);
            },
            onPickerCancel: ()=> {
                this.setState({modalVisible: false})
            },
            wheelFlex: this.props.wheelFlex
        });
        setTimeout(()=> {
            Picker.show()
        }, 1);

    }

    onPickerConfirm(pickedValue) {
        let returnString = '';
        //去掉“年、月、日”
        switch (this.props.type) {
            case 'day':
                returnString = pickedValue[2].slice(0, 2) + returnString;
            case 'month':
                returnString = pickedValue[1].slice(0, 2) + returnString;
            case 'year':
                returnString = pickedValue[0].slice(0, 4) + returnString;
        }
        this.setState({
            modalVisible: false,
            selectedValue: returnString,
            initTitle: '',
        });
        this.props.callbackPickerValue(returnString);
    }

    hidePicker() {
        Picker.hide();
        this.setState({
            modalVisible: false,
        })
    }

    renderTitle() {
        let title = '';
        switch (this.props.type) {
            case 'day':
                title = this.state.selectedValue.slice(6, 8) + '日' + title;
            case 'month':
                title = this.state.selectedValue.slice(4, 6) + '月' + title;
            case 'year':
                title = this.state.selectedValue.slice(0, 4) + '年' + title;
        }
        return title;
    }

    //选择器数据创建
    createDateData() {
        let minDate = null;
        let maxDate = null;
        let min_year = 0;
        let min_month = 0;
        let min_day = 0;
        let max_year = 0;
        let max_month = 0;
        let max_day = 0;
        let date = [];
        switch (this.props.type) {
            case 'day':
                minDate = new Date(this.props.minDate.slice(0, 4), this.props.minDate.slice(4, 6) - 1, this.props.minDate.slice(6, 8));
                maxDate = new Date(this.props.maxDate.slice(0, 4), this.props.maxDate.slice(4, 6) - 1, this.props.maxDate.slice(6, 8));
                min_year = minDate.getFullYear();
                min_month = minDate.getMonth() + 1;
                min_day = minDate.getDate();
                max_year = maxDate.getFullYear();
                max_month = maxDate.getMonth() + 1;
                max_day = maxDate.getDate();
                for (let i = min_year; i <= max_year; i++) {
                    let month = [];
                    for (let j = 1; j < 13; j++) {
                        if ((i == min_year && j < min_month) || (i == max_year && j > max_month)) {
                        } else {
                            let day = [];
                            if (j == 2) {
                                for (let k = 1; k < 29; k++) {
                                    if ((j == min_month && k < min_day) || (j == max_month && k > max_day)) {
                                    } else {
                                        //日期小于10，前面拼接0
                                        day.push(k < 10 ? '0' + k + '日' : k + '日');
                                    }
                                }
                                //Leap day for years that are divisible by 4, such as 2000, 2004
                                if (i % 4 == 0) {
                                    if ((j == min_month && k < min_day) || (j == max_month && k > max_day)) {
                                    } else {
                                        day.push(29 + '日');
                                    }
                                }
                            }
                            else if (j in {1: 1, 3: 1, 5: 1, 7: 1, 8: 1, 10: 1, 12: 1}) {
                                for (let k = 1; k < 32; k++) {
                                    if ((j == min_month && k < min_day) || (j == max_month && k > max_day)) {
                                    } else {
                                        //日期小于10，前面拼接0
                                        day.push(k < 10 ? '0' + k + '日' : k + '日');
                                    }
                                }
                            }
                            else {
                                for (let k = 1; k < 31; k++) {
                                    if ((j == min_month && k < min_day) || (j == max_month && k > max_day)) {
                                    } else {
                                        //日期小于10，前面拼接0
                                        day.push(k < 10 ? '0' + k + '日' : k + '日');
                                    }
                                }
                            }
                            let _month = {};
                            //月份小于10，前面拼接0
                            _month[j < 10 ? '0' + j + '月' : j + '月'] = day;
                            month.push(_month);
                        }
                    }
                    let _date = {};
                    _date[i + '年'] = month;
                    date.push(_date);
                }
                break;

            case 'month':
                minDate = new Date(this.props.minDate.slice(0, 4), this.props.minDate.slice(4, 6) - 1);
                maxDate = new Date(this.props.maxDate.slice(0, 4), this.props.maxDate.slice(4, 6) - 1);
                min_year = minDate.getFullYear();
                min_month = minDate.getMonth() + 1;
                max_year = maxDate.getFullYear();
                max_month = maxDate.getMonth() + 1;
                for (let i = min_year; i <= max_year; i++) {
                    let month = [];
                    for (let j = 1; j < 13; j++) {
                        if ((i == min_year && j < min_month) || (i == max_year && j > max_month)) {
                        } else {
                            month.push(j < 10 ? '0' + j + '月' : j + '月');
                        }
                    }
                    let _date = {};
                    _date[i + '年'] = month;
                    date.push(_date);
                }
                break;

            case 'year':
                minDate = new Date(this.props.minDate.slice(0, 4));
                maxDate = new Date(this.props.maxDate.slice(0, 4));
                min_year = minDate.getFullYear();
                max_year = maxDate.getFullYear();
                for (let i = min_year; i <= max_year; i++) {
                    date.push(i + '年');
                }
                break;
        }
        return date;
    };

    /**
     * 时间计算方法
     * @param oldDate 【String】需要计算的日期字符串    (eg.'20160101'/'201601'/'2016')
     * @param count 【Number】计算数值    (eg. 1 / -1 / 5)
     * @returns {string}
     */
    static calcDate(oldDate, count) {
        let yyyy = '';
        let mm = '';
        let dd = '';
        let newDate = null;
        let returnDate = '';
        // 判断年月日类型
        let length = oldDate.length;
        switch (length) {
            // 年类型
            case 4:
                yyyy = oldDate.slice(0, 4);
                returnDate = (Number(yyyy) + count).toString();
                break;
            // 月类型
            case 6:
                // 转为日期类型
                yyyy = oldDate.slice(0, 4);
                mm = oldDate.slice(4, 6);
                newDate = new Date(`${yyyy}-${mm}-01`);
                // 计算
                newDate.setMonth(newDate.getMonth() + count);
                // 小于 10 加 0
                mm = (newDate.getMonth() + 1) < 10 ? '0' + (newDate.getMonth() + 1) : (newDate.getMonth() + 1).toString();
                yyyy = newDate.getFullYear().toString();
                returnDate = yyyy + mm;
                break;
            //日类型
            case 8:
                // 转为日期类型
                yyyy = oldDate.slice(0, 4);
                mm = oldDate.slice(4, 6);
                dd = oldDate.slice(6, 8);
                newDate = new Date(`${yyyy}-${mm}-${dd}`);
                // 计算
                newDate.setDate(newDate.getDate() + count);
                // 小于 10 加 0
                dd = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate().toString();
                mm = (newDate.getMonth() + 1) < 10 ? '0' + (newDate.getMonth() + 1) : (newDate.getMonth() + 1).toString();
                yyyy = newDate.getFullYear().toString();
                returnDate = yyyy + mm + dd;
                break;
        }
        return returnDate;
    }

    /**
     * 获取当前时间
     * @returns {string}
     */
    static getCurrentDate(type) {
        let date = new Date();
        let dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString();
        let mm = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1).toString();
        let yyyy = date.getFullYear().toString();
        console.log('getCurrentDateValue' + yyyy + mm + dd);
        switch (type) {
            case "day":
                return (yyyy + mm + dd);
            case "month":
                return (yyyy + mm);
            case "year":
                return (yyyy);
        }
    }
}