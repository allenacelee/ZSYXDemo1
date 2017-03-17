/**
 * Created by xxx on 2016/12/19.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    TextInput,
} from 'react-native';

import NavigationBar from '../../Pub/NavigationBar/NavigationBar'
import Indicator from '../../Pub/Indicator/Indicator'
import ImageUpdate from '../../Pub/ImageUpdate/ImageUpdate'
import ModalDatePicker from '../../Pub/ModalDatePicker/ModalDatePicker'
import ActivityController from "./ActivityController";

const Width = Dimensions.get('window').width;

export default class ActivityAddExec extends Component {

    static defaultProps = {
        activityData: {
            mktActivityName: "活动名称",
            mktActivityTheme: "活动主题",
            activitySlogan: "活动口号",
            ourParticipants: "活动人物",
            startDate: "起始日期",
            endDate: "结束日期",
            mktExecContent: [
                {
                    recordDate: "记录日期",
                    mktExecContent: "活动记录",
                    image: []
                }
            ]
        },
        mktActivityId: "",
        physicalName: "",
        ourParticipants: "",
    };

    constructor(props) {
        super(props);
        this.state = {
            imageSourceArray: [],//点击图片时由 ImageUpdate 组件中将 imageSource 数组传入此页面中
            contentOffsetY: 0,
            mktExecDate: ModalDatePicker.getCurrentDate("day"),
            mktExecContent: "",
            modalVisible: false,
        };
        this.activityController = new ActivityController(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <Indicator
                    visible={this.state.modalVisible}
                    text="提交中"
                />
                <NavigationBar
                    title="补充活动"
                    isRightButtonText={true}
                    rightButtonIcon="提交"
                    onPressRightIcon={()=>this.activityController.addExecInfo()}
                    {...this.props}
                />
                <ScrollView
                    bounces={false}
                    contentContainerStyle={styles.scrollView}
                >
                    {/* 活动标题 */}
                    <View
                        style={[styles.infoView, {borderBottomWidth: 2, borderColor: "#F7F7F7", paddingVertical: 10}]}>
                        <View style={{height: 30, width: 5, backgroundColor: 'orange'}}/>
                        <Text
                            style={[styles.titleText, {fontSize: 18}]}>{this.props.activityData.mktActivityName}</Text>
                    </View>
                    {/* 主题 */}
                    <View style={styles.infoView}>
                        <Text style={styles.titleText}>
                            主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题&nbsp;&nbsp;:</Text>
                        <Text style={styles.infoText}>{this.props.activityData.mktActivityTheme}</Text>
                    </View>
                    {/* 物理网格 */}
                    <View style={styles.infoView}>
                        <Text style={styles.titleText}>物理网格&nbsp;&nbsp;:</Text>
                        <Text style={styles.infoText}>{this.props.physicalName}</Text>
                    </View>
                    {/* 时间 */}
                    <View style={styles.infoView}>
                        <Text style={styles.titleText}>
                            时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间&nbsp;&nbsp;:</Text>
                        <ModalDatePicker
                            type='day'
                            minDate='20170101'
                            maxDate='20171230'
                            selectedValue={this.state.mktExecDate}
                            callbackPickerValue={(callbackPickerValue)=>this.setState({
                                mktExecDate: callbackPickerValue,
                            })}
                            textStyle={styles.titleText}
                            viewStyle={styles.dataPickerStyle}
                        />
                    </View>
                    {/* 参与人 */}
                    <View style={styles.infoView}>
                        <Text style={styles.titleText}>参&nbsp;&nbsp;与&nbsp;&nbsp;人&nbsp;&nbsp;:</Text>
                        <TextInput style={styles.textInputStyle}
                                   returnKeyType="done"
                                   clearButtonMode="always"
                                   underlineColorAndroid="transparent"
                                   onChangeText={(ourParticipants)=>this.setState({
                                       ourParticipants: ourParticipants,
                                   })}
                        >
                        </TextInput>
                    </View>
                    {/* 备注+请说点什么吧.. */}
                    <View style={styles.infoView}>
                        <Text style={styles.titleText}>
                            备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注&nbsp;&nbsp;:</Text>
                    </View>
                    <TextInput style={styles.remarkTextInputStyle}
                               placeholder="请说点什么吧..."
                               returnKeyType="done"
                               numberOfLines={40}
                               multiline={true}
                    >
                    </TextInput>
                    <ImageUpdate
                        showImgNums={4}
                        {...this.props}
                    />
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    scrollView: {
        marginLeft: 20,
    },
    infoView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    titleText: {
        fontSize: 15,
        marginLeft: 5,
        color: "#666",
    },
    infoText: {
        fontSize: 15,
        marginLeft: 5,
        color: "#666",
    },
    dataPickerStyle: {
        borderWidth: 1,
        borderColor: "#F7F7F7",
        width: Width * 0.6,
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        marginLeft: 5,
    },
    textInputStyle: {
        color: '#666',
        fontSize: 15,
        borderWidth: 1,
        borderColor: "#F7F7F7",
        width: Width * 0.6,
        height: 40,
        borderRadius: 5.0,
        marginLeft: 5,
        textAlign: 'center',
    },
    remarkTextInputStyle: {
        color: '#666',
        fontSize: 15,
        borderWidth: 1,
        borderColor: '#F7F7F7',
        width: Width * 0.9,
        height: 120,
        marginTop: 5
    }
});