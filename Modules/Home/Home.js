import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    StatusBar,
} from 'react-native';
import NavigationBar from '../Pub/NavigationBar/NavigationBar'
import TopMenuView from './TopMenuView'
import IndicatorsView from './IndicatorsView'
import ListIndicators from './ListIndicatorsView'

import HomeController from "./HomeController";
import ReportController from "../Report/ReportController";

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reportDataArray: [],
            listIndicatorsDataArray: [],
            matrixIndicatorsDataArray: [],
            topMenuDataArray: [],
        };
        this.homeController = new HomeController(this);
        this.reportController = new ReportController(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title="首页"
                    {...this.props}
                />
                <StatusBar
                    backgroundColor={'#F7F7F7'}
                    barStyle= {'dark-content'}
                />
                <ScrollView style={{width: Width, height: Height - 64}}>
                    {/*<ScrollView style={{backgroundColor: 'white'}}>*/}
                    {/** 菜单部分 **/}
                    <TopMenuView
                        dataArray={this.state.topMenuDataArray}
                        callBackClickOnItem={(menuCode)=>this.homeController.topMenuClick(menuCode)}
                    />
                    {/*</ScrollView>*/}
                    {/*** 指标模块 ***/}
                    <IndicatorsView
                        dataArray={this.state.matrixIndicatorsDataArray}
                        {...this.props}
                    />
                    {/** 列表指标视图 **/}
                    <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 10}}>
                        <View style={{width: 6, height: 15}}/>
                        <Text style={{fontSize: 13, marginLeft: 10}}>月指标</Text>
                    </View>
                    <ListIndicators
                        dataArray={this.state.listIndicatorsDataArray}
                        {...this.props}
                    />
                    {/** 常用报表 **/}
                    <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 10}}>
                        <View style={{width: 6, height: 15}}/>
                        <Text style={{fontSize: 13, marginLeft: 10}}>常用报表</Text>
                    </View>
                    {this.renderReportView()}
                </ScrollView>

            </View>

        );
    }

    // 获取首页展示数据
    componentDidMount() {
        // 读取页面信息
        storage.load({
            key: 'homePageData',
            id: userId
        }).then(homePageData => {
            this.setState({
                reportDataArray: homePageData.contentList[3].menuList,
                listIndicatorsDataArray: homePageData.contentList[2].menuList,
                matrixIndicatorsDataArray: homePageData.contentList[1].menuList,
                topMenuDataArray: homePageData.contentList[0].menuList
            })
        }).catch(err => {
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    break;
                case 'ExpiredError':
                    break;
            }
        })
    }

    // 常用报表
    renderReportView() {
        var req = require('../Img/img/menu_report_icon_1.png')

        var ItemArray = [];
        var dataArray = this.state.reportDataArray;
        for (let i = 0; i < dataArray.length; i++) {
            ItemArray.push(
                <TouchableOpacity onPress={()=> {
                    this.reportController.onPressReportItem(dataArray[i])
                }} style={styles.TouchableStyle} key={i}>
                    <View style={styles.RepostListStyle} key={i}>
                        <Image style={styles.ReportImageStyle} source={req}/>
                        <Text style={styles.ReportContextStyle}>{dataArray[i].menuName}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return ItemArray;
    }
}

const styles = StyleSheet.create({
    container: {
        width: Width,
        flex: 1,
        backgroundColor: 'white'
    },
    ReportImageStyle: {
        width: 30,
        height: 30,
        marginLeft: 10
    },
    RepostListStyle: {
        width: Width,
        height: 40,
        flexDirection: 'row',
        width: Width,
        alignItems: 'center'
    },
    TouchableStyle: {
        width: Width,
        height: 40,
        flexDirection: 'row',
        width: Width,
        alignItems: 'center',

    },
    ReportContextStyle: {
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 12
    },
    conteneViewStyle: {
        width: Width,
        flexDirection: 'column',
        marginTop: 0
    },
});
