/**
 * =========================================================================
 *
 * @file 指标页面下级的Demo
 * @description
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
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    ListView
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import Indicator from '../../Pub/Indicator/Indicator'
import NavigationBar from '../../Pub/NavigationBar/NavigationBar'
import ModalDatePicker from '../../Pub/ModalDatePicker/ModalDatePicker'
import Chart from '../Chart'
import QuotaController from '../QuotaController'
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
import QuotaDemo3 from './QuotaDemo3';
const tabHeadData =[
    "营销单元","今日值","昨日值","累计值"
];
export default class QuotaDemo2 extends Component {
    static defaultProps = {
        selected:'',
        areaId:null,
        acctDate: '',
        dataArray: [],//列表数据
        tabHeadData: tabHeadData,
        cellTextColor: 'gray',
        tabHeadTextColor: 'white',
        quotaData: {
            createDate: "",
            menuCatalogId: "",
            menuCode: "",
            menuDesc: "",
            menuId: "",
            menuName: "",
            menuUrl: "",
            menuValue: "",
            stsDate: ""
        }
    };

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (row1, row2)=>row1 !== row2})
        this.state = {
            //areaId:[],
            dataSource: ds.cloneWithRows(this.props.dataArray),
            acctDate: this.props.acctDate,
            selectedItem: this.props.selected,
            chartData: {},
            modalVisible: false,
        };
        this.quotaController = new QuotaController(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <Indicator
                    visible={this.state.modalVisible}
                    text="加载中"
                />
                {/*导航条*/}
                <NavigationBar
                    title="指标Demo"
                    rightButtonIcon="home"
                    onPressRightIcon={()=>this.props.navigator.popToTop()}
                    {...this.props}
                />
                {/*日期选择*/}
                <View style={styles.topViewStyle}>
                    <TouchableOpacity onPress={()=>{this.setState({
                        acctDate: ModalDatePicker.calcDate(this.state.acctDate, -1),
                    });
                    //this.forceUpdate();

                    }}>
                        <Icon name='chevron-left' size={30} color="#999999"/>
                    </TouchableOpacity>

                    <ModalDatePicker
                        type='day'
                        minDate='20150101'
                        maxDate='20151230'
                        selectedValue={this.state.acctDate}
                        callbackPickerValue={(callbackPickerValue)=>this.setState({
                            acctDate: callbackPickerValue
                        })}
                        textStyle={{color: 'orange', fontSize: 20}}
                    />
                    <TouchableOpacity onPress={()=>this.setState({
                        acctDate: ModalDatePicker.calcDate(this.state.acctDate, 1),

                    })}>
                        <Icon name='chevron-right' size={30} color="#999999"/>
                    </TouchableOpacity>
                </View>
                {/* 柱状图 OR 列表图 标题*/}
                <View style={styles.titleViewStyle}>
                    {/* 柱状图 */}
                    <TouchableOpacity style={styles.barQuotaStyle} onPress={()=>this.clickOnDayQuotaItem()}>
                        <View
                            style={[styles.barQuotaStyle, {backgroundColor: this.state.selectedItem == 'bar' ? 'orange' : 'white'}]}>
                            <Text style={{color: this.state.selectedItem == 'bar' ? 'white' : 'orange'}}>柱状图</Text>
                        </View>
                    </TouchableOpacity>
                    {/* 列表图 */}
                    <TouchableOpacity style={styles.formQuotaStyle} onPress={()=>this.clickOnMonthQuotaItem()}>
                        <View
                            style={[styles.formQuotaStyle, {backgroundColor: this.state.selectedItem == 'form' ? 'orange' : 'white'}]}>
                            <Text style={{color: this.state.selectedItem == 'form' ? 'white' : 'orange'}}>列表图</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {this.renderView(this.props.navigator, this.state.chartData)}
            </View>
        );


    }

    renderView(navigator, chartData) {
        if (this.state.selectedItem == 'bar') {
            return (<Chart
                navigator={this.props.navigator}
                chartData={this.state.chartData}
                modalVisible={this.state.modalVisible}
                quotaData={this.props.quotaData}
                acctDate={this.state.acctDate}
            />); //{...this.props}//包含父组件的组件，如navigator
        }
        else {
            return (

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    enableEmptySections={true}
                    renderHeader={()=>this.renderHeader()}
                />
            );
        }
    }

    renderHeader() {
        return (
            <View style={styles.tabHeadStyle}>
                {this.renderTabHead()}
            </View>
        )
    }

    renderTabHead() {

        var ItemArray = [];
        var tempArray = this.props.tabHeadData;
        for (let i = 0; i < tempArray.length; i++) {
            ItemArray.push(
                <View key={i} style={styles.tabHeadViewStyle}>
                    <Text style={{alignItems:'center',justifyContent:'center',color:this.props.tabHeadTextColor}}>
                        {tempArray[i]}
                    </Text>
                </View>
            )
        }
        return ItemArray;
    }

    renderRow(rowData, sectionID, rowID) {
        var tempColor = null;
        if (rowID % 2 != 0) {
            tempColor = 'rgba(248,248,240,1.0)'
        } else {
            tempColor = 'white'
        }
        return (
            <TouchableOpacity onPress={()=>{
             this.props.navigator.push({
            component: QuotaDemo3,
            params: {
                quotaData: this.props.quotaData,
                acctDate: this.state.acctDate,
                areaId:rowData.areaId,
                areaType:this.state.chartData.areaType,
                selected:'form'
            }})
           } }>
                <View style={[styles.cellStyle,{backgroundColor:tempColor}]}>
                    {this.renderCell(rowData)}
                </View>
            </TouchableOpacity>
        )
    }

    renderCell(rowData) {
        var keyArray = [];
        var ItemArray = [];
        // get all Key from map
        for (var k in rowData) {
            keyArray.push(k);
        }
        for (let i = 0; i < tabHeadData.length; i++) {
            ItemArray.push(
                <View key={i} style={[styles.cellViewStyle]}>
                    <Text style={{alignItems:'center',justifyContent:'center',color:this.props.cellTextColor}}>
                        {rowData[keyArray[i]]}
                    </Text>
                </View>
            )
        }
        return ItemArray;
    }

    componentDidMount() {
        //模拟数据获取

        this.quotaController.queryDrillDownIndexDataList();

    }
    shouldComponentUpdate(nextProps,nextState){

        if (nextState.acctDate == this.state.acctDate) {
            return true;
        }
        else {
            this.quotaController.queryDrillDownIndexDataList();
            return true;
        }
    }
    //点击日指标
    clickOnDayQuotaItem() {
        this.setState({

            selectedItem: 'bar'
        })
    }

    //点击月指标
    clickOnMonthQuotaItem() {
        this.setState({
            selectedItem: 'form'
        })
    }


}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    textStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Width / tabHeadData.length
    },
    tabHeadStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 44,
        backgroundColor: 'orange'
    },
    tabHeadViewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Width / tabHeadData.length
    },
    cellStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 44
    },
    cellViewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Width / tabHeadData.length,

        height: 44
    },
    topViewStyle: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F7F7F7'
    },
    titleViewStyle: {
        flexDirection: 'row',
        width: Width,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60
    },
    barQuotaStyle: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        height: 35,
        width: Width * 0.45,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'orange',
        borderWidth: 1.0
    },
    formQuotaStyle: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        height: 35,
        width: Width * 0.45,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'orange',
        borderWidth: 1.0
    },
});
