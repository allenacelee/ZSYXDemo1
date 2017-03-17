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
export default class CollectionInformation extends Component {

    static defaultProps = {
        dataArray:null
    }
    render(){
        return(
            <View style={styles.container}>
                <ScrollView style={{flex:1}}>
                    <View style={styles.textInfoStyle}>
                        <Text style={{textAlign:'left',color:'gray'}}>{'分公司 :'+  this.props.dataArray.eparchyName}</Text>
                    </View>
                    <View style={styles.textInfoStyle}>
                        <Text style={{textAlign:'left',color:'gray'}}>{'分局 :'+  this.props.dataArray.cityName}</Text>
                    </View>
                    <View style={styles.textInfoStyle}>
                        <Text style={{textAlign:'left',color:'gray'}}>{'责任逻辑网格名称 :'+  this.props.dataArray.dgridName}</Text>
                    </View>
                    <View style={styles.textInfoStyle}>
                        <Text style={{textAlign:'left',color:'gray'}}>{'物理网格名称 :'+  this.props.dataArray.pgridName}</Text>
                    </View>
                    <View style={styles.textInfoStyle}>
                        <Text style={{textAlign:'left',color:'gray'}}>{'归属楼宇 :'+  this.props.dataArray.builddingName}</Text>
                    </View>
                    <View style={styles.textInfoStyle}>
                        <Text style={{textAlign:'left',color:'gray'}}>{'发展人 :'+  this.props.dataArray.developStaffName}</Text>
                    </View>
                    <View style={styles.textInfoStyle}>
                        <Text style={{textAlign:'left',color:'gray'}}>{'渠道 :'+  this.props.dataArray.developDepartName}</Text>
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