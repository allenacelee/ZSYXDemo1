/**
 * =========================================================================
 *
 * @file ReturnVisitListView
 * @description 客户回访列表视图公共页面
 * =========================================================================
 *
 * @author linzixiong
 * @date 2017/2/28
 * @version 1.0
 * =========================================================================
 */


import React, {Component} from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    View,
    ListView
} from 'react-native';
import NavigationBar from '../../Pub/NavigationBar/NavigationBar'
import testList from './test_return_visit_list_view.json'
import ReturnVisitListViewComponent from './ReturnVisitListViewComponent'
import DetailOperateComponent from './DetailOperateComponent'
import ReturnVisitRegiste from './ReturnVisitRegiste'

export default class ReturnVisitListView extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(testList.viewList)
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title="客户回访"
                    {...this.props}
                />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                />
            </View>
        )
    }

    renderRow(rowData) {
        return (
            <View>
                <TouchableOpacity onPress={() => this.props.navigator.push({
                    component: ReturnVisitRegiste
                })}>
                    <ReturnVisitListViewComponent
                        rowData={rowData}
                    />
                </TouchableOpacity>
                <DetailOperateComponent />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});
