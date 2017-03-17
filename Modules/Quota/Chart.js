/**
 * =========================================================================
 *
 * @file 指标页面下级的Demo
 * @description
 * =========================================================================
 *
 * @author linzixiong
 * @date 2016/12/8
 * @version 1.0
 * =========================================================================
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Button,
    WebView,
} from 'react-native';

import QuotaDemo2 from './QuotaDemo/QuotaDemo2'
import QuotaDemo3 from './QuotaDemo/QuotaDemo3'

export default class Chart extends Component {
    static defaultProps = {
        title: 'new',
        chartData: {},
        navigator: null,
        acctDate: null,
        quotaData: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            chartData: this.props.chartData,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            chartData: nextProps.chartData,

        });
        if (this.props.chartData != nextProps.chartData) {
            this.web.reload();
        }
    }

    render() {
        let script = `
            var lineData = ${JSON.stringify(this.state.chartData)};
            function initData(originalData) {
            var chart = new Object();
            chart.title = originalData.title;
            chart.type = originalData.type;
            chart.xInfo = originalData.xInfo;
            chart.yInfo = originalData.yInfo;       
            chart.data = originalData.data;
            return chart;
            };
            var eData = initData(lineData);
            var myChart = echarts.init(document.getElementById('chart'));
            function initChart(chartData) {
            if (chartData.type == 'line') {
                currentPoint = new Object();
                currentPoint.value = chartData.data[chartData.data.length - 1];
                currentPoint.itemStyle = {normal: {color: '#598CAF'}};
                chartData.data[chartData.data.length - 1] = currentPoint;
            }
            var option = {
                title: {
                    text: chartData.title,
                    left: 'center'
                },
                grid: {
                    x: chartData.type == 'line' ? '10%' : '15%',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a}{b}:{c}'
                 },  
                xAxis: {
                    type: chartData.type == 'line' ? 'category' : 'value',
                    axisLabel: {textStyle: {color: 'back'}
                 },           
                axisLine: {
                   
                    lineStyle: {
                        color: '#c0c0c0'
                    }
                },
                data: chartData.xInfo,
                },
                 yAxis: {
                    type: chartData.type == 'line' ? 'value' : 'category',
                    data: chartData.yInfo,
                    axisLine: {             
                        lineStyle: {
                        color: '#c0c0c0'
                    }
                 },
            },
            series: {
                symbol:'circle',           
                animationDuration: 1,
                type: chartData.type,
                markLine: {symbolSize: '10',},
                symbolSize: '15',
                barWidth:'70%',
                lineStyle: {normal: {color: '#ff8000'}},
                label: {normal: {show: true}},          
                itemStyle: {
                    normal: {
                        color: chartData.type == 'line' ? '#ff8000' : function (params) {
                            var colorList = [
                                '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                                '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                                '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                            ];
                            return colorList[params.dataIndex]
                        }
                    }
                },
                data: chartData.data,
                },
            };   
            return option;
            };
            myChart.setOption(initChart(eData));
            myChart.on('click',function(params){
            console.log("params:"+params);   
            window.postMessage(params.dataIndex)});
        `;

        let HTML = `
            <!DOCTYPE html>
            <html style="height: 100%;width:100%">
            <head>
            <meta name="viewport"
              content="target-densitydpi=device-dpi,width=device-width, initial-scale=1, user-scalable=no,minimum-scale=1.0, maximum-scale=1.0"/>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/3.4.0/echarts.min.js"></script>
            <meta charset="utf-8">
            <title>ECharts</title>
            </head>
            <body style="height: 100%;width:100%">
            <div id="chart" style="height: 100%;width:100%;"></div>
            </body>
            </html>
        `;
        let url;
        if (__DEV__) {
            url = require('./QuotaDemo/repaint.html');
        } else if (__IOS__) {
            return (
                <View style={styles.container}>
                    <WebView
                        style={{flex: 1}}
                        source={{html: HTML}}
                        scalesPageToFit={true}
                        onMessage={this.onMessage.bind(this)}
                        injectedJavaScript={script}
                    />
                </View>
            );
        } else {
            url = {uri: 'file:///android_asset/web/repaint.html'};
        }
        return (
            <View style={styles.container}>
                <WebView
                    ref={(ref)=>this.web = ref}
                    style={{flex: 1}}
                    source={url}
                    scalesPageToFit={true}
                    onMessage={this.onMessage.bind(this)}
                    injectedJavaScript={script}
                />
            </View>
        );
    }

    onMessage(e) {
        let dataIndex = parseInt(e.nativeEvent.data);
        let areaID = [];
        if (this.state.chartData.areaType != 20) {
            for (x in this.state.chartData.areaId) {
                areaID.push(this.state.chartData.areaId[x]);
            }
        }
        if (this.state.chartData.areaType == 20) {
            this.props.navigator.push({
                component: QuotaDemo2,
                params: {
                    quotaData: this.props.quotaData,
                    acctDate: this.props.acctDate,
                    areaId: areaID[dataIndex],
                    selected: 'bar',
                }
            })
        }
        else if (this.state.chartData.areaType == 30) {
            this.props.navigator.push({
                component: QuotaDemo3,
                params: {
                    selected: 'bar',
                    quotaData: this.props.quotaData,
                    acctDate: this.props.acctDate,
                    areaId: areaID[dataIndex],
                    areaType: this.state.chartData.areaType,
                }
            })
        }
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    topViewStyle: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F7F7F7'
    }
});
