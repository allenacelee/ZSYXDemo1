/**
 * =========================================================================
 *
 * @file ModalAreaPicker 营销单元格
 * @description 联网下钻进行营销单元格查询
 * =========================================================================
 *
 * @requires Picker
 * @requires RootModal
 * @requires CommunicateService
 *
 *
 * @param callbackPickerValue: null,        //【必填】回传值 eg. callbackPickerValue={(data)=>this.setState({
 *                                                                                       areaId: data})}
 * @param pickerTitle: '请选择',             //【可选】标题
 * @param wheelFlex: [1, 1.5, 3],           //【可选】选项比例
 * @param textStyle: {},                    //【可选】文字样式
 * @param viewStyle: {},                    //【可选】View样式
 * =========================================================================
 *
 * @example ModalAreaPickerDemo
 * @todo 修改下钻为异步加载
 *
 * @author linzixiong
 * @date 2017/1/10
 * @version 1.0
 * =========================================================================
 */


import React, {Component} from 'react';
import {
    TouchableWithoutFeedback,
    View,
    Button,
    Text,
    Dimensions,
    Platform,
    Modal,
    ActivityIndicator,
} from 'react-native';
import Picker from 'react-native-picker';
import RootModal from 'react-native-root-modal'
import Indicator from '../Indicator/Indicator'
import CommunicateService from '../../System/Service/CommunicateService'
import tsJson from './Demo/tsconfig.json'

export default class ModalAreaPicker extends Component {
    static defaultProps = {
        pickerTitle: '请选择',//标题
        wheelFlex: [1, 1.5, 3],//选项比例
        callbackPickerValue: null,//回传选择值
        textStyle: {},//文字样式
        viewStyle: {},//View样式
    };

    constructor(props) {
        super(props);
        this.state = {
            areaType: '',
            permissionAreaId: '',
            permissionAreaName: '',
            initModalVisible: true,
            modalVisible: false,
            areaIdArray: [],
            areaNameArray: [],
            title: '北京',
            selectedValue: ["请选择", "请选择", "请选择"],
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
        };
    }

    componentDidMount() {
        //读取登录人信息
        storage.getBatchData([
            {key: 'areaType', id: userId},
            {key: 'permissionAreaId', id: userId},
            {key: 'permissionAreaName', id: userId}]).then(result=> {
            let [areaType,permissionAreaId,permissionAreaName] =result;
            this.setState({
                areaType: areaType,
                permissionAreaId: permissionAreaId,
                permissionAreaName: permissionAreaName,
                title: permissionAreaName,
            });
            //回传areaId
            this.props.callbackPickerValue(permissionAreaId);
            //网络连接获取全部area数据
            // let content = {"permissionAreaId": permissionAreaId, "areaType": areaType};
            // CommunicateService.communicate('appUserAreaListService', 'doGetAllUserAreaList', content)
            //     .then((msg)=> {
            //         this.setState({
            //             areaIdArray: msg.areaIdArray,
            //             areaNameArray: msg.areaNameArray,
            //             initModalVisible: false,
            //         });
            //     });
            //离线测试
            setTimeout(()=> {
                this.setState({
                    areaIdArray: tsJson.areaIdArray,
                    areaNameArray: tsJson.areaNameArray,
                    initModalVisible: false,
                });
            }, 1000);
        });
    }

    render() {
        return (
            <View style={[{alignItems: 'center'}, this.props.viewStyle]}>
                {/*初始化加载数据时的modal*/}
                <Indicator
                    visible={this.state.initModalVisible}
                    text="加载中"
                />
                {__IOS__ ?
                    <RootModal visible={this.state.modalVisible}>
                        <TouchableWithoutFeedback onPress={()=>this.hidePicker()}>
                            <View style={{
                                width: this.state.height,
                                height: this.state.height,
                                backgroundColor: 'rgba(0,0,0,0.5)'
                            }}>
                            </View>
                        </TouchableWithoutFeedback>
                    </RootModal>
                    :
                    <Modal
                        animationType={"fade"}
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={()=>this.hidePicker()}
                    >
                        <TouchableWithoutFeedback onPress={()=>this.hidePicker()}>
                            <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                }
                <Text onPress={()=>this.showPicker()}
                      style={[{color: '#080808'}, this.props.textStyle]}>{this.state.title}</Text>
            </View>
        );
    }

    showPicker() {
        //显示遮罩层
        this.setState({modalVisible: true});
        //初始化Picker
        Picker.init({
            pickerConfirmBtnText: '确认',
            pickerCancelBtnText: '取消',
            pickerTitleText: this.props.pickerTitle,
            pickerData: this.state.areaNameArray,
            selectedValue: this.state.selectedValue,
            onPickerConfirm: (selectedValue, selectedIndex)=> {
                this.onPickerConfirm(selectedValue, selectedIndex)
            },
            onPickerCancel: ()=> {
                this.setState({modalVisible: false})
            },
            wheelFlex: this.props.wheelFlex
        });

        //弹出Picker
        setTimeout(()=> {
            Picker.show();
        }, 10);


    }

    onPickerConfirm(selectedValue, selectedIndex) {
        //根据选择下标解析为areaId和areaName
        let {areaId, areaName}= this.toValue(selectedIndex);
        //回传areaId
        this.props.callbackPickerValue(areaId);
        //修改显示标题、取消遮罩层、修改选中值
        this.setState({
            title: areaName,
            modalVisible: false,
            selectedValue: selectedValue,
        });
    }

    /**
     * 解析areaId和areaName
     * @param selectedIndex
     * @returns {{areaId: string, areaName: string}}
     */
    toValue(selectedIndex) {
        let areaId = '';
        let areaName = '';
        //根据登录人areaType，数据类型不同分情况处理
        switch (this.state.areaType) {
            case '20':
                switch (selectedIndex.indexOf(0)) {
                    case 0:
                        //若每级都选择"请选择"则返回登录人areaId
                        areaId = this.state.permissionAreaId;
                        areaName = this.state.permissionAreaName;
                        break;
                    case 1:
                        //若第二级选择"请选择"则返回第一级areaId
                        //根据数据结构(对象中只有一个属性)
                        //取areaIdArray、areaNameArray的第 selectedIndex[0] 个对象的第一个属性key值(对象中只有一个属性)
                        areaId = Object.keys(this.state.areaIdArray[selectedIndex[0]])[0];
                        areaName = Object.keys(this.state.areaNameArray[selectedIndex[0]])[0];
                        break;
                    case 2:
                        //若第三级选择"请选择"则返回第二级areaId
                        //根据数据结构(对象中只有一个属性)
                        //取areaIdArray、areaNameArray的第一个数组对象的第一个属性value值(其为一个对象数组)
                        //再取本对象数组的第 selectedIndex[1] 个对象的第一个属性key值(对象中只有一个属性)
                        areaId = Object.keys(Object.values(this.state.areaIdArray[selectedIndex[0]])[0][selectedIndex[1]])[0];
                        areaName = Object.keys(Object.values(this.state.areaNameArray[selectedIndex[0]])[0][selectedIndex[1]])[0];
                        break;
                    case -1:
                        //没有选择"请选择"则返回最后一级areaId
                        areaId = Object.values(Object.values(this.state.areaIdArray[selectedIndex[0]])[0][selectedIndex[1]])[0][selectedIndex[2]];
                        areaName = Object.values(Object.values(this.state.areaNameArray[selectedIndex[0]])[0][selectedIndex[1]])[0][selectedIndex[2]];
                        break;
                }
                break;
            case '30':
                switch (selectedIndex.indexOf(0)) {
                    case 0:
                        areaId = this.state.permissionAreaId;
                        areaName = this.state.permissionAreaName;
                        break;
                    case 1:
                        areaId = Object.keys(this.state.areaIdArray[selectedIndex[0]])[0];
                        areaName = Object.keys(this.state.areaNameArray[selectedIndex[0]])[0];
                        break;
                    case -1:
                        areaId = Object.values(this.state.areaIdArray[selectedIndex[0]])[0][selectedIndex[1]];
                        areaName = Object.values(this.state.areaNameArray[selectedIndex[0]])[0][selectedIndex[1]];
                        break;
                }
                break;
            case '40':
                switch (selectedIndex.indexOf(0)) {
                    case 0:
                        areaId = this.state.permissionAreaId;
                        areaName = this.state.permissionAreaName;
                        break;
                    case -1:
                        areaId = this.state.areaIdArray[selectedIndex[0]];
                        areaName = this.state.areaNameArray[selectedIndex[0]];
                        break;
                }
                break;
            case '50':
                areaId = this.state.permissionAreaId;
                areaName = this.state.permissionAreaName;
                break;
        }
        return {areaId, areaName};
    }

    hidePicker() {
        Picker.hide();
        this.setState({
            modalVisible: false
        })
    }

}