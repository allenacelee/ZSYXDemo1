/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
} from 'react-native';

export default class ScrollTableList extends Component {
    static defaultProps = {
        callBackScrollListView: null,
        stickyListView: null,
        dataSource: [],
        scrollDataNameArray: [],
        scrollTitleWidthArray: [],
        stickyColumnNumber: 0,
        isTouchable: false,
        callBackRowData: null,
    };

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.props.dataSource),
            scrollDataNameArray: this.props.scrollDataNameArray,
            scrollTitleWidthArray: this.props.scrollTitleWidthArray,
        };
    }

    componentWillReceiveProps(nextProps) {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows(nextProps.dataSource),
            scrollDataNameArray: nextProps.scrollDataNameArray,
            scrollTitleWidthArray: nextProps.scrollTitleWidthArray,
        })
    }

    render() {
        return (
            <ListView
                ref={(scrollListView)=>this.scrollListView = scrollListView}
                dataSource={this.state.dataSource}
                renderRow={(rowData) => this.renderRow(rowData)}
                enableEmptySections={true}
                bounces={false}//ios取消边界弹性拉动
                onScroll={()=> {
                    this.props.stickyColumnNumber == 0 ? {} : this.onScroll()
                }}
                initialListSize={100}
            />
        );
    }

    componentDidMount() {
        this.props.callBackScrollListView(this.scrollListView);
    }

    renderRow(rowData) {
        let returnArray = [];
        let scrollDataNameArray = this.state.scrollDataNameArray;
        let scrollTitleWidthArray = this.state.scrollTitleWidthArray;
        for (let i = 0; i < scrollDataNameArray.length; i++) {
            returnArray.push(
                <View style={[styles.dataCellViewStyle, {width: scrollTitleWidthArray[i]}]} key={i}>
                    <Text>{rowData[scrollDataNameArray[i]]}</Text>
                </View>
            )
        }
        if (this.props.isTouchable) {
            return (
                <TouchableOpacity onPress={()=>this.props.callBackRowData(rowData)}>
                    <View style={styles.dataViewStyle}>
                        {returnArray}
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <View style={styles.dataViewStyle}>
                    {returnArray}
                </View>
            )
        }

    }

    onScroll() {
        var stickyListView = this.props.stickyListView;
        var scrollListView = this.scrollListView;
        y = scrollListView.scrollProperties.offset;
        if (__IOS__) {
            stickyListView.setNativeProps({
                contentOffset: {x: 0, y: y}
            });
        } else {
            stickyListView.scrollTo({x: 0, y: y});
        }
    }
}

const styles = StyleSheet.create({
    dataViewStyle: {
        flexDirection: 'row',
        height: 40
    },
    dataCellViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'gray',
    }
});
