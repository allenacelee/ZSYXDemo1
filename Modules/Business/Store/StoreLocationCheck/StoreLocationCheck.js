/**
 * =========================================================================
 *
 * @file StoreLocationCheck
 * @description 门店位置采集审核功能点入口页面
 * =========================================================================
 *
 * @author linzixiong
 * @date 2017/3/20
 * @version 1.0
 * =========================================================================
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ListView,
    TouchableOpacity,
} from 'react-native';

import NavigationBar from '../../../Pub/NavigationBar/NavigationBar';
import testList from './fitment_accept_test.json';
import FitmentAcceptComponent from './FitmentAcceptComponent';
export default class StoreLocationCheck extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(testList.fitment_accept_test)
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title="装修任务"
                    {...this.props}
                />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    enableEmptySections={true}
                />
            </View>
        )
    }

    renderRow(rowData) {
        return (
            <TouchableOpacity
                onPress={()=>{alert("test")}}
            >
                <FitmentAcceptComponent
                    rowData={rowData}
                />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
    }
});