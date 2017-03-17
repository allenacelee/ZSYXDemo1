/**
 * =========================================================================
 *
 * @file 报表Demo页面
 * @description
 * =========================================================================
 *
 * @author linzixiong
 * @date 2017/1/12
 * @version 1.0
 * =========================================================================
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Button,
    Dimensions
} from 'react-native';
import Orientation from 'react-native-orientation'

import NavigationBar from '../../../Pub/NavigationBar/NavigationBar'
import ModalPicker from '../../../Pub/ModalPicker/ModalPicker'
import ModalDatePicker from '../../../Pub/ModalDatePicker/ModalDatePicker'
import ModalAreaPicker from '../../../Pub/ModalAreaPicker/ModalAreaPicker'
import GridTable from '../../../Pub/GridTable/GridTable'

import ReportController from '../../ReportController'

import Report_Demo_Offline_Data from './Report_Demo_Offline_Data.json'

import Picker from 'react-native-picker';


export default class Report_Demo extends Component {
    static defaultProps = {
        menuId: '',
        menuName: '',
        menuInfoName: '',
        menuCode: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            businessTypes: 'BT01',
            statisticalType: 'ST01',
        };
        this.reportController = new ReportController(this);
    }




    componentWillMount() {
        //强制横屏
        Orientation.lockToLandscape()
    }
    //组件更新结束之后执行，在初始化render时不执行
    componentWillUnmount(){
        Picker.hide();
        //强制竖屏
        Orientation.lockToPortrait();
    }






    render() {
        return (
            <View style={styles.container}>
                {/*导航条*/}
                <NavigationBar
                    title="报表Demo页面"
                    rightButtonIcon="magnifying-glass"
                    onPressRightIcon={()=>this.search()}
                    width={Dimensions.get('window').height}
                    {...this.props}
                />
                {/*中部选择控件*/}
                <View style={styles.searchFormView}>
                    {/* 营销单元选择器 */}
                    <ModalAreaPicker
                        pickerTitle='营销单元'
                        callbackPickerValue={(callbackPickerValue)=>this.setState({
                            areaId: callbackPickerValue,
                        })}
                        viewStyle={{alignItems: 'center', borderColor: 'rgba(203,203,206,1.0)'}}
                        textStyle={{fontSize: 15}}
                    />
                    {/* 时间选择器 */}
                    <ModalDatePicker
                        type='month'
                        minDate='201405'
                        maxDate='201712'
                        selectedValue={this.state.acctDate}
                        callbackPickerValue={(callbackPickerValue)=>this.setState({
                            acctDate: callbackPickerValue,
                        })}
                    />
                    {/* 业务类型 */}
                    <ModalPicker
                        pickerTitle='业务类型'
                        selectedValue={this.state.id}
                        callbackPickerValue={(data)=>this.setState({
                            businessTypes: data,
                        })}
                        labelArray={["请选择", "业务类型1", "业务类型2", "业务类型3"]}
                        valueArray={["", "BT01", "BT02", "BT03"]}
                        viewStyle={{alignItems: 'center', borderColor: 'rgba(203,203,206,1.0)'}}
                        textStyle={{fontSize: 15}}
                    />
                    {/* 统计类型 */}
                    <ModalPicker
                        pickerTitle='统计类型'
                        selectedValue={this.state.id}
                        callbackPickerValue={(data)=>this.setState({
                            statisticalType: data,
                        })}
                        labelArray={["请选择", "统计类型1", "统计类型2", "统计类型3"]}
                        valueArray={["", "ST01", "ST02", "ST03"]}
                        viewStyle={{alignItems: 'center', borderColor: 'rgba(203,203,206,1.0)'}}
                        textStyle={{fontSize: 15}}
                    />
                </View>
                {/*表格数据*/}
                <GridTable
                    titleArray={['分公司', '分局', '网格', '1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '日预算', '日完成量']}
                    titleWidthArray={[80, 130, 130, 50, 50, 50, 50, 50, 50, 50, 50, 50, 100, 100]}
                    titleHeight={40}
                    dataSource={this.state.dataSource}
                    dataNameArray={['qujuName', 'fenjuName', 'wanggeName', 'monthMb', 'monthMb', 'busiType', 'monthMb', 'monthMb', 'monthMb', 'busiType', 'busiType', 'busiType', 'dayMb', 'monthMb']}
                    stickyColumnNumber={1}
                />
            </View>
        );
    }

    search() {
        this.setState({
            dataSource: Report_Demo_Offline_Data.rows,
        })
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    searchFormView: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 30,
        alignItems: 'center'
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
});
