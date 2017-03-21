/**
 * =========================================================================
 *
 * @file StoreLocation
 * @description 门店位置采集功能点入口页面
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
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationBar from '../../../Pub/NavigationBar/NavigationBar';
import ModalDropPicker from '../../../Pub/ModalDropPicker/ModalDropPicker'

import StoreController from '../StoreController';
import StoreLocationComponent from './StoreLocationComponent';

const {width} = Dimensions.get("window");
export default class StoreLocation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            searchTypeId: "0010",
            dataSource: [],
            modalVisible: false,
        };
        this.storeController = new StoreController(this);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2});
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title="门店位置采集"
                    {...this.props}
                />
                <ModalDropPicker
                    modalVisible={this.state.modalVisible}
                    selectedValue={this.state.searchTypeId}
                    labelArray={["渠道编码", "门店名称", "门店地址", "大区", "分局"]}
                    valueArray={["0010", "0020", "0030", "0040", "0050"]}
                    callbackPickerValue={(data)=>this.setState({
                        searchTypeId: data,
                        modalVisible: false,
                    })}
                />
                <View style={styles.topView}>
                    <TouchableWithoutFeedback onPress={()=>this.setState({
                        modalVisible: true,
                    })}>
                        <View style={styles.modalPickerView}>
                            <Text
                                style={styles.modalPickerText}>{["渠道编码 ", "门店名称 ", "门店地址 ", "大区 ", "分局 "][["0010", "0020", "0030", "0040", "0050"].indexOf(this.state.searchTypeId)]}</Text>
                            <Icon name='caret-down' color='#666' size={18}/>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.searchView}>
                        <TextInput style={styles.searchTextInput}
                                   returnKeyType="done"
                                   underlineColorAndroid="transparent"
                                   placeholder={`请输入${["渠道编码", "门店名称", "门店地址", "大区", "分局"][["0010", "0020", "0030", "0040", "0050"].indexOf(this.state.searchTypeId)]}检索`}
                                   onChangeText={(searchText)=>this.setState({
                                       searchText: searchText,
                                   })}
                        >
                        </TextInput>
                        <TouchableOpacity
                            onPress={()=>this.storeController.storeLocationQuery(this.state.searchTypeId, this.state.searchText)}>
                            <Icon name={"search"} size={25} color="orange"/>
                        </TouchableOpacity>
                    </View>
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
        this.storeController.storeLocationQuery(this.state.searchTypeId, this.state.searchText);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.searchTypeId == this.state.searchTypeId && nextState.workName == this.state.workName) {
            return true;
        } else {//修改查询类型
            this.storeController.storeLocationQuery(nextState.searchTypeId, this.state.searchText);
            return true;
        }
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity
                onPress={()=>this.storeController.goToStoreEvaluateInfo(rowData)}
            >
                <StoreLocationComponent
                    rowData={rowData}
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
    topView: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: "#E7E7E7",
        width: width * 0.95,
        height: 45,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
        marginVertical: 10,

    },
    searchView: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingLeft: 5,
    },
    searchTextInput: {
        width: width * 0.5,
        color: '#666',
    },
    modalPickerView: {
        alignItems: 'center',
        width: 90,
        borderRightWidth: 1,
        borderColor: '#E7E7E7',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    modalPickerText: {
        fontSize: 15,
        color: '#666'
    },
});
