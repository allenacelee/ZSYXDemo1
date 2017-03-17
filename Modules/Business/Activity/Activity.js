/**
 * =========================================================================
 *
 * @file Activity
 * @description 活动功能点入口页面
 * =========================================================================
 *
 * @author linzixiong
 * @date 2017/2/17
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
import NavigationBar from '../../Pub/NavigationBar/NavigationBar'
import ActivityController from "./ActivityController";
import ActivityListComponent from "./ActivityListComponent";

export default class Activity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            dataSource: [],

        };
        this.activityController = new ActivityController(this);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2});
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title="活动列表"
                    {...this.props}
                />
                <View style={{height: 1, backgroundColor: "#DEDEDE"}}>
                </View>
                <ListView
                    dataSource={this.ds.cloneWithRows(this.state.dataSource)}
                    renderRow={this.renderActivityListRow.bind(this)}
                    style={{flex: 1, marginTop: 1}}
                    enableEmptySections={true}
                />
            </View>
        )
    }

    componentDidMount() {
        this.activityController.queryActivityListOffline();
    }

    renderActivityListRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity onPress={()=>this.activityController.activityInfo(rowData)}>
                <ActivityListComponent
                    data={rowData}
                />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
});
