/**
 * =========================================================================
 *
 * @file CheckTaskInfoTabPhoto
 * @description 巡店任务功能点巡店执行页面Tab页面巡店照片
 * =========================================================================
 *
 * @author linzixiong
 * @date 2017/3/6
 * @version 1.0
 * =========================================================================
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    ScrollView,
    Image,
} from 'react-native';

import CheckController from '../CheckController';

//测试数据
const test_title_array = ["门头照片", "营业时间牌", "店内照片", "其他"];
const test_image_array = ["http://www.hbgl.com.cn/uploadfile/2014/0503/1061129.jpg", "http://www.hbgl.com.cn/uploadfile/2014/0503/1061126.jpg", "", "http://www.hbgl.com.cn/uploadfile/2014/0503/1061127.jpg"];

const {width} = Dimensions.get("window");

export default class CheckTaskInfoTabPhoto extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.checkController = new CheckController(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {this.renderItem()}
                </ScrollView>
            </View>
        )
    }

    renderItem() {
        let result = [];
        let titleArray = test_title_array;
        let imageArray = test_image_array;
        for (let i = 0; i < titleArray.length; i++) {
            if (imageArray[i] == "") {
                result.push(
                    <View style={styles.componentView} key={i}>
                        <Text>{titleArray[i]}:</Text>
                        <View style={styles.bottomView}>
                            <View style={styles.noImageView}>
                                <Text style={{fontSize: 25, color: "#A6A6A6"}}>暂无图片</Text>
                            </View>
                        </View>
                    </View>
                )
            } else {
                result.push(
                    <View style={styles.componentView} key={i}>
                        <Text>{titleArray[i]}:</Text>
                        <View style={styles.bottomView}>
                            <View style={styles.noImageView}>
                                <Image style={styles.noImageView} source={{uri: imageArray[i]}}/>
                            </View>
                        </View>
                    </View>
                )
            }
        }
        return result

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: width,
    },
    componentView: {
        width: width,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    bottomView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonView: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        height: width * 0.6 * 0.7,
    },
    button: {
        width: width * 0.25,
        height: 25,
        backgroundColor: '#00B1F0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    noImageView: {
        width: width * 0.6,
        height: width * 0.6 * 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#DFDFDF"
    }
});