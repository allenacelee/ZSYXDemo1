/**
 * Created by xxx on 2017/1/4.
 */
//续趸模块cell组件
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

export default class CellComponent extends Component {
    static defaultProps = {
        typeName:'community', //community OR building
        dataArray:{},
        clickOnItem:null,
        rowID:null
    }
    //点击事件传递
    clickItem(rowID,index){
        this.props.clickOnItem(rowID,index);
    }
    render(){
        return(
            <View style={styles.cellStyle}>
                {
                    this.props.typeName == 'building'?
                    //楼宇
                    (
                        <View style={styles.container}>
                            {/* 小区名 */}
                            <View style={styles.houseNameStyle}>
                                <Text style={{fontWeight:'500',fontSize:18}}>{this.props.dataArray.areaName}</Text>
                            </View>
                            {/* 续约详情 */}
                            <View style={styles.contractViewStyle}>
                                {/* 全部 */}
                                <TouchableOpacity onPress={this.clickItem.bind(this,this.props.rowID,0)}>
                                    <View style={{alignItems:'center',justifyContent:'space-around',width:(width-10)/3,flexDirection:'row',marginBottom:10,marginTop:10}}>
                                        <Text style={{fontSize:18,marginTop:5,fontWeight:'400'}}>全部</Text>
                                        <Text style={{fontSize:18,fontWeight:'400'}}>{this.props.dataArray.TotalNum}</Text>
                                    </View >
                                </TouchableOpacity>
                                <View style={{width:5,height:20,backgroundColor:'#e8e8e8'}} />
                                {/* 已续约 */}
                                <TouchableOpacity onPress={this.clickItem.bind(this,this.props.rowID,1)}>
                                    <View style={{alignItems:'center',justifyContent:'space-around',width:(width-10)/3,flexDirection:'row',marginBottom:10,marginTop:10}}>
                                        <Text style={{fontSize:18,marginTop:5,fontWeight:'400'}}>已续约</Text>
                                        <Text style={{fontSize:18,fontWeight:'400'}}>{this.props.dataArray.FinishNum}</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{width:5,height:20,backgroundColor:'#e8e8e8'}} />
                                {/* 未续约 */}
                                <TouchableOpacity onPress={this.clickItem.bind(this,this.props.rowID,2)}>
                                    <View style={{alignItems:'center',justifyContent:'space-around',width:(width-10)/3,flexDirection:'row',marginBottom:10,marginTop:10}}>
                                        <Text style={{fontSize:18,marginTop:5,fontWeight:'400'}}>未续约</Text>
                                        <Text style={{color:'orange',fontSize:18,fontWeight:'400'}}>{this.props.dataArray.UnFinishNum}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                    :
                    (
                    //小区
                    <TouchableOpacity onPress={this.clickItem.bind(this,this.props.rowID,999)}>
                    <View style={styles.container}>
                        <View style={styles.houseNameStyle}>
                            <Text style={{fontWeight:'500',fontSize:18}}>{this.props.dataArray.areaName}</Text>
                        </View>
                        {/* 续约详情 */}
                        <View style={styles.contractViewStyle}>
                            {/* 全部 */}
                                <View style={{alignItems:'center',justifyContent:'space-around',width:(width-10)/3,flexDirection:'row',marginBottom:10,marginTop:10}}>
                                    <Text style={{fontSize:18,marginTop:5,fontWeight:'400'}}>全部</Text>
                                    <Text style={{fontSize:18,fontWeight:'400'}}>{this.props.dataArray.TotalNum}</Text>
                                </View >
                            <View style={{width:5,height:20,backgroundColor:'#e8e8e8'}} />
                            {/* 已续约 */}
                                <View style={{alignItems:'center',justifyContent:'space-around',width:(width-10)/3,flexDirection:'row',marginBottom:10,marginTop:10}}>
                                    <Text style={{fontSize:18,marginTop:5,fontWeight:'400'}}>已续约</Text>
                                    <Text style={{fontSize:18,fontWeight:'400'}}>{this.props.dataArray.FinishNum}</Text>
                                </View>
                            <View style={{width:5,height:20,backgroundColor:'#e8e8e8'}} />
                            {/* 未续约 */}
                                <View style={{alignItems:'center',justifyContent:'space-around',width:(width-10)/3,flexDirection:'row',marginBottom:10,marginTop:10}}>
                                    <Text style={{fontSize:18,marginTop:5,fontWeight:'400'}}>未续约</Text>
                                    <Text style={{color:'orange',fontSize:18,fontWeight:'400'}}>{this.props.dataArray.UnFinishNum}</Text>
                                </View>
                        </View>
                    </View>
                    </TouchableOpacity>
                    )
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    cellStyle:{
        width:width,
        borderBottomWidth:1.0,
        borderBottomColor:'#e8e8e8',
        //height:120
    },
    contractViewStyle:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    houseNameStyle:{
        marginTop:5,
        marginLeft:10
    }
});
