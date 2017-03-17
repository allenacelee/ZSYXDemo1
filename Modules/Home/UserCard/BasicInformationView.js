/**
 * Created by xxx on 2017/2/22.
 */
// 基本信息
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    ListView,
    Dimensions,
    Modal,
    ActivityIndicator,
    RefreshControl,
    Text,
    ScrollView
} from 'react-native';
export default class BasicInformationView extends Component {
    static defaultProps = {
        dataArray:null
    }


    render(){
        let type;
        if(this.props.dataArray.prepayTag == 0){
            type = '后付费客户'
        }else
        {
            type = '预付费客户'
        }
        return(
            <View style={styles.container}>
                <ScrollView style={{flex:1}}>
                    <View style={styles.textInfoStyle}>
                        <Text style={{textAlign:'left',color:'gray'}}>{'客户姓名 :'+  this.props.dataArray.custName}</Text>
                    </View>
                    <View style={styles.textInfoStyle}>
                        <Text style={{textAlign:'left',color:'gray'}}>{'套餐类别 :'+  type}</Text>
                    </View>
                    <View style={styles.textInfoStyle}>
                        <Text style={{textAlign:'left',color:'gray'}}>{'业务号码 :'+  this.props.dataArray.serialNumber}</Text>
                    </View>
                    <View style={styles.textInfoStyle}>
                        <Text style={{textAlign:'left',color:'gray'}}>{'联系号码 :'+  this.props.dataArray.linktele}</Text>
                    </View>
                    <View style={styles.textInfoStyle}>
                        <Text style={{textAlign:'left',color:'gray'}} numberOfLines={3}>{'联系地址 :'+  this.props.dataArray.installAddress}</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection:'column',
        flex:1
    },
    textInfoStyle:{
        marginLeft:20,
        marginTop:20,
        height:40,
        width:Dimensions.get('window').width-100-40,
        borderBottomWidth:1.0,
        borderBottomColor:'#e8e8e8'
    }
});