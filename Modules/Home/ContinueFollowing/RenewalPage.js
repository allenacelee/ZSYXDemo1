/**
 * Created by xxx on 2017/1/4.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ListView,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView,
    TextInput,
    Linking,
} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
var dataArray = require('./../../../LoaclData/RenewalData.json')
var historyData = require('./../../../LoaclData/HistoryData.json')
import NavigationBar from '../../Pub/NavigationBar/NavigationBar'
import HistoryCell from './HistoryCell'

export default class RenewalPage extends Component {
    static defaultProps = {};

    // 构造
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2})
        // 初始状态
        this.state = {
            agreedState: true,      // 已同意 默认为true  即 选中状态
            refusedState: false,    // 不同意 默认为false 即 未选中状态
            consideringState: false, // 考虑中 默认为false 即 未选中状态
            dataSource: ds.cloneWithRows(historyData),
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title="到期续趸"
                    titleColor="orange"
                    onPressRightIcon={()=>this.props.navigator.popToTop()}
                    {...this.props}
                />
                <ScrollView style={{flex: 1}}>
                    {/* 客户名称 */}
                    <View style={styles.userNameStyle}>
                        <Text style={{color: 'gray'}}>客户姓名 :</Text>
                        <Text style={{color: 'gray', marginLeft: 10}}>{dataArray.userName}</Text>
                        <TouchableOpacity onPress={()=>this.callPhone()}>
                            <Image style={{width: 20, height: 20, marginLeft: 10}}
                                   source={require('../../Img/img/call_left@3x.png')}/>
                        </TouchableOpacity>
                    </View>
                    {/* 分割线 */}
                    <View style={{width: width, height: 1.0, backgroundColor: '#e8e8e8'}}/>
                    {/* 设备号 */}
                    <View style={styles.userNameStyle}>
                        <Text style={{color: 'gray'}}>设备号 :</Text>
                        <Text style={{color: 'gray', marginLeft: 10}}>{dataArray.deviceNumber}</Text>
                    </View>
                    {/* 分割线 */}
                    <View style={{width: width, height: 1.0, backgroundColor: '#e8e8e8'}}/>
                    {/* 接入方式／速率 */}
                    <View style={styles.userNameStyle}>
                        <Text style={{color: 'gray'}}>接入方式／速率 :</Text>
                        <Text style={{color: 'gray', marginLeft: 10}}>{dataArray.AccessWay}</Text>
                    </View>
                    {/* 分割线 */}
                    <View style={{width: width, height: 1.0, backgroundColor: '#e8e8e8'}}/>
                    {/* 主资费 */}
                    <View style={styles.userNameStyle}>
                        <Text style={{color: 'gray'}}>主资费 :</Text>
                        <Text style={{color: 'gray', marginLeft: 10}}>{dataArray.Tariff}</Text>
                    </View>
                    {/* 分割线 */}
                    <View style={{width: width, height: 1.0, backgroundColor: '#e8e8e8'}}/>
                    {/* 到期 续趸时间 */}
                    <View style={styles.userNameStyle}>
                        <Text style={{color: 'gray'}}>到期时间 :</Text>
                        <Text style={{color: 'gray', marginLeft: 10}}>{dataArray.expirationTime}</Text>
                        <Text style={{color: 'gray', marginLeft: 60}}>续趸时间 :</Text>
                        <Text style={{color: 'gray', marginLeft: 10}}>{dataArray.continueTime}</Text>
                    </View>
                    {/* 分割线 */}
                    <View style={{width: width, height: 1.0, backgroundColor: '#e8e8e8'}}/>
                    {/* 同意 不同意 考虑中 */}
                    <View style={styles.stateStyle}>
                        {/* 已同意 */}
                        {this.state.agreedState == true ?
                            (   <TouchableOpacity onPress={()=>this.clickOnAgreedItem()}>
                                    <View style={{
                                        width: width / 3,
                                        height: width / 3,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column'
                                    }}>
                                        <Image style={{width: width / 3 - 40, height: width / 3 - 40}}
                                               source={require('../../Img/img/p2@3x.png')}/>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Image
                                                source={require('../../Img/img/all_task_list_filter_checkbox_checked@2x.png')}/>
                                            <Text style={{color: 'orange'}}>已同意</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                            :
                            (
                                <TouchableOpacity onPress={()=>this.clickOnAgreedItem()}>
                                    <View style={{
                                        width: width / 3,
                                        height: width / 3,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column'
                                    }}>
                                        <Image style={{width: width / 3 - 40, height: width / 3 - 40}}
                                               source={require('../../Img/img/p2@3x.png')}/>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{color: 'gray'}}>已同意</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                        {/* 不同意 */}
                        {this.state.refusedState == true ?
                            (   <TouchableOpacity onPress={()=>this.clickOnRefusedItem()}>
                                    <View style={{
                                        width: width / 3,
                                        height: width / 3,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column'
                                    }}>
                                        <Image style={{width: width / 3 - 40, height: width / 3 - 40}}
                                               source={require('../../Img/img/p3@3x.png')}/>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Image
                                                source={require('../../Img/img/all_task_list_filter_checkbox_checked@2x.png')}/>
                                            <Text style={{color: 'orange'}}>不同意</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                            :
                            (
                                <TouchableOpacity onPress={()=>this.clickOnRefusedItem()}>
                                    <View style={{
                                        width: width / 3,
                                        height: width / 3,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column'
                                    }}>
                                        <Image style={{width: width / 3 - 40, height: width / 3 - 40}}
                                               source={require('../../Img/img/p3@3x.png')}/>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{color: 'gray'}}>不同意</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                        {/* 考虑中 */}
                        {this.state.consideringState == true ?
                            (   <TouchableOpacity onPress={()=>this.clickOnConsideringItem()}>
                                    <View style={{
                                        width: width / 3,
                                        height: width / 3,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column'
                                    }}>
                                        <Image style={{width: width / 3 - 40, height: width / 3 - 40}}
                                               source={require('../../Img/img/p1@3x.png')}/>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Image
                                                source={require('../../Img/img/all_task_list_filter_checkbox_checked@2x.png')}/>
                                            <Text style={{color: 'orange'}}>考虑中</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                            :
                            (
                                <TouchableOpacity onPress={()=>this.clickOnConsideringItem()}>
                                    <View style={{
                                        width: width / 3,
                                        height: width / 3,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column'
                                    }}>
                                        <Image style={{width: width / 3 - 40, height: width / 3 - 40}}
                                               source={require('../../Img/img/p1@3x.png')}/>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{color: 'gray'}}>考虑中</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                    {/* 说点什么吧 */}
                    <TextInput style={styles.remarkTextInputStyle}
                               autoCapitalize="none"
                               placeholder="说点什么吧..."
                               autoCorrect={false}
                               returnKeyType="done"
                               clearButtonMode="always"
                               numberOfLines={2}
                               multiline={true}
                    >
                    </TextInput>
                    {/* 历史记录 */}
                    <Text style={{color: 'orange', marginTop: 10}}>历史记录</Text>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                    />
                </ScrollView>
            </View>
        )
    }

    //已同意
    clickOnAgreedItem() {
        if (!this.state.agreedState) {
            this.setState({
                agreedState: !this.state.agreedState
            })
        }
        if (this.state.refusedState) {
            this.setState({
                refusedState: !this.state.refusedState
            })
        }
        if (this.state.consideringState) {
            this.setState({
                consideringState: !this.state.consideringState
            })
        }
    }

    //不同意
    clickOnRefusedItem() {
        if (!this.state.refusedState) {
            this.setState({
                refusedState: !this.state.refusedState
            })
        }
        if (this.state.consideringState) {
            this.setState({
                consideringState: !this.state.consideringState
            })
        }
        if (this.state.agreedState) {
            this.setState({
                agreedState: !this.state.agreedState
            })
        }
    }

    //考虑中
    clickOnConsideringItem() {
        if (!this.state.consideringState) {
            this.setState({
                consideringState: !this.state.consideringState
            })
        }
        if (this.state.refusedState) {
            this.setState({
                refusedState: !this.state.refusedState
            })
        }
        if (this.state.agreedState) {
            this.setState({
                agreedState: !this.state.agreedState
            })
        }
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <HistoryCell
                dataArray={rowData}
            />
        )
    }

    callPhone() {
        return Linking.openURL('tel:' + dataArray.deviceNumber);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    userNameStyle: {
        flexDirection: 'row',
        width: width - 20,
        height: 40,
        marginLeft: 10,
        alignItems: 'center'
    },
    continueTimeStyle: {
        flexDirection: 'row',
        width: width - 20,
        height: 40,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    stateStyle: {
        flexDirection: 'row',
        width: width
    },
    // keyBoardViewStyle:{
    //     flex:1,
    //     height:40,
    //     width:width
    // },
    remarkTextInputStyle: {
        color: 'black',
        fontSize: 15,
        borderTopWidth: 1.0,
        borderBottomWidth: 1.0,
        borderColor: 'rgb(247,247,247)',
        width: width - 10,
        height: 40,
        marginLeft: 5,
        marginTop: 5
    }
})