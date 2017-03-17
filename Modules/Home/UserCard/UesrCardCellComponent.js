/**
 * Created by xxx on 2017/2/20.
 */
//用户卡片cell组件
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ListView,
    Dimensions
} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class UesrCardCellComponent extends Component{

    static defaultProps = {
        dataArray:null,
        clickOnItem:null,  //点击事件
        rowID:null
    };
    //点击事件传递
    clickItem(rowID,index){
        this.props.clickOnItem(rowID,index);
    }
    render(){
        return(
            <TouchableOpacity onPress={this.clickItem.bind(this,this.props.rowID,0)}>
                <View style={styles.container}>
                    {/* 基础信息视图 */}
                    <View style={[styles.infoStyle,{height:30}]}>
                        {/* 客户名 */}
                        <Text style={styles.custNameStyle}>{this.props.dataArray.custName}</Text>
                        {/* 竖线 */}
                        <View style={{marginLeft:15,height:15,width:1,backgroundColor:'#e8e8e8'}} />
                        {/* 电话号码 */}
                        <Text style={{color:'orange',fontSize:18,marginLeft:20}}>{this.props.dataArray.linktele}</Text>
                    </View>
                    {/* 营销单元 */}
                    <View style={[styles.infoStyle,{height:25}]}>
                        {/*营销单元*/}
                        <View style={{width:width-50}}>
                            <Text numberOfLines={2} style={{color:'gray',fontSize:14}}>{'营销单元: '+'北美国际商务中心'}</Text>
                        </View>
                    </View>
                    {/* 营销网格 */}
                    <View style={[styles.infoStyle,{height:25}]}>
                        <View style={{width:width-50}}>
                            <Text numberOfLines={2} style={{color:'gray',fontSize:14}}>{'营销网格: '+'北美国际商务中心网格'}</Text>
                        </View>
                    </View>
                    {/* 楼宇 */}
                    <View style={[styles.infoStyle,{height:25,width:width-50}]}>
                        <Text style={{color:'gray',fontSize:14}}>{'楼宇: '+'北京市朝阳区北苑路乙北美国际商务中心B座'}</Text>
                    </View>
                    {/* 下级箭头 */}
                    <View style={styles.lowerArrowStyle}>
                        <Image source={require('../../Img/img/arrow_right@3x.png')}/>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        height:150,
        borderBottomWidth:1.0,
        borderBottomColor:'#e8e8e8',
    },
    infoStyle:{
        //justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        //backgroundColor:'green',
        marginLeft:10,
        marginTop:10
    },
    addressStyle:{
        marginTop:10,
        marginLeft:10,
        //alignItems:'center',
        //backgroundColor:'orange',
        width:width-60,
        height:40,
        justifyContent:'center',
    },
    lowerArrowStyle:{
        position:'absolute',
        width:15,
        height:15,
        right:10,
        top:(150-15)/2
    },
    custNameStyle:{
        fontSize:20
    }
});