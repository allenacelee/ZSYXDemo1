/**
 * Created by xxx on 2017/3/3.
 * 巡店任务
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Button,
    ScrollView,
    Dimensions,
    Text
} from 'react-native';
import NavigationBar from '../../../Pub/NavigationBar/NavigationBar'
export default class CheckTaskQueryInfo extends Component {
        static defaultProps = {
            data:{
                taskName:'常规巡店',
                taskType:'日常任务',
                taskDescribe:'请各分局渠道经理继续常规巡店,保证所有门店正常巡店',
                taskKeyword:'巡店',
                checkTemplate:'合作营业厅检查模板',
                scheduledTime:'2017-03-03',
                priority:'高',
                marketingUnit:'二区中关村局二里庄网格',
                channel:'中关村局社会渠道',
                stores:'北京信诚飞华通信有限公司二里庄合作厅',
                personCharge:'崔达',
                creater:'唐君',
                creatTime:'2017-03-03',
                taskState:'已处理',
                completionTime:'2017-03-05',
                pastDue:'未过期'
            }
        };
        render(){
            return(
                <View style={styles.container}>
                    <NavigationBar
                        title="巡店任务视图"
                        {...this.props}
                    />
                    <ScrollView>
                        {/* 任务名称、类型 */}
                        <View style={styles.cellStyle}>
                            <Text style={styles.textStyle}>{'任务名称: '+this.props.data.taskName}</Text>
                            <Text style={styles.textStyle}>{'任务类型: '+this.props.data.taskType}</Text>
                        </View>
                        {/* 任务描述*/}
                        <View style={styles.cellStyle}>
                        <Text style={styles.textStyle} numberOfLines={2}>{'任务描述: '+this.props.data.taskDescribe}</Text>
                        </View>
                        {/* 任务关键字 */}
                        <View style={styles.cellStyle}>
                            <Text style={styles.textStyle}>{'任务关键字: '+this.props.data.taskKeyword}</Text>
                        </View>
                        {/* 检查模板 */}
                        <View style={styles.cellStyle}>
                            <Text style={styles.textStyle}>{'检查模板: '+this.props.data.checkTemplate}</Text>
                        </View>
                        {/* 要求完成时间、优先级 */}
                        <View style={styles.cellStyle}>
                            <Text style={styles.textStyle}>{'要求完成时间: '+this.props.data.scheduledTime}</Text>
                            <Text style={styles.textStyle}>{'优先级: '+this.props.data.priority}</Text>
                        </View>
                        {/* 营销单元 */}
                        <View style={styles.cellStyle}>
                            <Text style={styles.textStyle}>{'营销单元: '+this.props.data.marketingUnit}</Text>
                        </View>
                        {/* 渠道 */}
                        <View style={styles.cellStyle}>
                            <Text style={styles.textStyle}>{'渠道: '+this.props.data.channel}</Text>
                        </View>
                        {/* 门店 */}
                        <View style={styles.cellStyle}>
                            <Text style={styles.textStyle}>{'门店: '+this.props.data.stores}</Text>
                        </View>
                        {/* 责任人、创建人、创建时间 */}
                        <View style={styles.cellStyle}>
                            <Text style={styles.textStyle}>{'责任人: '+this.props.data.personCharge}</Text>
                            <Text style={styles.textStyle}>{'创建人: '+this.props.data.creater}</Text>
                            <Text style={styles.textStyle}>{'创建时间: '+this.props.data.creatTime}</Text>
                        </View>
                        {/* 任务状态、实际完成时间 */}
                        <View style={styles.cellStyle}>
                            <Text style={styles.textStyle}>{'任务状态: '+this.props.data.taskState}</Text>
                            <Text style={styles.textStyle}>{'完成时间: '+this.props.data.completionTime}</Text>
                        </View>
                        {/* 是否过期 */}
                        <View style={styles.cellStyle}>
                            <Text style={styles.textStyle}>{'是否过期: '+this.props.data.pastDue}</Text>
                        </View>
                    </ScrollView>
                </View>
            )
        }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    cellStyle:{
        flexDirection:'row',
        height:44,
        borderBottomColor:'#e8e8e8',
        borderBottomWidth:1.0,
        justifyContent:'space-between',
        alignItems:'center',
        width: Dimensions.get('window').width-20,
        marginLeft:10
    },
    textStyle:{
        color:'gray'
    }
});