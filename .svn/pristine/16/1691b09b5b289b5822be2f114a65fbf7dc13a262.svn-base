/**
 * Created by xxx on 2016/12/19.
 * 列表图组件
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import NavigationBar from '../../Pub/NavigationBar/NavigationBar'
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const data = [{"name":"二区","todayValue":'14',"yesterdayValue":"14","aggregateValue":'278'},
              {"name":"二区","todayValue":'19',"yesterdayValue":"28","aggregateValue":'288'}
             ];
const tabHeadData = ["营销单元","今日值","昨日值","累计值"];

var tempColor = null;

export default class GridTable extends Component {
    static defaultProps = {
        dataArray:data,//列表数据
        tabHeadData:tabHeadData,
        cellTextColor:'gray',
        tabHeadTextColor:'white'
    }
    // 构造
      constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged:(row1, row2)=>row1 !== row2})
        // 初始状态
        this.state = {
            dataSource:ds.cloneWithRows(this.props.dataArray)
        };
      }

    render(){
        return(
            <View style={styles.container}>
                    <NavigationBar
                        title="报表"
                        {...this.props}
                    />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    enableEmptySections={true}
                    renderHeader={()=>this.renderHeader()}
                />
            </View>
        )
    }

    renderHeader(){
        return(
            <View style={styles.tabHeadStyle}>
                {this.renderTabHead()}
            </View>
        )
    }
    renderTabHead(){

        var ItemArray = [];
        var tempArray = this.props.tabHeadData;
        for (let i=0;i<tempArray.length;i++){
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
    renderRow(rowData,sectionID,rowID){
        if (rowID%2==0){
            tempColor = 'white'
        }else {
            tempColor = 'rgba(248,248,240,1.0)'
        }

        return(
            <TouchableOpacity onPress={()=>{alert('点击第'+rowID+'行')}}>
            <View style={styles.cellStyle}>
                {this.renderCell(rowData)}
            </View>
            </TouchableOpacity>
        )
    }
    renderCell(rowData){

        var keyArray = [];
        var ItemArray = [];
        // get all Key from map
        for (var k in rowData){
            keyArray.push(k);
        }
       for (let i=0;i<tabHeadData.length;i++){
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
    },
    textStyle:{
        alignItems:'center',
        justifyContent:'center',
        width:Width/tabHeadData.length
    },
    tabHeadStyle:{
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        height:44,
        backgroundColor:'orange'
    },
    tabHeadViewStyle:{
        alignItems:'center',
        justifyContent:'center',
        width:Width/tabHeadData.length
    },
    cellStyle:{
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        height:44
    },
    cellViewStyle:{
        alignItems:'center',
        justifyContent:'center',
        width:Width/tabHeadData.length,
        backgroundColor:tempColor,
        height:44
    }
});