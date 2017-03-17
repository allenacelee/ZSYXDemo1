/**
 * =========================================================================
 *
 * @file ActivityController
 * @description 请在每个页面中的constructor()方法里实例化一个当前controller，逻辑类型方法全部放在controller中
 * =========================================================================
 *
 * @param funcExample()     //示例方法
 * =========================================================================
 *
 * @example 页面constructor()中实例化：
 *                          constructor(props) {
 *                              super(props);
 *                              this.activityController = new ActivityController(this);
 *                          }
 *          页面中调用：this.activityController.funcExample();
 *
 * @author linzixiong
 * @date 2017/2/17
 * @version 1.0
 * =========================================================================
 */

import {
    Alert,
} from 'react-native';

//工具类
import CommunicateService from '../../System/Service/CommunicateService'
import ModalDatePicker from '../../Pub/ModalDatePicker/ModalDatePicker'

//页面
import ActivityInfo from "./ActivityInfo"
import ActivityAddExec from "./ActivityAddExec"

//测试数据
import test_activity_list from "./test_activity_list.json"
import test_activity_info from "./test_activity_info.json"

export default class ActivityController {
    constructor(that) {
        //定义that表示页面的this，可用this.that.state等方式调用页面内容
        this.that = that;
    }

    /**
     * 示例方法
     */
    funcExample() {
        //设置页面state
        this.that.setState({
            name: 'newName'
        });
        //进行页面跳转(循环跳转到自己)
        this.that.props.navigator.push({
            component: this.that
        })
    }

    /**
     * 活动列表查询
     */
    queryActivityList() {
        //读取用户登录permissionAreaId
        storage.load({key: 'permissionAreaId', id: userId}).then(permissionAreaId=> {
            //构造网络连接数据
            let content = {
                dgridId: permissionAreaId
            };
            //网络连接进行查询
            CommunicateService.communicate('AppMarketingActivityService', 'queryAllPhysicalGridActivities', content)
                .then((msg)=> {
                    console.log(msg);
                    if (msg.return_code && msg.return_code == "1") {
                        //请求数据失败
                        alert(msg.return_msg);
                    } else {
                        //请求数据成功
                        this.that.setState({
                            dataSource: msg.mktList,
                        })
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    }

    /**
     * 活动列表查询（离线测试）
     */
    queryActivityListOffline() {
        this.that.setState({
            dataSource: test_activity_list.mktList,
        })
    }

    /**
     * 点击进入活动详情
     */
    activityInfo(activityData) {
        this.that.props.navigator.push({
            component: ActivityInfo,
            params: {
                mktActivityId: activityData.mktActivityId,
                mktActivityName: activityData.mktActivityName,
                physicalName: activityData.physicalName,
            }
        });
    }

    /**
     * 查询活动详情
     */
    queryActivityInfo(mktActivityId) {
        //构造网络连接数据
        let content = {
            mktActivityId: mktActivityId
        };
        //网络连接进行查询
        CommunicateService.communicate('AppMarketingActivityService', 'queryDetailInfoOfActivity', content)
            .then((msg)=> {
                console.log(msg);
                if (msg.return_code && msg.return_code == "1") {
                    //请求数据失败
                    alert(msg.return_msg);
                } else {
                    //请求数据成功
                    this.that.setState({
                        dataSource: msg.mktList,
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    /**
     * 查询活动详情（离线测试）
     */
    queryActivityInfoOffline(mktActivityId) {
        this.that.setState({
            activityData: test_activity_info,
        })
    }

    /**
     * 增加活动内容
     */
    addExecContent() {
        this.that.props.navigator.push({
            component: ActivityAddExec,
            params: {
                activityData: this.that.state.activityData,
                mktActivityId: this.that.props.mktActivityId,
                physicalName: this.that.props.physicalName,
            }
        })
    }

    addExecInfo() {
        Alert.alert('提示', '确定提交补充活动信息吗？', [{
            text: '是', onPress: ()=> {
                //显示遮罩层
                this.that.setState({
                    modalVisible: true,
                });
                //读取用户登录staffID
                storage.load({key: 'staffId', id: userId}).then(staffId=> {
                    //构造网络连接数据
                    let content = {
                        mktActivityId: this.that.props.mktActivityId,
                        mktExecDate: this.that.state.mktExecDate,
                        mktExecContent: this.that.state.mktExecContent,
                        ourParticipants: this.that.state.ourParticipants,
                        recordDate: "",
                        recordStaff: staffId,
                        imageType: "J",//todo
                        imageDesc: "描述",//todo
                        image: "",//todo
                        uploadStaff: staffId,
                        uploadDate: "",
                        sts: "A",//todo
                        stsDate: "",
                        operStaff: staffId
                    };
                    //网络连接进行查询
                    CommunicateService.communicate('AppMarketingActivityService', 'insertAdditionalActivityInfo', content)
                        .then((msg)=> {
                            console.log(msg);
                            //解除遮罩层
                            this.that.setState({
                                modalVisible: false,
                            });
                            if (msg) {
                                Alert.alert('提示', '提交成功', [{
                                    text: '是', onPress: ()=> {
                                        this.that.props.navigator.pop();
                                    }
                                }]);
                            } else {
                                alert("提交失败，请重试！");
                            }
                        })
                        .catch((error) => {
                            //解除遮罩层
                            this.that.setState({
                                modalVisible: false,
                            });
                            alert("提交失败，请重试！");
                            console.error(error);
                        });
                });
            }
        }, {text: '否'}]);
    }
}
