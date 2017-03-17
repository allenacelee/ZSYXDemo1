/**
 * =========================================================================
 *
 * @file
 * @description
 * =========================================================================
 *
 * @author linzixiong
 * @date 2017/2/10
 * @version 1.0
 * =========================================================================
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ListView,
    Image,
    Text,
    Button,
    TouchableOpacity,
    RefreshControl,
    Dimensions,
} from 'react-native';
import listData from '../../Json/list.json'
import listRefresh from '../../Json/listRefresh.json'
import Icon from 'react-native-vector-icons/Entypo'
import NavigationBar from '../../Pub/NavigationBar/NavigationBar'
import ModalDatePicker from '../../Pub/ModalDatePicker/ModalDatePicker'
import RenewalPage from './RenewalPage' //续趸提交页面
import HomeController from '../HomeController'
import OwnerInfoListComponent from './OwnerInfoListComponent'

export default class OwnerInfoListPage extends Component {

    static defaultProps = {
        acctDate: '201701'
    };

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) =>r1 != r2});
        this.state = {
            dataSource: ds.cloneWithRows(listData),
            isRefreshing: false,
            acctDate: this.props.acctDate,
        };
        this.homeController = new HomeController(this)
    }

    render() {
        return (
            <View style={styles.container}>
                {/*导航条*/}
                <NavigationBar
                    title="到期续趸"
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

                <ListView
                    initialListSize={9}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    onEndReached={()=> {
                        this.onloadData()
                    }}
                    onEndReachedThreshold={10}
                    renderFooter={this.renderFooter.bind(this)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh.bind(this)}
                            tintColor="#ff0000"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffff00"
                            enabled={true}
                        />
                    }
                />
            </View>
        );
    }

    onloadData() {

        var temp = listData.concat(listRefresh);
        console.log(this.state.dataSource);
        setTimeout(()=> {
            this.setState({dataSource: this.state.dataSource.cloneWithRows(temp)})
        }, 1000);
    }

    //cachedRowCount是DataSource中数据项数量的计数器
    renderFooter() {
        return (<View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 20}}>{this.state.dataSource._cachedRowCount == 45 ? '全部数据加载完毕' : '正在加载更多……'}</Text>
        </View>)
    }

    onRefresh() {
        this.setState({isRefreshing: true});
        setTimeout(()=> {
            this.setState({
                isRefreshing: false,
                dataSource: this.state.dataSource.cloneWithRows(listRefresh)
            });
        }, 1000);
    }

    renderRow(rowData) {
        return (
            <TouchableOpacity onPress={this.clickItem.bind(this)}>
                <OwnerInfoListComponent
                    rowData={rowData}
                />
            </TouchableOpacity>
        );
    }

    clickItem() {
        this.props.navigator.push({
            component: RenewalPage, // RenewalPage
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topViewStyle: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F7F7F7'
    },
});
