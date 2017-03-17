/**
 * Created by Guang on 16/8/8.
 * 签名页
 */

import React from 'react'
import {
    View,
    ART,
    Point,
    Text,
    PanResponder,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Path,
    NativeModules,
    Platform
} from 'react-native'

import NavigationBar from '../../Pub/NavigationBar/NavigationBar'
import CheckBox  from './CheckDemo'
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

// 画板宽度
var sourfaceWidth = width;
// 画板高度
var sourfaceHeight = height-64-120-30;// -64-30-120-80
// 画笔宽度
var strokeWidth = 5.0;
// 画笔颜色
var color = 'orange';
var pointArray = [];

var path = ART.Path();

export default class SignDemo extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            eventName:'',
            pos:'',
            showPoints:null
        };
        this.myPanResponder={}
    }
    componentWillMount() {
        this.myPanResponder = PanResponder.create({

            //*********************第二种触摸的形式***************************
            //类似 shouldComponentUpdate，监听手势开始按下的事件，返回一个boolean决定是否启用当前手势响应器
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder.bind(this),

            //监听手势移动的事件，返回一个boolean决定是否启用当前手势响应器
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder.bind(this),

            //手势开始处理
            onPanResponderGrant: this._handlePanResponderGrant.bind(this),

            //手势移动时的处理
            onPanResponderMove: this._handlePanResponderMove.bind(this),

            //用户放开所有触点时的处理
            onPanResponderRelease: this._handlePanResponderRelease.bind(this),

            //另一个组件成了手势响应器时（当前组件手势结束）的处理
            onPanResponderTerminate: this._handlePanResponderEnd.bind(this)
        });
    }
    _handleStartShouldSetPanResponder(e, gestureState){
        //返回一个boolean决定是否启用当前手势响应器
        
        return true;
    }
    _handleMoveShouldSetPanResponder(e, gestureState){
        return true;
    }
    _handlePanResponderGrant(e, gestureState){
        this.setState({
            eventName : 'Start'
        })
    }
    _handlePanResponderRelease(e, gestureState){
        /** TouchMove 时间结束后 清空数组 **/
        pointArray = [];
        // this.setState({
        //     eventName : 'End'
        // })
    }
    _handlePanResponderMove(e, gestureState){
        var _pos = 'x:' + gestureState.moveX + ',y:' + gestureState.moveY;
        this.setState({
            eventName : 'Move:',
            pos : _pos
        })
        var pointDic = {};
        pointDic.key = gestureState.moveX;
        pointDic.name =gestureState.moveY;
        pointArray.push(pointDic);

        var count = pointArray.length;
        if (count>1){
            var MoveToDic = pointArray[count-2];
            path.moveTo(MoveToDic.key,MoveToDic.name-64-120);//50-64

            var pointDic = pointArray[count-1];
            path.lineTo(pointDic.key,pointDic.name-64-120)//50-64
        }
    }
    _handlePanResponderEnd(e, gestureState) {
        // this.setState({
        //     eventName : '另一个组件成了手势响应器时（当前组件触摸结束）的处理'
        // })
        pointArray = [];
    }
    render(){
        return(
            <View style={styles.container} {...this.myPanResponder.panHandlers}>
                <NavigationBar 
                    title="客户回访登记"
                    rightButtonIcon='chevron-right'
                    onPressRightIcon={()=>{this.saveScreenshot()}}
                    {...this.props} 
                />
                <View style={styles.textView}>
                     <View>
                     <Text >客户评价:</Text>
                     </View>
                     <View style={styles.checkBox}>
                        <CheckBox />
                     </View>
                 </View>
                <View>
                    <Text >客户签名:</Text>
                </View>
                <View style={styles.surfaceStyle}>

                    <ART.Surface width={sourfaceWidth} height={sourfaceHeight} backgroundColor="white">{/** 画板 **/}
                        <ART.Shape d={path} stroke={color} strokeWidth={5}/>
                    </ART.Surface>
                </View>
                <TouchableOpacity onPress={()=>this.signatureMethod()} style={styles.redrawStyle}>
                    <View style={styles.redrawStyle}>
                        <Text style={{color:'orange',marginRight:10,fontSize:18}}>{"重签"}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    signatureMethod(){
        pointArray = [];
        path = ART.Path();
        this.setState({
            eventName:'重绘'
        })
    }

    //保存截图
    saveScreenshot(){
        if (__IOS__){
            NativeModules.RNBridgeModule.RNInvokeOCCallBack(
                {"name":"1"},
                (error,events)=>{
                    if(error){
                        console.error(error);
                    }else{
                        //this.setState({events:events});
                        alert(events[0])
                    }
                }
            )
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textView:{
        marginTop:10,
        height:90,
    },
    checkBox:{
        flex:1,
        marginTop:15,
    },
    surfaceStyle:{
        width:width,
        height:height-64-120-30,  //64-30-120-80
        //marginTop:20,
        borderColor:'black',
        borderWidth:1,
        borderTopWidth:1,
        borderBottomWidth:1,
        borderStyle:'dashed',
    },
    redrawStyle: {
        height:30,
        width:width,
        alignItems:'flex-end',//flex-end
        justifyContent:'center'
    }
});
