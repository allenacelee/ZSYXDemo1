/**
 * =========================================================================
 *
 * @file 网格业绩合同日报
 * @description Report_gridJifenDay
 * =========================================================================
 *
 * @author linzixiong
 * @date 2017/1/4
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

import NavigationBar from '../../Pub/NavigationBar/NavigationBar'
import ModalDatePicker from '../../Pub/ModalDatePicker/ModalDatePicker'
import ModalAreaPicker from '../../Pub/ModalAreaPicker/ModalAreaPicker'
import GridTable from '../../Pub/GridTable/GridTable'

import ReportController from '../ReportController'


const height = Dimensions.get('window').height;

export default class Report_gridJifenDay extends Component {

    static defaultProps = {
        menuId: '',
        menuName: '',
        menuInfoName: '',
        menuCode: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            acctDate: '20141223',
            areaId: '0010',
            dataSource: [],
        };
        this.reportController = new ReportController(this);
    }

    componentWillMount() {
        //强制横屏
        Orientation.lockToLandscape();
    }

    componentWillUnmount() {
        //强制竖屏
        Orientation.lockToPortrait();
    }

    render() {
        return (
            <View style={styles.container}>
                {/*导航条*/}
                <NavigationBar
                    title={this.props.menuName}
                    rightButtonIcon="magnifying-glass"
                    onPressRightIcon={()=>this.reportController.search(this.props.menuCode)}
                    width={height}
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
                        type='day'
                        minDate='20141201'
                        maxDate='20151201'
                        selectedValue={this.state.acctDate}
                        callbackPickerValue={(callbackPickerValue)=>this.setState({
                            acctDate: callbackPickerValue,
                        })}
                    />
                </View>
                {/*表格数据*/}
                <GridTable
                    titleArray={['分公司', '分局', '责任网格名称', '网格公众非计时宽带累计发展', '本月趸交到期用户数', '上月到期用户数', '本月到期本月续约用户数', '上月到期上月续约用户数', '上月到期本月续约用户数', '上月到期未续用户数', '上季度网格趸交续约率最高值', '上半年网格趸交续约率均值', '当月趸交续趸率', '定域定向承包反抢累计发展', '智慧沃家用户累计净增', '智慧沃家累计发展', '宽带合约累计发展']}
                    titleWidthArray={[100, 100, 130, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200]}
                    titleHeight={40}
                    dataSource={this.state.dataSource}
                    dataNameArray={['qujuName', 'fenjuName', 'dutyName', 'fjsDev', 'djCurDaoqi', 'djLastDaoqi', 'djCurCXuyue', 'djLastLXuye', 'djLastCXuyue', 'djLastNXuyue', 'dj1quarXuyueTop', 'dj71CurXuyueRate', 'djCurXuyueRate', 'dydxAccDev', 'zhihuiJingzeng', 'zhihuiAccDev', 'heyueAccDev']}
                    //stickyColumnNumber={1}
                />
            </View>
        );
    }

    search() {
        this.reportController.search(this.props.menuCode);
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
