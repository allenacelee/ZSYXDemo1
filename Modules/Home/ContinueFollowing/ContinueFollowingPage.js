/**
 * Created by xxx on 2016/12/14.
 * 小区续趸情况
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ListView,
    Dimensions,
    Modal,
    ActivityIndicator
} from 'react-native';

import NavigationBar from '../../Pub/NavigationBar/NavigationBar'
import ModalDatePicker from '../../Pub/ModalDatePicker/ModalDatePicker'
import Icon from 'react-native-vector-icons/Entypo'
import CellComponent from './CellComponent'       //cell组件
import BuildingPage from './BuildingPage'         //楼宇页面
import HomeController from '../HomeController'

const dataArray = require('./../../../LoaclData/ContinueFollowingData.json')
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;



export default class ContinueFollowingPage extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            selectedTimeValue: null,
            acctDate: '201407',
            dataArray:dataArray,
            modalVisible: false,
            animating: false,
            ds:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        };
        this.HomeController = new HomeController(this);
    }




    //请求页面数据
    componentWillMount() {
        //数据请求
        //this.HomeController.getData(this.state.acctDate);
    }
    render() {
        return (
            <View style={styles.container}>

                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={()=>this.mainController.cancelLogin()}
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <ActivityIndicator
                            animating={true}
                            size="large"
                        />
                    </View>
                </Modal>

                <NavigationBar
                    title="小区"
                    titleColor="orange"
                    rightButtonIcon="home"
                    onPressRightIcon={()=>this.props.navigator.popToTop()}
                    {...this.props}
                />
                {/* 时间选择View */}
                <View style={styles.topViewStyle}>
                    <TouchableOpacity onPress={()=>this.setState({
                        acctDate: ModalDatePicker.calcDate(this.state.acctDate, -1)
                    })}>
                        <Icon name='chevron-left' size={30} color="#999999"/>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <ModalDatePicker
                            type='month'
                            minDate='201401'
                            maxDate='201701'
                            selectedValue={this.state.acctDate}
                            callbackPickerValue={(callbackPickerValue)=>this.setState({
                                acctDate: callbackPickerValue,
                            })}
                            textStyle={{color: 'orange', fontSize: 20}}
                        />
                        <Text style={{color: 'orange', fontSize: 20}}>到期</Text>
                    </View>
                    <TouchableOpacity onPress={()=>this.setState({
                        acctDate: ModalDatePicker.calcDate(this.state.acctDate, 1)
                    })}>
                        <Icon name='chevron-right' size={30} color="#999999"/>
                    </TouchableOpacity>
                </View>
                {/* 续趸列表 */}
                {this.renderListView()}
            </View>
        )
    }

    //渲染ListView视图
    renderListView(){
         if(this.state.dataArray && this.state.dataArray.length>0){
             return(
                 <ListView
                     dataSource={this.state.ds.cloneWithRows(this.state.dataArray)}
                     renderRow={this.renderRow.bind(this)}
                 />
             )
         }
    }
    //点击列表
    clickItem(rowID, index) {

        this.props.navigator.push({
            component: BuildingPage, // BuildingPage
            params:{
                gridId:this.state.dataArray[rowID].areaId,
                acctDate:this.state.acctDate
            }
        })
    }

    renderRow(rowData, sectionID, rowID) {
        return (
                <CellComponent
                    typeName="community"
                    dataArray={rowData}
                    clickOnItem={this.clickItem.bind(this)}
                    rowID={rowID}
                />
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    topViewStyle: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomColor: '#e8e8e8',
        borderBottomWidth: 1.0


    },
    houseNameStyle: {
        width: width,
        height: 30,
        //alignItems:'center',
        justifyContent: 'center',
        marginLeft: 10
    }
})