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
     * 工作记录列表查询
     * @param typeId
     */
    queryWorkList(typeId) {
        let dataSource;
        switch (typeId) {
            case "0010":
                dataSource = test_work_query_A.test_work_query_A;
                break;
            case "0030":
                dataSource = test_work_query_B.test_work_query_B;
                break;
            case "0020":
                dataSource = test_work_query_C.test_work_query_C;
                break;
        }
        setTimeout(()=>
            this.that.setState({
                dataSource: dataSource,
            }), 500);
    }

    /**
     * 批量删除工作记录
     */
    deleteWork() {
        Alert.alert('提示', '确定批量删除工作记录吗？', [{
            text: '是', onPress: ()=> {
                this.that.setState({
                    isSelected: false,
                })
            }
        }, {text: '否'}]);
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
     * 工作查询详细信息
     * @param data
     */
    goToWorkInfo(data) {
        //去除多选框
        this.that.setState({
            isSelected: false,
        });
        this.that.props.navigator.push({
            component: WorkQueryInfo,
            // params: {
            //     data: data,
            // }
        })
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
