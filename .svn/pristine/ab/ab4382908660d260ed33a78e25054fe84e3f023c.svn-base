/**
 * Created by xxx on 2017/1/6.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class HistoryCell extends Component{
    static defaultProps={
        dataArray:null
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={{alignItems:'center',flexDirection:'row'}}>
                    <View style={{width:8,height:8,borderRadius:4,backgroundColor:'orange',marginLeft:10}}/>
                    <Text style={{marginLeft:10}}>{this.props.dataArray.remark}</Text>
                </View>
                <View style={{justifyContent:'space-around',alignItems:'center',flexDirection:'row',marginTop:10,marginBottom:10}}>
                    <Text style={{color:'orange'}}>{this.props.dataArray.Time}</Text>
                    <Text style={{color:'orange'}}>{this.props.dataArray.Name}</Text>
                    <Text style={{color:'orange'}}>{this.props.dataArray.States}</Text>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        borderBottomWidth:1.0,
        borderBottomColor:'#e8e8e8',
        marginTop:10
    }
});