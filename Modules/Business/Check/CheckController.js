/**
 * =========================================================================
 *
 * @file CheckController
 * @description 请在每个页面中的constructor()方法里实例化一个当前controller，逻辑类型方法全部放在controller中
 * =========================================================================
 *
 * @param funcExample()     //示例方法
 * =========================================================================
 *
 * @example 页面constructor()中实例化：
 *                          constructor(props) {
 *                              super(props);
 *                              this.checkController = new CheckController(this);
 *                          }
 *          页面中调用：this.checkController.funcExample();
 *
 * @author linzixiong
 * @date 2017/3/3
 * @version 1.0
 * =========================================================================
 */

import {
    Alert,
} from 'react-native';


//测试数据
import test_work_query_A from './WorkQuery/test_work_query_A.json';
import test_work_query_B from './WorkQuery/test_work_query_B.json';
import test_work_query_C from './WorkQuery/test_work_query_C.json';
import test_task_query_U from './TaskCheck/test_task_query_U.json';
import test_task_query_D from './TaskCheck/test_task_query_D.json';
import test_check_task_query_D from './CheckTaskQuery/test_check_task_query_D.json';
import test_check_task_query_U from './CheckTaskQuery/test_check_task_query_U.json';
import test_auto_check from './AutoCheck/test_auto_check.json';
import test_check_tast_creater_query from './CheckTaskQuery/test_check_tast_creater_query.json';
import TaskCheckExecute from "./TaskCheck/TaskCheckExecute";
import CheckTaskInfo from "./CheckTaskQuery/CheckTaskInfo";
import WorkQueryInfo from "./WorkQuery/WorkQueryInfo";
import CheckTaskCreaterQuery from "./CheckTaskQuery/CheckTaskCreaterQuery";
import CommunicateService from "../../System/Service/CommunicateService";

export default class CheckController {
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
     * 工作查阅-列表查询
     * @param sts
     * @param waitDesc
     */
    queryWorkList(sts, waitDesc) {
        //去除多选框
        this.that.setState({
            isSelected: false,
        });
        //离线测试数据
        let dataSource;
        switch (sts) {
            case "W":
                dataSource = test_work_query_A.test_work_query_A;
                break;
            case "P":
                dataSource = test_work_query_B.test_work_query_B;
                break;
            case "Y":
                dataSource = test_work_query_C.test_work_query_C;
                break;
        }
        setTimeout(()=>
            this.that.setState({
                dataSource: dataSource,
            }), 500);
        return null;

        //去除多选框
        this.that.setState({
            isSelected: false,
        });
        //显示遮罩层
        this.that.setState({
            indicator: true,
        });
        //读取用户登录staffID
        storage.load({key: 'staffId', id: userId})
            .then(staffId=> {
                //构造网络连接数据
                let content = {
                    waitDesc: waitDesc,
                    sts: sts,
                    staffId: staffId,
                };
                //网络连接进行查询
                CommunicateService.communicate('appConsultWorkListService', 'queryWaitList', content).then((msg)=> {
                    if (msg.isSuccess) {
                        this.that.setState({
                            dataSource: msg.waitList,
                            indicator: false,
                        });
                    } else {
                        this.that.setState({
                            dataSource: [],
                            indicator: false,
                        });
                        Alert.alert('提示', msg.return_msg);
                    }
                }).catch((error) => {
                    this.that.setState({
                        indicator: false,
                    });
                    console.error(error);
                });
            })
            .catch((err)=> {
                console.warn(err);
            });
    }

    /**
     * 工作查询详细信息
     * @param data
     */
    goToWorkInfo(data) {
        //去除多选框
        this.that.setState({
            isSelected: false,
        });

        let Component;
        if (this.that.state.sts == 'Y') {//已办事项进入详细页面
            Component = WorkQueryInfo;
        } else {//根据url进行页面跳转处理工作事件
            switch (data.url) {
                case 'Check/taskCheckExecute':
                    Component = TaskCheckExecute;
                    break;
                default :
                    Alert.alert('提示', '暂未开放');
                    return null;
            }
        }
        this.that.props.navigator.push({
            component: Component,
            params: {
                waitListId: data.waitListId,
                relId: data.relId,
                sts: data.sts,
            }
        })
    }

    /**
     * 工作详细信息查询
     * @param waitListId
     * @param relId
     * @param sts
     */
    queryTaskDetail(waitListId, relId, sts) {
        //离线测试数据
        this.that.setState({
            data: {
                waitDesc: '检查实名信息保护公章',
                waitType: 'XR',
                creatDate: '2017-03-01',
                dealStaffName: '安明磊',
                sts: 'W',
                finishDate: '2017-03-01 11:44:39',
            },
        });
        return null;

        //显示遮罩层
        this.that.setState({
            indicator: true,
        });
        //构造网络连接数据
        let content = {
            waitListId: waitListId,
            relId: relId,
            sts: sts,
        };
        //网络连接进行查询
        CommunicateService.communicate('appConsultWorkListService', 'queryTaskDetail', content).then((msg)=> {
            if (msg.isSuccess) {
                this.that.setState({
                    data: msg.showDetail,
                    indicator: false,
                });
            } else {
                this.that.setState({
                    data: {},
                    indicator: false,
                });
                Alert.alert('提示', msg.return_msg);
            }
        }).catch((error) => {
            this.that.setState({
                indicator: false,
            });
            console.error(error);
        });
    }

    /**
     * 批量删除工作记录
     * @param deleteIdList
     */
    delCompletedTasks(deleteIdList) {
        Alert.alert('提示', '确定批量删除工作记录吗？', [{
            text: '是', onPress: ()=> {
                //显示遮罩层
                this.that.setState({
                    indicator: true,
                });
                //读取用户登录staffID
                storage.load({
                    key: 'staffId', id: userId
                }).then(staffId=> {
                    //构造网络连接数据
                    let waitList = [];
                    for (let i = 0; i < deleteIdList.length; i++) {
                        waitList.push({
                            waitList: deleteIdList[i],
                            dealStaffId: staffId,
                        })
                    }
                    let content = {waitList};
                    //网络连接进行查询
                    CommunicateService.communicate('appConsultWorkListService', 'delCompletedTasks', content).then((msg)=> {
                        Alert.alert('提示', msg.return_msg);
                        this.queryWorkList(this.that.state.sts, this.that.state.waitDesc);
                    }).catch((error) => {
                        Alert.alert('提示', '删除失败');
                        this.that.setState({
                            indicator: false,
                        });
                        console.error(error);
                    });
                    this.that.setState({
                        isSelected: false,
                    })
                }).catch((err)=> {
                    console.warn(err);
                });
            }
        }, {text: '否'}]);
    }

    /**
     * 巡店任务查询列表
     * @param sortType
     */
    queryCheckTaskList(sortType) {
        let dataSource;
        switch (sortType) {
            case "0010":
                dataSource = test_check_task_query_D.test_check_task_query_D;
                break;
            case "0020":
                dataSource = test_check_task_query_U.test_check_task_query_U;
                break;
            case "0030":
                dataSource = test_check_task_query_D.test_check_task_query_D;
                break;
            case "0040":
                dataSource = test_check_task_query_U.test_check_task_query_U;
                break;
        }
        setTimeout(()=>
            this.that.setState({
                dataSource: dataSource,
            }), 500);
    }

    /**
     * 任务巡店列表查询
     * @param sortType
     */
    queryTaskList(sortType) {
        let dataSource;
        switch (sortType) {
            case "U":
                dataSource = test_task_query_U.test_task_query_U;
                break;
            case "D":
                dataSource = test_task_query_D.test_task_query_D;
                break;
        }
        setTimeout(()=>
            this.that.setState({
                dataSource: dataSource,
            }), 500);
    }

    /**
     * 任务详细信息
     * @param data
     * @param isExecute 是否为巡店执行
     * @param autoCheck 是否为自主巡店
     */
    goToCheck(data, isExecute, autoCheck) {
        if (isExecute) {
            this.that.props.navigator.push({
                component: TaskCheckExecute,
                params: {
                    data: data,
                    autoCheck: autoCheck,
                }
            })
        } else {
            this.that.props.navigator.push({
                component: CheckTaskInfo,
                params: {
                    data: data,
                }
            })
        }
    }

    /**
     * 自主巡店列表查询
     */
    queryAutoCheckList() {
        setTimeout(()=>
            this.that.setState({
                dataSource: test_auto_check.test_auto_check,
            }), 500);
    }

    /**
     * 巡店任务创建人查询页面跳转
     */
    checkTaskGoToCreater() {
        this.that.props.navigator.push({
            component: CheckTaskCreaterQuery,
        })
    }

    /**
     * 巡店任务创建人查询
     */
    checkTaskCreaterQuery() {
        setTimeout(()=>
            this.that.setState({
                dataSource: test_check_tast_creater_query.test_check_tast_creater_query,
            }), 500);
    }
}
