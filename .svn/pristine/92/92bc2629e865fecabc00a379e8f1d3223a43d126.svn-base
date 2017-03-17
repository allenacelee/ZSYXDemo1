/**
 * Created by xxx on 2017/2/23.
 */
//产品信息
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    ScrollView
} from 'react-native';
export default class ProductInformation extends Component {
    static defaultProps = {
        dataArray:null
    }
    render(){
        return(
            <View style={styles.container}>
                <ScrollView style={{flex:1}}>
                    <View style={styles.textInfoStyle}>
                        <Text style={{textAlign:'left',color:'gray'}}>{'主产品名称 :'+  this.props.dataArray.productName}</Text>
                    </View>
                    <View style={styles.textInfoStyle}>
                        <Text style={{textAlign:'left',color:'gray'}}>{'产品描述 :'+  this.props.dataArray.productSpec}</Text>
                    </View>
                    <View style={styles.textInfoStyle}>
                        <Text style={{textAlign:'left',color:'gray'}}>{'活动类型 :'+  this.props.dataArray.productTypeName}</Text>
                    </View>
                    <View style={styles.textInfoStyle}>
                        <Text style={{textAlign:'left',color:'gray'}}>{'品牌 :'+  this.props.dataArray.brandName}</Text>
                    </View>
                    <View style={styles.textInfoStyle}>
                        <Text style={{textAlign:'left',color:'gray'}}>{'主资费 :'+  this.props.dataArray.mainDiscntName}</Text>
                    </View>
                    <View style={styles.textInfoStyle}>
                        <Text style={{textAlign:'left',color:'gray'}}>{'开始时间 :'+  this.props.dataArray.openDate}</Text>
                    </View>
                    <View style={styles.textInfoStyle}>
                        <Text style={{textAlign:'left',color:'gray'}}>{'结束时间 :'+  this.props.dataArray.openDate}</Text>
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
        borderBottomColor:'#e8e8e8',

    }
});