/**
 * =========================================================================
 *
 * @file StoreEvaluate
 * @description 门店评级功能点入口页面
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
    TextInput,
    Dimensions,
    ListView,
    TouchableOpacity,
    Text,
} from 'react-native';

import NavigationBar from '../../../Pub/NavigationBar/NavigationBar';
import StoreEvaluateComponent from './StoreEvaluateComponent';
import StoreController from '../StoreController';
import testList from './store_evaluate_test.json'

const {width} = Dimensions.get("window");
export default class StoreEvaluate extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(testList.store_evalueate_test),
            taskName: ""
        };
        this.storeController = new StoreController(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title="门店评级"
                    {...this.props}
                />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                />
            </View>
        )
    }
    renderRow(rowData){
        return(
            <TouchableOpacity onPress={() => alert("test")}>
                <StoreEvaluateComponent rowData={rowData}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
});
