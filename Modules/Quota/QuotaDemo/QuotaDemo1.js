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
    Button,
    TouchableOpacity,

} from 'react-native';
import QuotaController from '../QuotaController'
import Icon from 'react-native-vector-icons/Entypo'
import Indicator from '../../Pub/Indicator/Indicator'
import NavigationBar from '../../Pub/NavigationBar/NavigationBar'
import ModalDatePicker from '../../Pub/ModalDatePicker/ModalDatePicker'
import Chart from '../Chart'

export default class QuotaDemo1 extends Component {
    static defaultProps = {
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
        this.state = {
            chartData:[],
            acctDate: this.props.quotaData.menuDesc == "D" ? "20151230" : "201512",
            modalVisible:false,
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
                    title={this.props.quotaData.menuName}
                    rightButtonIcon="home"
                    onPressRightIcon={()=>this.props.navigator.popToTop()}
                    {...this.props}
                />
                {/*日期选择*/}
                <View style={styles.topViewStyle}>
                    <TouchableOpacity onPress={()=>this.setState({
                        acctDate: ModalDatePicker.calcDate(this.state.acctDate, -1)
                    })}>
                        <Icon name='chevron-left' size={30} color="#999999"/>
                    </TouchableOpacity>
                    <ModalDatePicker
                        type={this.props.quotaData.menuDesc == "D" ? "day" : "month"}
                        minDate='20150101'
                        maxDate='20151230'
                        selectedValue={this.state.acctDate}
                        callbackPickerValue={(callbackPickerValue)=>this.setState({
                            acctDate: callbackPickerValue
                        })}
                        textStyle={{color: 'orange', fontSize: 20}}
                    />
                    <TouchableOpacity onPress={()=>this.setState({
                        acctDate: ModalDatePicker.calcDate(this.state.acctDate, 1)
                    })}>
                        <Icon name='chevron-right' size={30} color="#999999"/>
                    </TouchableOpacity>
                </View>
                <Chart
                    navigator={this.props.navigator} 
                    chartData={this.state.chartData}
                    modalVisible={this.state.modalVisible}
                    quotaData={this.props.quotaData}
                    acctDate={this.state.acctDate}
                />
            </View>
        );
    }
    componentDidMount() {
        this.quotaController.queryIndexDataList();
    }

    shouldComponentUpdate(nextProps,nextState){
        if (nextState.acctDate == this.state.acctDate) {
            return true;
        }
        else {
            this.quotaController.queryIndexDataList();
            return true;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    topViewStyle: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F7F7F7'
    }
});
