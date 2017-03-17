/**
 * Created by xxx on 2017/2/23.
 */
// 开户信息
/**
 * Created by xxx on 2017/2/23.
 */
//归集信息
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    ScrollView
} from 'react-native';
export default class AccountInformation extends Component {
        static  defaultProps = {
            dataArray:null
        }
    render(){
        return(
            <View style={styles.container}>
                <ScrollView style={{flex:1}}>
                    <View style={styles.textInfoStyle}>
                        <Text style={{textAlign:'left',color:'gray'}}>{'开户时间 :'+  this.props.dataArray.openDate}</Text>
                    </View>
                    <View style={styles.textInfoStyle}>
                        <Text style={{textAlign:'left',color:'gray'}}>{'开户方式 :'+  this.props.dataArray.openModeName}</Text>
                    </View>
                    <View style={styles.textInfoStyle}>
                        <Text style={{textAlign:'left',color:'gray'}}>{'开户渠道 :'+  this.props.dataArray.openDepartName}</Text>
                    </View>
                    <View style={styles.textInfoStyle}>
                        <Text style={{textAlign:'left',color:'gray'}}>{'受理员工 :'+  this.props.dataArray.openStaffName}</Text>
                    </View>
                    <View style={styles.textInfoStyle}>
                        <Text style={{textAlign:'left',color:'gray'}}>{'客户类型 :'+  this.props.dataArray.custType}</Text>
                    </View>
                    <View style={styles.textInfoStyle}>
                        <Text style={{textAlign:'left',color:'gray'}}>{'网别 :'+  this.props.dataArray.netTypeName}</Text>
                    </View>
                    <View style={styles.textInfoStyle}>
                        <Text style={{textAlign:'left',color:'gray'}}>{'用户类型 :'+  this.props.dataArray.userTypeName}</Text>
                    </View>
                    <View style={styles.textInfoStyle}>
                        <Text style={{textAlign:'left',color:'gray'}}>{'固网移网标识 :'+  this.props.dataArray.gyName}</Text>
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