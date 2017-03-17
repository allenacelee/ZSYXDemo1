/**
 * =========================================================================
 *
 * @file ActivityListCell
 * @description 活动列表中每个活动公共组件
 * =========================================================================
 *
 * @author linzixiong
 * @date 2017/2/20
 * @version 1.0
 * =========================================================================
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
} from 'react-native';
import ActivityController from "./ActivityController";

const {width} = Dimensions.get("window");
const height = width * 0.45;

export default class ActivityListComponent extends Component {

    static defaultProps = {
        data: {
            mktActivityId: "3612",
            mktActivityName: "迎元旦",
            physicalName: "中关村石景山园",
            sts: "A",
            startDate: "2014/12/31",
            endDate: "2015/01/09",
            imgUrl: "",
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            name: "",
        };
        this.activityController = new ActivityController(this);
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.data.imgUrl == "" ?
                    <Text style={{fontSize: 35, color: "#A6A6A6"}}>暂无图片</Text>
                    :
                    <Image
                        style={{width: width, height: height}}
                        source={{uri: this.props.data.imgUrl}}
                    />
                }
                <View style={styles.textView}>
                    <View style={{flexDirection: "row"}}>
                        <Text style={styles.titleText} numberOfLines={1}>{this.props.data.mktActivityName}</Text>
                        <Text style={styles.titleText} numberOfLines={1}>{this.props.data.physicalName}</Text>
                    </View>
                    <Text style={styles.dateText}
                          ref="welcome">{this.props.data.startDate}---{this.props.data.startDate}</Text>
                </View>
                <Image
                    source={this.props.data.sts == "A" ? require('../../Img/img/activity_running@3x.png') : require('../../Img/img/activity_done@3x.png')}
                    style={styles.stsImage}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#DFDFDF",
        marginTop: 2,
    },
    textView: {
        flexDirection: "row",
        position: 'absolute',
        bottom: 0,
        width: width,
        height: 35,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.6)"
    },
    stsImage: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    titleText: {
        color: "orange",
        marginLeft: 10,
        width:(width-115-10-10-10-10)/2,//(屏宽-日期显示最大宽度(115)-左边位移(10+10)-右边位移(10)-文字间距(5+5))/2
    },
    dateText: {
        color: "white",
        fontSize: 10,
        marginRight: 10,
    },
});
