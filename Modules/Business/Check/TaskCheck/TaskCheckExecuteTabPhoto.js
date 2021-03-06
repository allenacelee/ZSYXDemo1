/**
 * =========================================================================
 *
 * @file TaskCheckExecuteTabPhoto
 * @description 任务巡店功能点巡店执行页面Tab页面拍照上传
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
    Button,
    Dimensions,
    Text,
    ScrollView,
} from 'react-native';

import CheckController from '../CheckController';
import ImageUpdate from '../../../Pub/ImageUpdate/ImageUpdate';

//测试数据
const test_array = ["门头照片", "营业时间牌", "店内照片", "其他"];

const {width} = Dimensions.get("window");

export default class TaskCheckExecuteTabPhoto extends Component {
    static defaultProps = {
        selectedData: {},
        callbackData: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedData: props.selectedData,
            imageData: {
                0: [],
                1: [],
                2: [],
                3: [],
            },//临时数组 todo
        };
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
        for (let i = 0; i < test_array.length; i++) {
            result.push(
                <View style={styles.componentView} key={i}>
                    <Text style={{width: 20, fontSize: 16, marginRight: 8}}>{test_array[i]}</Text>
                    <ImageUpdate
                        showImgNum={1}
                        selectedImageArray={this.state.imageData[i]}
                        callbackImageArray={(imageArray)=> {
                            let imageData = this.state.imageData;
                            imageData[i] = imageArray;
                            this.setState({
                                imageData: imageData,
                            })
                        }}
                        {...this.props}
                    />
                </View>
            )
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
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: "#E6E6E6",
    },
    bottomView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    noImageView: {
        width: width * 0.6,
        height: width * 0.6 * 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#DFDFDF"
    }
});