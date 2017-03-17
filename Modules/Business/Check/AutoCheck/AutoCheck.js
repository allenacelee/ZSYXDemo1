/**
 * =========================================================================
 *
 * @file AutoCheck
 * @description 自主巡店功能点入口页面
 * =========================================================================
 *
 * @author linzixiong
 * @date 2017/3/3
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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import NavigationBar from '../../../Pub/NavigationBar/NavigationBar';

import CheckController from '../CheckController';
import AutoCheckComponent from './AutoCheckComponent';

const {width} = Dimensions.get("window");
export default class AutoCheck extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            taskName: "",
        };
        this.checkController = new CheckController(this);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2});
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title="自主巡店"
                    {...this.props}
                />
                <View style={styles.searchView}>
                    <TextInput style={styles.searchTextInput}
                               returnKeyType="done"
                               underlineColorAndroid="transparent"
                               placeholder="请输入门店编码/门店名称"
                               onChangeText={(taskName)=>this.setState({
                                   taskName: taskName,
                               })}
                    >
                    </TextInput>
                    <TouchableOpacity onPress={()=>this.checkController.queryAutoCheckList()}>
                        <Icon name={"search"} size={25} color="orange"/>
                    </TouchableOpacity>
                </View>
                <ListView
                    dataSource={this.ds.cloneWithRows(this.state.dataSource)}
                    renderRow={this.renderRow.bind(this)}
                    style={{flex: 1, width: width}}
                    enableEmptySections={true}
                />
            </View>
        )
    }

    componentDidMount() {
        this.checkController.queryAutoCheckList();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.taskName == this.state.taskName) {
            return true;
        } else {//修改查询类型
            this.checkController.queryAutoCheckList();
            return true;
        }
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity onPress={()=>this.checkController.goToCheck(rowData, true, true)}>
                <AutoCheckComponent
                    rowData={rowData}
                    backgroundColor={rowID % 2 == 1 ? '#F3F3F5' : '#E5EBF5'}
                />
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
    searchView: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: "#E7E7E7",
        width: width * 0.95,
        height: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
        marginVertical: 10,
    },
    searchTextInput: {
        width: width * 0.8,
        color: '#666',
    },
});
