/**
 * =========================================================================
 *
 * @file ActivityInfoExceComponent
 * @description 活动信息中活动记录公共组件
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
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import ActivityController from "./ActivityController";
import ImagePreview from "../../Pub/ImagePreview/ImagePreview";

const {width} = Dimensions.get("window");

export default class ActivityInfoExceComponent extends Component {

    static defaultProps = {
        data: {
            recordDate: "日期",
            mktExecContent: "活动执行内容",
            image: []
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
                <Text style={styles.recordDate}>{this.props.data.recordDate}</Text>
                <View style={styles.mktExecContentView}>
                    <Text style={{}}>{this.props.data.mktExecContent}</Text>
                    <ScrollView
                        contentContainerStyle={styles.ImageScrollView}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {this.renderImageView()}
                    </ScrollView>
                </View>
            </View>
        )
    }

    renderImageView() {
        let imageUrl = this.props.data.image;
        // 构建图片数组便于预览图片使用
        let imageSourceArray = [];
        for (let j = 0; j < imageUrl.length; j++) {
            imageSourceArray.push(
                {uri: imageUrl[j], isStatic: true}
            )
        }
        // 构建返回数组，用于显示缩略图
        let returnList = [];
        for (let i = 0; i < imageUrl.length; i++) {
            returnList.push(
                <TouchableOpacity
                    key={i}
                    //style={[styles.imageStyle, {marginRight: 0}]}
                    onPress={()=>this.props.navigator.push({
                        component: ImagePreview,
                        params: {
                            imageSourceArray: imageSourceArray,
                            clickItemIndex: i,
                        }
                    })}>
                    <Image style={styles.imageStyle} source={{uri: imageUrl[i]}}/>
                </TouchableOpacity>
            )
        }
        return returnList;
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingLeft: 5,
        paddingRight: 5,
        borderBottomWidth: 2,
        borderColor: "#F7F7F7",
    },
    ImageScrollView: {
        alignItems: 'center',
        paddingTop: 10,
    },
    recordDate: {
        color: 'orange',
        fontSize: 20,
        width: width * 0.25,
        textAlign: 'center',
    },
    mktExecContentView: {
        flex: 1,
    },
    imageStyle: {
        width: width * 0.2,
        height: width * 0.2,
        marginRight: 5,
    }
});
