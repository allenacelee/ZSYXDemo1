/**
 * Created by xxx on 2017/3/6.
 * 地图展示
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Button,
    ScrollView,
    Dimensions,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import NavigationBar from '../../Pub/NavigationBar/NavigationBar'
import MapComponent from './MapComponent'
const width = Dimensions.get('window').width;
// 缩放视图
import PhotoView from 'react-native-photo-view';



export default class TaskCheckSign extends Component {

    render(){
        return(
            <View style={styles.container}>
                {/*<PhotoView*/}
                    {/*source={require('../../Img/img/Map.png')}*/}
                    {/*minimumZoomScale={1}*/}
                    {/*maximumZoomScale={1}*/}
                    {/*androidScaleType="center"*/}
                    {/*style={{width:width,height:300,marginTop:0,backgroundColor:'orange'}}*/}
                {/*/>*/}
                <Image style={{width: width,height:300,}} source={require('../../Img/img/map.png')}/>
                {/* 经纬度 */}
                <View style={styles.locationStyle}>
                    <Text>{'经纬度 :'+'116.587188'+','+' 39.81351'}</Text>
                    <Text>北京市朝阳区北苑路乙108号</Text>
                </View>
                {/* 签到 */}
                <View style={styles.signBtnStyle}>
                    {/* GPS定位 */}
                    <View style={[styles.btnStyle,{backgroundColor: 'blue'}]}>
                        <TouchableOpacity onPress={()=>this.clickOnBtn()}>
                            <Text style={{color:'white'}}>GPS定位</Text>
                        </TouchableOpacity>
                    </View>
                    {/* 签到 */}
                    <View style={[styles.btnStyle,{backgroundColor:'gray'}]}>
                        <TouchableOpacity onPress={()=>this.clickOnBtn()}>
                            <Text style={{color:'black'}}>签到</Text>
                        </TouchableOpacity>
                    </View>
                    {/* 手动签到 */}
                    <View style={[styles.btnStyle,{backgroundColor:'blue'}]}>
                        <TouchableOpacity onPress={()=>this.clickOnBtn()}>
                            <Text style={{color:'white'}}>手动签到</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    clickOnBtn(index){

        alert(index);
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    locationStyle:{
        flexDirection:'column',
        justifyContent:'center',
        marginTop:10,
        marginLeft:27
    },
    signBtnStyle:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginTop:10
    },
    btnStyle:{
        borderRadius:5.0,
        width:70,
        height:30,
        alignItems:'center',
        justifyContent:'center'
    }
});