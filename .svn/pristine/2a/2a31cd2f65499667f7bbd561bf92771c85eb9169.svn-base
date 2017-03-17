/**
 * =========================================================================
 *
 * @file【公共组件】可冻结行列报表
 * @description 可根据入参冻结相应列数
 * =========================================================================
 *
 * @param titleArray: [],         //标题数组
 * @param titleWidthArray: [],    //标题宽度数组
 * @param titleHeight: 40,        //标题高度，默认为40
 * @param dataSource: [],         //JSON数据源
 * @param dataNameArray: [],      //数据名数组
 * @param stickyColumnNumber: 0,  //冻结列数
 * @param isMultipleHeader: false,//是否多行表头
 * =========================================================================
 *
 * @example ./GridTableDemo.js
 * @example ./MultipleGridTableDemo.js
 * @todo 需要实现冻结列可滑动
 *
 * @author linzixiong
 * @date 2016/12/8
 * @version 1.0
 * =========================================================================
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import ScrollTableList from './ScrollTableList'
import StickyTableList from './StickyTableList'

export default class GridTable extends Component {
    static defaultProps = {
        titleArray: [],         //标题数组
        titleWidthArray: [],    //标题宽度数组
        titleHeight: 40,        //标题高度，默认为40

        dataSource: [],         //JSON数据源
        dataNameArray: [],      //数据名数组

        stickyColumnNumber: 0,  //默认冻结列数

        isMultipleHeader: false,//是否多行表头

        isTouchable: false,//是否可以行点击并回传
        onTouchable: null,//当点击行时回传行对象
    };

    constructor(props) {
        super(props);
        //多行表头处理数据宽度
        let titleWidthArray = [];
        if (this.props.isMultipleHeader) {
            let propsTitleWidthArray = this.props.titleWidthArray;
            for (let i = 0; i < propsTitleWidthArray.length; i++) {
                if (typeof propsTitleWidthArray[i] == "object") {
                    for (let j = 0; j < propsTitleWidthArray[i].length; j++) {
                        titleWidthArray.push(propsTitleWidthArray[i][j]);
                    }
                } else {
                    titleWidthArray.push(propsTitleWidthArray[i])
                }
            }
        } else {
            titleWidthArray = this.props.titleWidthArray;
        }
        this.state = {
            dataSource: this.props.dataSource,//JSON数据源
            stickyListView: null,       //冻结视图ref
            scrollListView: null,       //可滑动视图ref

            stickyTitleArray: this.props.titleArray.slice(0, this.props.stickyColumnNumber),       //冻结列标题数组
            stickyTitleWidthArray: titleWidthArray.slice(0, this.props.stickyColumnNumber),//冻结列标题宽度数组
            stickyDataNameArray: this.props.dataNameArray.slice(0, this.props.stickyColumnNumber),//冻结列数据名数组

            scrollTitleArray: this.props.titleArray.slice(this.props.stickyColumnNumber),//可滑动数据标题数组
            scrollTitleWidthArray: titleWidthArray.slice(this.props.stickyColumnNumber),//可滑动数据标题宽度数组
            scrollDataNameArray: this.props.dataNameArray.slice(this.props.stickyColumnNumber),//可滑动数据名数组

            stickyColumnNumber: this.props.stickyColumnNumber,//冻结列数

            animating: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            animating: nextProps.dataSource === this.props.dataSource ? false : true,//若更改冻结列则不显示加载指示器

            //改为不可第二次修改表头及宽度信息
            //stickyTitleArray: nextProps.titleArray.slice(0, nextProps.stickyColumnNumber),       //冻结列标题数组
            //stickyTitleWidthArray: titleWidthArray.slice(0, nextProps.stickyColumnNumber),//冻结列标题宽度数组
            //stickyDataNameArray: nextProps.dataNameArray.slice(0, nextProps.stickyColumnNumber),//冻结列数据名数组

            //scrollTitleArray: nextProps.titleArray.slice(nextProps.stickyColumnNumber),//可滑动数据标题数组
            //scrollTitleWidthArray: titleWidthArray.slice(nextProps.stickyColumnNumber),//可滑动数据标题宽度数组
            //scrollDataNameArray: nextProps.dataNameArray.slice(nextProps.stickyColumnNumber),//可滑动数据名数组

            stickyColumnNumber: nextProps.stickyColumnNumber,//冻结列数
        });
        setTimeout(()=>this.setState({dataSource: nextProps.dataSource, animating: false,}), 0);//JSON数据源、取消显示加载指示器
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <View style={{flexDirection: 'row', flex: this.state.dataSource.length == 0 ? 0 : 1}}>
                    {/*冻结列数据*/}
                    {this.renderStickyColumnView(this.state.stickyTitleArray, this.state.stickyTitleWidthArray, this.state.stickyDataNameArray, this.state.dataSource)}

                    {/*整体数据*/}
                    <ScrollView
                        contentContainerStyle={styles.ScrollViewContentContainerStyle}
                        horizontal={true}
                        bounces={false}//ios取消边界弹性拉动
                    >
                        <View style={styles.containerView}>
                            {/*上部标题行*/}
                            {this.renderTableTitleView(this.state.scrollTitleArray, this.state.scrollTitleWidthArray)}
                            {/*数据*/}
                            <ScrollTableList
                                callBackScrollListView={(scrollListView)=>this.setState({scrollListView: scrollListView})}
                                stickyListView={this.state.stickyListView}//锁定列ref
                                dataSource={this.state.dataSource}//数据源
                                scrollDataNameArray={this.state.scrollDataNameArray}//可滑动数据名数组
                                scrollTitleWidthArray={this.state.scrollTitleWidthArray}//可滑动数据标题宽度数组
                                stickyColumnNumber={this.props.stickyColumnNumber}
                                isTouchable={this.props.isTouchable}
                                callBackRowData={(rowData)=>this.props.onTouchable(rowData)}
                            />
                        </View>
                    </ScrollView>
                </View>
                {/*指示器*/}
                {this.state.animating ? (<View style={styles.centering}>
                    <ActivityIndicator
                        animating={this.state.animating}
                        size="large"
                    />
                </View>) : (<View></View>)}
            </View>
        )
    }

    //冻结列数据
    renderStickyColumnView(stickyTitleArray, stickyTitleWidthArray, stickyDataNameArray, dataSource) {
        if (this.props.stickyColumnNumber == 0 || this.props.stickyColumnNumber == null) {
            return
        } else {
            return (
                <View style={styles.stickyColumnViewStyle}>
                    {/*标题*/}
                    {this.renderTableTitleView(stickyTitleArray, stickyTitleWidthArray)}
                    {/*数据*/}
                    <StickyTableList
                        callBackStickyListView={(callBackStickyListView)=>this.setState({stickyListView: callBackStickyListView})}
                        scrollListView={this.state.scrollListView}//滑动数据ref
                        dataSource={this.state.dataSource}//数据源
                        stickyDataNameArray={this.state.stickyDataNameArray}//冻结列数据名数组
                        stickyTitleWidthArray={this.state.stickyTitleWidthArray}//冻结列标题宽度数组
                    />
                </View>
            )
        }
    }

    //获取标题函数
    renderTableTitleView(titleArray, titleWidthArray) {
        //定义空数组
        let returnArray = [];
        if (this.props.isMultipleHeader) {  //多行表头
            //遍历标题
            let index = 0;
            for (let i = 0; i < titleArray.length; i++, index++) {
                if (titleArray[i].includes(':')) {
                    //数据类型为："总完成量:1日,2日,3日,4日,5日,6日,7日,8日,9日"

                    //数据处理
                    let titles = titleArray[i].split(':');
                    let topTitle = titles[0];
                    let bottomTitle = titles[1].split(',');

                    //定义空数组放置下部标题视图
                    let bottomTitleArray = [];
                    //总宽度
                    let topTitleWidth = 0;
                    //遍历下部标题
                    for (let j = 0; j < bottomTitle.length; j++, index++) {
                        bottomTitleArray.push(
                            <View style={[styles.titleTextViewStyle, {width: titleWidthArray[index]}]} key={j}>
                                <Text style={styles.titleTextStyle}>{bottomTitle[j]}</Text>
                            </View>
                        );
                        //计算上部宽度
                        topTitleWidth += titleWidthArray[index];
                    }
                    index--;
                    returnArray.push(
                        <View key={i}>
                            <View style={[styles.titleTextViewStyle, {
                                width: topTitleWidth,
                                height: this.props.titleHeight / 2
                            }]}>
                                <Text style={styles.titleTextStyle}>{topTitle}</Text>
                            </View>
                            <View style={{flexDirection: 'row', height: this.props.titleHeight / 2}}>
                                {bottomTitleArray}
                            </View>
                        </View>
                    )
                } else {
                    //普通数据类型
                    returnArray.push(
                        <View style={[styles.titleTextViewStyle, {width: titleWidthArray[index]}]} key={i}>
                            <Text style={styles.titleTextStyle}>{titleArray[i]}</Text>
                        </View>
                    )
                }
            }
            return (
                <View style={{flexDirection: 'row', height: this.props.titleHeight}}>{returnArray}</View>
            )
        } else {
            //遍历标题
            for (let i = 0; i < titleArray.length; i++) {
                returnArray.push(
                    <View style={[styles.titleTextViewStyle, {width: titleWidthArray[i]}]} key={i}>
                        <Text style={styles.titleTextStyle}>{titleArray[i]}</Text>
                    </View>
                )
            }
            return (
                <View style={{flexDirection: 'row', height: this.props.titleHeight}}>{returnArray}</View>
            )
        }

    }
}

const styles = StyleSheet.create({
    container: {},
    ScrollViewContentContainerStyle: {},
    containerView: {},
    titleTextViewStyle: {
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'gray',
        flex: 1,

    },
    titleTextStyle: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold'
    },
    stickyColumnViewStyle: {
        //backgroundColor: 'red',
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
});
