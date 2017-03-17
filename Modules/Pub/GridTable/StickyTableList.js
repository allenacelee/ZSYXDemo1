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
    Platform
} from 'react-native';

export default class StickyTableList extends Component {
    static defaultProps = {
        callBackStickyListView: null,
        scrollListView: null,
        dataSource: [],
        stickyDataNameArray: [],
        stickyTitleWidthArray: [],
    }

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.props.dataSource),
            stickyDataNameArray: this.props.stickyDataNameArray,
            stickyTitleWidthArray: this.props.stickyTitleWidthArray,
        };
    }

    componentWillReceiveProps(nextProps) {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows(nextProps.dataSource),
            stickyDataNameArray: nextProps.stickyDataNameArray,
            stickyTitleWidthArray: nextProps.stickyTitleWidthArray,
        })

    }

    render() {
        return (
            <ListView
                ref={(stickyListView)=>this.stickyListView = stickyListView}
                dataSource={this.state.dataSource}
                renderRow={(rowData) => this.renderRow(rowData)}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                enableEmptySections={true}
                bounces={false}//ios取消边界弹性拉动
                initialListSize={100}
            />
        );
    }

    componentDidMount() {
        this.props.callBackStickyListView(this.stickyListView);
        setTimeout(()=>{
            var stickyListView = this.stickyListView;
            var scrollListView = this.props.scrollListView;
            y = scrollListView.scrollProperties.offset;
            if (__IOS__) {
                stickyListView.setNativeProps({
                    contentOffset: {x: 0, y: y}
                });
            } else {
                stickyListView.scrollTo({x: 0, y: y});
            }
        },0)

    }

    renderRow(rowData) {
        var returnArray = [];
        var stickyDataNameArray = this.state.stickyDataNameArray;
        var stickyTitleWidthArray = this.state.stickyTitleWidthArray;
        for (var i = 0; i < stickyDataNameArray.length; i++) {
            returnArray.push(
                <View style={[styles.dataCellViewStyle, {width: stickyTitleWidthArray[i]}]}
                      key={i}><Text>{rowData[stickyDataNameArray[i]]}</Text></View>
            )
        }
        return (
            <View style={styles.dataViewStyle}>
                {returnArray}
            </View>
        );
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
