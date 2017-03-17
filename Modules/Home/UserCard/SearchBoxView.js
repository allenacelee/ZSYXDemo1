/**
 * Created by xxx on 2017/2/28.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ListView,
    TextInput,
    Dimensions
} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import ModalDropdown from 'react-native-modal-dropdown';

const DEMO_OPTIONS_1 = ['用户名', '手机号', '营销单元','网格','楼宇'];


export default class UserCardPage extends Component {
    static defaultProps = {
        dataArray:[],
        SlecteSearchType:null,
        TextInputTextChanged:null
    }

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {searchKeyword:'营销单元'};
      }

    // 筛选类型按钮的点击回调事件
    SelectedSearchType(){
        this.props.SlecteSearchType();
    }

    render(){
        return(
            <View style={styles.container}>
                {/* 筛选类型选择 */}
                <View style={styles.searchType}>
                    <ModalDropdown style={styles.dropdown_1}
                                   options={DEMO_OPTIONS_1}
                                   onSelect={(idx, value) => this.dropdownOnSelect(idx, value)}
                    >
                            <Text style={{color:'#e8e8e8',fontSize:12}}>{this.state.searchKeyword}</Text>
                            <Image style={{width:15,height:15,position:'absolute',left:50,top:0}} source={require('../../Img/img/triangle_down@3x.png')}/>
                    </ModalDropdown>
                </View>
                {/* 竖线 */}
                <View style={{marginLeft:5,marginTop:10,backgroundColor:'#e8e8e8',width:1,height:15}}/>
                {/* 搜索输入框 */}
                <View style={styles.searchBoxStyle}>
                    <Image style={{width:15,height:15,marginLeft:5}} source={require('../../Img/img/search@3x.png')}/>
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        clearButtonMode="always"
                        placeholder="请输入关键字进行检索"
                        style={styles.searchTextInput}
                        onChangeText={(text)=>{this.contextChanged(text)}}
                    >
                    </TextInput>
                </View>
                <View style={{marginLeft:5,backgroundColor:'red',width:width,height:2 ,marginTop:1}}/>
            </View>
        )
    }
    //筛选下拉框点击选中事件
    dropdownOnSelect(idx, value){
        this.setState({
            searchKeyword:value
        })
    }
    //搜索文本框内容发生变化回调事件
    contextChanged(text){
        this.props.TextInputTextChanged(text);
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        height:35
    },
    searchType:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        width:80,
        height:35,
        backgroundColor:'white'
    },
    searchBoxStyle:{
        width:width-80,
        flexDirection:'row',
        alignItems:'center',
        marginLeft:5,
        height:35
    },
    searchTextInput:{
        backgroundColor: 'white',
        height: 35
        ,
        marginLeft:10,
        width:Dimensions.get('window').width - 80 - 40,
        fontSize:14
    },
    dropdown_1: {
        flex:1,
        //top: 10,
        left:5,
        height:35,
        //backgroundColor:'red',
        //alignItems:'center',
        justifyContent:'center'
    },
});