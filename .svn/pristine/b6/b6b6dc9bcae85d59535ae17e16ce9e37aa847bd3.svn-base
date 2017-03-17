/**
 * Created by xxx on 2016/12/6.
 * 主页列表矩阵视图
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    TouchableOpacity,
    Dimensions,
    ScrollView
} from 'react-native';
import QuotaController from "../Quota/QuotaController";

var tempColor = 'rgba(240,240,240,1.0)'
const Width = Dimensions.get('window').width
const IndicatorsViewWidth = (Width - 30) / 2;

export default class IndicatorsView extends Component{
    static defaultProps = {
        dataArray: []
    };

    constructor(props) {
        super(props);
        this.quotaController = new QuotaController(this);
    }

    render(){
        return(
            <View style={styles.container}>
                <ScrollView
                    horizontal={true}
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    backgroundColor='white'
                    width={Width}
                    contentContainerStyle={styles.conteneViewStyle}
                >
                    {this.renderListIndicatorsRow()}
                    <View style={{width:Width-20,height:1.0,marginTop:5,backgroundColor:tempColor,marginLeft:10}}/>
                </ScrollView>
            </View>

        )
    }

    renderListIndicatorsRow(){
        var req = require('../Img/img/quota_day@3x.png');
        var dataArray = this.props.dataArray;
        var ItemArray = [];
        for (let i=0;i<dataArray.length;i++){
            ItemArray.push(
                <TouchableOpacity onPress={()=>this.quotaController.onPressQuotaItem(dataArray[i])} key={i} style={styles.IndicatorViewStyle}>
                    <View style={styles.IndicatorViewStyle} key={i} >
                        <Image style={styles.IndicatorImageStyle} source={req} />
                        <Text style={styles.IndicatorTextStyle}>{dataArray[i].menuName}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return ItemArray;
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: Width,
        justifyContent: 'space-around',
        flex:1,
        backgroundColor:'white'
    },
    conteneViewStyle:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: Width,
        justifyContent: 'space-around'
    },
    IndicatorViewStyle:{
        width:Width/2,
        height:40,
        flexDirection:'row',
        alignItems:'center'
    },
    IndicatorImageStyle:{
        width:30,
        height:30,
        marginLeft:10
    },
    IndicatorTextStyle:{
        marginLeft:5,
        justifyContent:'center',
        alignItems:'center',
        fontSize:12,
        width:(Width/2)-10-30-5-10
    }
});