/**
 * Created by xxx on 2016/12/19.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    TextInput,
    Keyboard
} from 'react-native';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

import NavigationBar from '../../Pub/NavigationBar/NavigationBar'
// 图片选择
import ImageUpdate from '../../Pub/ImageUpdate/ImageUpdate'
// 图片预览
import ImagePreview from '../../Pub/ImagePreview/ImagePreview'
//处理键盘遮挡事件的scrollView
import InputScrollView from 'react-native-inputscrollview'

export default class ActivityAddExec extends Component {

    static defaultProps = {
        theme:'联通4G推广逆天行动',
        grid:'牡丹园北里',
        textColor:'gray'
    }

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            imageSourceArray:[],//点击图片时由 ImageUpdate 组件中将 imageSource 数组传入此页面中
            contentOffsetY:0
        };
    }

    //注册键盘出现的通知
    componentWillMount () {
        this.keyboardWillShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardWillHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }
    //移除监听事件
    componentWillUnmount () {
        this.keyboardWillShowListener.remove();
        this.keyboardWillHideListener.remove();
    }
    //
    _keyboardDidShow (frame) {

        // 视图底部的高度
        let  space = Height-64-45*5-120-(Width - (5 + 1) * 10) /5+10;
        // 键盘的高度
        let keyboardSpace = 244;//frame.endCoordinates.height

        if(keyboardSpace > space){
            this.setState({
                contentOffsetY:keyboardSpace-space
            })
        }
    }
    _keyboardDidHide () {
        this.setState({
            contentOffsetY:0
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <NavigationBar
                    title="补充活动"
                    {...this.props}
                />
                <InputScrollView style={{flex:1}}
                                 automaticallyAdjustContentInsets={false}
                                 contentOffset={{x:0, y:this.state.contentOffsetY}}
                >
                    {/* 活动标题 */}
                    <View style={{flexDirection:'row',height:45,alignItems:'center'}}>
                        <View style={{marginLeft:10,height:30,width:5,backgroundColor:'orange'}} />
                        <Text style={{fontSize:15,marginLeft:15,color:this.props.textColor}}>十一促销活动</Text>
                    </View>
                    <View style={{marginLeft:10,width:Width-20,height:1.0,backgroundColor:'rgba(247,247,247,1.0)'}}/>
                    {/* 主题 */}
                    <View style={{flexDirection:'row',height:45,alignItems:'center'}}>
                        <Text style={{fontSize:15,color:this.props.textColor,marginLeft:10,width:Width*0.25}}>主        题:</Text>
                        <Text style={{fontSize:15,color:this.props.textColor,marginLeft:5,width:Width*0.65}}>{this.props.theme}</Text>
                    </View>
                    {/* 物理网格 */}
                    <View style={{flexDirection:'row',height:45,alignItems:'center'}}>
                        <Text style={{fontSize:15,color:this.props.textColor,marginLeft:10,width:Width*0.25}}>物理网格:</Text>
                        <Text style={{fontSize:15,color:this.props.textColor,marginLeft:5,width:Width*0.65}}>{this.props.grid}</Text>
                    </View>
                    {/* 时间 */}
                    <View style={{flexDirection:'row',height:45,alignItems:'center'}}>
                        <Text style={{fontSize:15,color:this.props.textColor,marginLeft:10,width:Width*0.25}}>时        间:</Text>
                        <TextInput style={styles.textInputStyle}
                                   autoCapitalize="none"
                                   placeholder="输入活动开始时间..."
                                   autoCorrect={false}
                                   returnKeyType="done"
                                   clearButtonMode="always"
                        >
                        </TextInput>
                    </View>
                    {/* 参与人 */}
                    <View style={{flexDirection:'row',height:45,alignItems:'center'}}>
                        <Text style={{fontSize:15,color:this.props.textColor,marginLeft:10,width:Width*0.25}}>参  与  人:</Text>
                        <TextInput style={styles.textInputStyle}
                                   autoCapitalize="none"
                                   placeholder="输入参与人信息..."
                                   autoCorrect={false}
                                   returnKeyType="done"
                                   clearButtonMode="always"
                        >
                        </TextInput>
                    </View>
                    {/* 备注+请说点什么吧.. */}
                    <View style={{height:120}}>
                        <Text style={{fontSize:15,color:this.props.textColor,marginLeft:10,width:Width*0.25}}>备        注:</Text>
                        <TextInput style={styles.remarkTextInputStyle}
                                   autoCapitalize="none"
                                   placeholder="说点什么吧..."
                                   autoCorrect={false}
                                   returnKeyType="done"
                                   clearButtonMode="always"
                                   numberOfLines = {40}
                                   multiline={true}
                        >
                        </TextInput>
                    </View>
                    <ImageUpdate style={{width:Width,marginTop:5}}
                                 ShowImgNums={5}
                                 PreviewImageMethod={(imageSourceArray,index)=>this.props.navigator.push({
                                     component: ImagePreview,
                                     params: {
                                         imageSourceArray:imageSourceArray,
                                         clickItemIndex:index,
                                         contentOffsetX:index*Width
                                     }
                                 })}
                    />
                </InputScrollView>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white'
    },
    textInputStyle:{
        // autoCapitalize:'none',//不自动转换大小写
        // autoCorrect:false,//关闭拼写自动修正
        //placeholder:"输入活动开始时间",
        //clearButtonMode:'always', //iOS
        //returnKeyType:'done',
        color:'black',
        fontSize:15,
        borderWidth:1.0,
        borderColor:'rgb(247,247,247)',
        width:Width*0.65,
        height:35,
        marginLeft:5,
        marginTop:5,
        borderRadius:5.0,
        textAlign:'center'
    },
    remarkTextInputStyle:{
        color:'black',
        fontSize:15,
        borderTopWidth:1.0,
        borderColor:'rgb(247,247,247)',
        width:Width-10,
        height:120,
        marginLeft:5,
        marginTop:5
    }
});