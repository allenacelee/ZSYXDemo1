/**
 * =========================================================================
 *
 * @file【公共组件】图片预览
 * @description 通过传入图片数组进行图片预览功能
 * =========================================================================
 *
 * @param imageSourceArray:[], //图片资源数组
 * @param clickItemIndex:0,    //被点击的图片的下标
 * =========================================================================
 *
 * @author wanghai
 * @date 2016/12/8
 * @version 1.0
 * =========================================================================
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Dimensions,
} from 'react-native';

// 缩放视图
import PhotoView from 'react-native-photo-view';
// 导航栏
import NavigationBar from '../NavigationBar/NavigationBar'


const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

export default class ImagePreview extends Component {
    static defaultProps = {
        imageSourceArray: [], //图片资源数组
        clickItemIndex: 0,    //被点击的图片的下标
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            index: this.props.clickItemIndex + 1
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.state.index + '/' + this.props.imageSourceArray.length}
                    //backgroundColor = "black"
                    {...this.props}
                />
                <ScrollView
                    ref={(scrollView)=>this.scrollView = scrollView}
                    contentContainerStyle={[styles.ScrollViewStyle, {width: Width * this.props.imageSourceArray.length}]}
                    horizontal={true}
                    onMomentumScrollEnd={this.onScrollAnimationEnd}
                    pagingEnabled={true}
                    contentOffset={{x: this.props.clickItemIndex * Width, y: 0}}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    {this.renderPicView()}
                </ScrollView>
            </View>
        )
    }

    componentDidMount() {
        // 由于Android的ScrollView暂时没有contentOffset属性，Android使用scrollTo实现跳转到相应图片
        if (this.props.clickItemIndex != 0) {
            setTimeout(()=> {
                if (__ANDROID__) {
                    this.scrollView.scrollTo({x: Width * this.props.clickItemIndex, y: 0});
                }
            }, 1)
        }
    }

    //scrollView 滚动动画结束调用次方法
    onScrollAnimationEnd = (scrollView)=> {
        // 当前页码
        var currentPage = Math.floor(scrollView.nativeEvent.contentOffset.x / Width);
        // 更新状态机
        this.setState({
            index: currentPage + 1
        })
    };

    renderPicView() {
        var ItemArray = [];
        for (let i = 0; i < this.props.imageSourceArray.length; i++) {
            ItemArray.push(
                <PhotoView
                    source={this.props.imageSourceArray[i]}
                    minimumZoomScale={1}
                    maximumZoomScale={3}
                    androidScaleType="center"
                    onLoad={()=>this.onLoadImage.bind(this)}
                    style={{width: Width}}
                    key={i}
                />
            )
        }
        return ItemArray;
    }

    onLoadImage() {

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    ScrollViewStyle: {
        height: Height - 64,//Width*2/3
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
