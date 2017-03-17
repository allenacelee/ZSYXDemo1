/**
 * =========================================================================
 *
 * @file ActivityInfo
 * @description 活动详情页面
 * =========================================================================
 *
 * @author linzixiong
 * @date 2017/2/23
 * @version 1.0
 * =========================================================================
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
} from 'react-native';
import NavigationBar from '../../Pub/NavigationBar/NavigationBar'
import ActivityController from "./ActivityController";
import ActivityInfoExceComponent from "./ActivityInfoExceComponent";

export default class ActivityInfo extends Component {
    static defaultProps = {
        mktActivityId: "",
        mktActivityName: "",
        physicalName: "",
    };

    constructor(props) {
        super(props);
        this.state = {
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
        };
        this.activityController = new ActivityController(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.props.mktActivityName}
                    rightButtonIcon="plus"
                    onPressRightIcon={()=>this.activityController.addExecContent()}
                    {...this.props}
                />
                <ScrollView
                    style={{flex: 1}}
                >
                    {/*物理网格名称*/}
                    <View style={styles.physicalNameView}>
                        <Text style={{color: 'orange', fontSize: 18}}>{this.props.physicalName}</Text>
                    </View>
                    {/*活动信息*/}
                    <View style={styles.activityInfoView}>
                        <View style={styles.activityInfoTextView}>
                            <Text style={styles.activityInfoTitleText}>主题 : </Text>
                            <Text style={styles.activityInfoText}>{this.state.activityData.mktActivityTheme}</Text>
                        </View>
                        <View style={styles.activityInfoTextView}>
                            <Text style={styles.activityInfoTitleText}>时间 : </Text>
                            <Text
                                style={styles.activityInfoText}>{this.state.activityData.startDate}--{this.state.activityData.endDate}</Text>
                        </View>
                        <View style={styles.activityInfoTextView}>
                            <Text style={styles.activityInfoTitleText}>口号 : </Text>
                            <Text style={styles.activityInfoText}>{this.state.activityData.activitySlogan}</Text>
                        </View>
                        <View style={styles.activityInfoTextView}>
                            <Text style={styles.activityInfoTitleText}>人物 : </Text>
                            <Text
                                style={[styles.activityInfoText]}>{this.state.activityData.ourParticipants}</Text>
                        </View>
                    </View>
                    {/*活动执行记录*/}
                    {this.renderExecContent()}
                </ScrollView>
            </View>
        )
    }

    componentDidMount() {
        // this.activityController.queryActivityInfo(this.props.mktActivityId);
        this.activityController.queryActivityInfoOffline(); //离线测试
    }

    renderExecContent() {
        let mktExecContent = this.state.activityData.mktExecContent;
        let returnList = [];
        for (let i = 0; i < mktExecContent.length; i++) {
            returnList.push(
                <ActivityInfoExceComponent
                    data={mktExecContent[i]}
                    key={i}
                    {...this.props}
                />
            )
        }
        return returnList;
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    physicalNameView: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: "#F7F7F7",
        paddingVertical: 10,
    },
    activityInfoView: {
        justifyContent: 'center',
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderColor: "#F7F7F7",
        marginLeft: 20,
        marginRight: 5,
    },
    activityInfoTitleText: {
        marginVertical: 5,
        fontSize: 15,
        paddingRight: 10,
    },
    activityInfoText: {
        marginVertical: 5,
        fontSize: 15,
        paddingRight: 10,
        flex: 1,
    },
    activityInfoTextView: {
        flexDirection: 'row',
    }

});
