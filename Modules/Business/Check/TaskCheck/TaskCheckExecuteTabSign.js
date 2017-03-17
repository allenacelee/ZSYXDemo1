/**
 * =========================================================================
 *
 * @file TaskCheckExecuteTabSign
 * @description 任务巡店功能点巡店执行页面Tab页面巡店签到
 * =========================================================================
 *
 * @author wanghai
 * @date 2017/3/6
 * @version 1.0
 * =========================================================================
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Button,
    Dimensions,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';

import Indicator from '../../../Pub/Indicator/Indicator'
import CheckController from '../CheckController';

const {width} = Dimensions.get("window");

export default class TaskCheckExecuteTabSign extends Component {

    constructor(props) {
        super(props);
        this.state = {
            locationX: '',
            locationY: '',
            locationName: '',
            signAble: false,
            modalVisible: false,
        };
        this.checkController = new CheckController(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <Indicator
                    visible={this.state.modalVisible}
                    text="定位中"
                />
                {/* 经纬度 */}
                {this.state.signAble ?
                    <View style={styles.locationStyle}>
                        <Text style={styles.locationText}>经纬度 : {this.state.locationX} , {this.state.locationY}</Text>
                        <Text style={styles.locationText}>{this.state.locationName}</Text>
                    </View>
                    :
                    <View style={styles.locationStyle}>
                        <Text style={styles.locationText}>请获取地理位置</Text>
                    </View>
                }
                <View style={styles.signBtnStyle}>
                    {/* GPS定位 */}
                    <TouchableOpacity onPress={()=>this.clickOnBtn(0)}>
                        <View style={[styles.btnStyle, {backgroundColor: '#00B1F0'}]}>
                            <Text style={{color: 'white'}}>GPS定位</Text>
                        </View>
                    </TouchableOpacity>
                    {/* 签到 */}
                    <TouchableOpacity onPress={()=>this.clickOnBtn(1)}>
                        <View style={[styles.btnStyle, {backgroundColor: this.state.signAble ? '#00B1F0' : 'gray'}]}>
                            <Text style={{color: 'white'}}>签到</Text>
                        </View>
                    </TouchableOpacity>
                    {/* 手动签到 */}
                    <TouchableOpacity onPress={()=>this.clickOnBtn(2)}>
                        <View style={[styles.btnStyle, {backgroundColor: '#00B1F0'}]}>
                            <Text style={{color: 'white'}}>手动签到</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    clickOnBtn(index) {
        switch (index) {
            case 0:
                this.setState({
                    modalVisible: true,
                });
                setTimeout(()=> {
                    this.setState({
                        locationX: '116.587188',
                        locationY: '39.81351',
                        locationName: '北京市朝阳区北苑路乙108号',
                        signAble: true,
                        modalVisible: false,
                    });
                }, 1000);
                break;
            case 1:
                if (this.state.signAble) {
                    alert('签到成功');
                } else {
                    alert('请先进行定位');
                }
                break;
            case 2:
                alert('手动签到');
        }
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        width: width,
    },
    locationStyle: {
        justifyContent: 'center',
        marginLeft: 30,
        marginVertical: 20,
        height: 50,
    },
    signBtnStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    btnStyle: {
        borderRadius: 5.0,
        width: 70,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    locationText: {
        fontSize: 15,
    }
});