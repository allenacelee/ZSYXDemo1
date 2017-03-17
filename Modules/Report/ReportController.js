/**
 * =========================================================================
 *
 * @file ReportController
 * @description 请在每个页面中的constructor()方法里实例化一个当前controller，逻辑类型方法全部放在controller中
 * =========================================================================
 *
 * @param funcExample()     //示例方法
 * =========================================================================
 *
 * @example 页面constructor()中实例化：
 *                          constructor(props) {
 *                              super(props);
 *                              this.reportController = new ReportController(this);
 *                          }
 *          页面中调用：this.reportController.initStorage();
 *
 * @author linzixiong
 * @date 2017/1/4
 * @version 1.0
 * =========================================================================
 */

import React from 'react';
import CommunicateService from '../System/Service/CommunicateService'

import Report_Demo from './ReportPages/Demo/Report_Demo'
import Report_zhwjWjtzydDevReportM from './ReportPages/Report_zhwjWjtzydDevReportM'
import Report_gridJifenDay from './ReportPages/Report_gridJifenDay'

export default class ReportController {
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
     * 进入报表页面
     * @param rowData
     */
    onPressReportItem(rowData) {
        let ReportPageComponent = null;
        switch (rowData.menuUrl.split('.')[2]) {
            case 'wgjfAdslHuizongNNew3':// 网格业绩合同月报
                // ReportPageComponent = Report_Demo;
                ReportPageComponent = Report_gridJifenDay;
                break;
            case 'zhwjDevReportM'://网格智慧沃家发展月报
                alert("暂未开放，敬请期待");
                return null;
                break;
            case 'zhwjWjtzydDevReportM'://网格智慧沃家沃家厅发展月报
                ReportPageComponent = Report_zhwjWjtzydDevReportM;
                //alert("暂未开放，敬请期待");
                //return null;
                break;
            case 'keyIndexRanking'://关键指标排名日报
                alert("暂未开放，敬请期待");
                return null;
                break;
            case 'gridJifenDay'://网格业绩合同日报
                // ReportPageComponent = Report_gridJifenDay;
                alert("暂未开放，敬请期待");
                return null;
                break;
            case 'zhwjDevReportD'://网格智慧沃家发展日报
                alert("暂未开放，敬请期待");
                return null;
                break;
            case 'zhwjWjtzydDevReportD'://网格智慧沃家沃家厅发展日报
                alert("暂未开放，敬请期待");
                return null;
                break;
        }
        this.that.props.navigator.push({
            component: ReportPageComponent,
            params: {
                menuId: rowData.menuId,
                menuName: rowData.menuName,
                menuInfoName: rowData.menuUrl.split('.')[2],
                menuCode: rowData.menuCode,
            }
        })
    }

    /**
     * 查询方法
     * @param data
     */
    search(menuCode) {

        //构造网络连接数据
        let content = {};

        if (typeof this.that.state.acctDate == 'string' && this.that.state.acctDate != '') {
            content.acctDate = this.that.state.acctDate;
        }
        if (typeof this.that.state.areaId == 'string' && this.that.state.areaId != '') {
            content.areaId = this.that.state.areaId;
        }

        //网络连接进行登录
        CommunicateService.communicate(menuCode.split('.')[0], menuCode.split('.')[1], content)
            .then((data)=> {
                console.log(data);
                this.that.setState({
                    dataSource: data,//JSON数据源
                })
            });

    }


}

