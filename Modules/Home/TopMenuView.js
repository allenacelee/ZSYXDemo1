/**
 * Created by xxx on 16/11/14. 主页上部横向菜单
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

export default class TopMenuView extends Component {

    static defaultProps = {
        dataArray: [],
        callBackClickOnItem: null
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedPage: 0
        }
    };

    render() {
        return (
            <View style={styles.container}>
                {/*** 菜单部分 ***/}
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    onMomentumScrollEnd={this.onScrollAnimationEnd}
                    backgroundColor='white'
                    contentContainerStyle={[styles.scrollViewStyle, {width: width * Math.ceil(this.props.dataArray.length / 4),}]}
                >
                    {this.renderMeunItem()}
                </ScrollView>
                {/*** 分页标识 ***/}
                <View style={styles.IndicatorViewStyle}>
                    {this.renderIndicator()}
                </View>
            </View>
        )
    }

    // ScrollView 滑动一帧结束
    onScrollAnimationEnd = (scrollView)=> {
        // 当前页码
        var currentPage = Math.floor(scrollView.nativeEvent.contentOffset.x / width);
        // 更新状态机
        this.setState({
            selectedPage: currentPage
        });

    }
    //横向菜单Item
    renderMeunItem() {
        // 组件数组
        var itemArray = [];
        // 颜色数组
        var dataArray = this.props.dataArray;
        var reqArray = [];
        var req;
        for (let i = 0; i < dataArray.length; i++) {
            switch (dataArray[i].imgUrl) {
                case 'img/menu_xudun.png':
                    req = require('../Img/img/menu_xudun.png');
                    break;
                case 'img/menu_huifang_1.png':
                    req = require('../Img/img/menu_huifang.png');
                    break;
                case 'img/menu_huodong_1.png':
                    req = require('../Img/img/menu_huodong.png');
                    break;
                case 'img/menu_yonghukapian.png':
                    req = require('../Img/img/menu_yonghukapian.png');
                    break;
                case 'img/menu_xundian@3x.png':
                    req = require('../Img/img/menu_xundian@3x.png');
                    break;
                case 'img/menu_zhuangxiu@3x.png':
                    req = require('../Img/img/menu_zhuangxiu@3x.png');
                    break;
            }
            reqArray.push(req);
        }


        // 便利创建数组
        for (var i = 0; i < dataArray.length; i++) {
            itemArray.push(
                <TouchableOpacity onPress={this.clickOnItem.bind(this, dataArray[i].menuCode)} key={i}>
                    <View style={styles.cellStyle}>{/*{uri:rowData.image}*/}
                        <Image style={{width: 45, height: 45}} source={reqArray[i]}/>
                        <Text style={styles.titleStyle}>{dataArray[i].menuName}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return itemArray;
    }

    clickOnItem(menuCode) {
        this.props.callBackClickOnItem(menuCode);
    }

    // 页码 指示器
    renderIndicator() {
        // 指示器数组
        var indicatorArray = [], style;
        for (var i = 0; i < Math.ceil(this.props.dataArray.length / 4); i++) {
            // 设置圆点样式
            style = (i === this.state.selectedPage) ? {color: 'orange'} : {color: 'gray'}
            indicatorArray.push(
                <Text key={i} style={[{fontSize: 20}, style]}>&bull;</Text>
            );
        }
        return indicatorArray;
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    IndicatorViewStyle: {
        // 主轴横向
        flexDirection: 'row',
        // 水平居中
        justifyContent: 'center',
        alignItems: 'center',

    },
    cellStyle: {
        width: width / 4,
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        marginTop: 15
    },
    titleStyle: {
        marginTop: 10,
        color: 'gray',
        fontSize: 14
    },
    scrollViewStyle: {
        alignItems: 'center',
        flexDirection: 'row',
    }
});