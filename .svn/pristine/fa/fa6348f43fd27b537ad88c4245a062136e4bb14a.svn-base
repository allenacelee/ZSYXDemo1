/**
 * Created by xxx on 16/11/15.
 */
// 首页矩阵指标视图


import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native';
import QuotaController from "../Quota/QuotaController";


var tempColor = 'rgba(240,240,240,1.0)'
var Width = Dimensions.get('window').width;
const IndicatorsViewWidth = (Width - 30) / 2;




export default class IndicatorsView extends Component{

    static defaultProps = {
        dataArray:[]
    };

    constructor(props) {
        super(props);
        this.quotaController = new QuotaController(this);
    }

    render(){
        return(
            <View style={styles.listViewStyle}>
                {/** || 月指标视图 **/}

                {/*** 菜单部分 ***/}
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    contentContainerStyle={styles.scrollViewStyle}
                    scrollEnabled={false}
                >

                    {this.renderMeunItem()}
                    <View style={{width:Width-20,height:1.0,marginTop:10,backgroundColor:tempColor,marginLeft:10}}/>
                </ScrollView>
            </View>
        )
    }
    //横向菜单Item
    renderMeunItem(){
        var colorArray = ["#67BBCA","#77B945","#FA861E","#EE5353"];
        var req = require('../Img/img/quota_day@3x.png');
            var dataArray = this.props.dataArray;
            var ItemArray = [];
            for (let i=0;i<dataArray.length;i++){
                ItemArray.push(
                    <TouchableOpacity onPress={()=>this.quotaController.onPressQuotaItem(dataArray[i])} style={styles.touchCellStyle} key={i}>
                        <View style={[styles.cellStyle, {backgroundColor:colorArray[i]}]}>
                            <Text style={styles.titleStyle}>{dataArray[i].menuName}</Text>
                            <View style={{width: 5, height: 35, backgroundColor: 'white', marginLeft: 10}}></View>
                            <Text style={styles.numsStyle}>{dataArray[i].menuCode}</Text>
                        </View>
                    </TouchableOpacity>
                )
            }
            return ItemArray;
    }
}
const styles = StyleSheet.create({

    listViewStyle: {
        // 主轴方向
        flexDirection: 'row',
        // 多个元素 同行显示
        flexWrap: 'wrap',
        // 宽度为整个设备屏幕的宽度
        justifyContent: 'space-around'
    },
    cellStyle: {
        flexDirection: 'row',
        width: IndicatorsViewWidth,
        height: (150 - 30) / 2,
        // 水平居中
        alignItems: 'center',
        borderRadius: 10,
        //marginTop: 10,
        justifyContent: 'space-around'
    },
    touchCellStyle: {
        height: (150 - 30) / 2,
        marginTop:10
    },
    titleStyle: {
        color: 'white',
        fontSize: 14,
        // 垂直居中
        alignItems: 'center',
        justifyContent: 'center',
        width: IndicatorsViewWidth * 0.5,
        marginLeft: 5
    },
    numsStyle: {
        color: 'white',
        fontSize: 14,
        // 垂直居中
        alignItems: 'center',
        justifyContent: 'center',
        width: IndicatorsViewWidth * 0.3,
        textAlign: 'center',
        marginLeft: 5
    },
    scrollViewStyle:{
        width:Width,
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },


});
