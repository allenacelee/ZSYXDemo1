/**
 * =========================================================================
 *
 * @file 网格智慧沃家沃家厅发展月报
 * @description Report_zhwjWjtzydDevReportM
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

export default class Report_zhwjWjtzydDevReportM extends Component {

    static defaultProps = {
        menuId: '',
        menuName: '',
        menuInfoName: '',
        menuCode: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            acctDate: '201504',
            areaId: '0010',
            dataSource: [],
        };
        this.reportController = new ReportController(this);
    }

    componentWillMount() {
        //强制横屏
        Orientation.lockToLandscape()
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
                        type='month'
                        minDate='201405'
                        maxDate='201712'
                        selectedValue={this.state.acctDate}
                        callbackPickerValue={(callbackPickerValue)=>this.setState({
                            acctDate: callbackPickerValue,
                        })}
                    />
                </View>
                {/*表格数据*/}
                <GridTable
                    titleArray={["集渠编码", "门店名称", "分公司", "分局", "网格", "智慧沃家套餐发展", "智慧沃家宽带:宽带新入网-组合版,宽带新入网-共享版,在网转入-组合版,在网转入-共享版", "智慧沃家4G移动号码:新号码,老号码"]}
                    titleWidthArray={[100, 100, 100, 130, 130, 130, [150, 150, 135, 135], [150, 150]]}
                    titleHeight={60}
                    dataSource={this.state.dataSource}
                    dataNameArray={["jqbm", "mdName", "eparchyName", "cityName", "dgridName", "zhwjDev", "zhwjKdNewZh", "zhwjKdNewGx", "zhwjKdOldZh", "zhwjKdOldGx", "zhwj4gNew", "zhwj4gOld"]}
                    stickyColumnNumber={1}
                    isMultipleHeader={true}
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
