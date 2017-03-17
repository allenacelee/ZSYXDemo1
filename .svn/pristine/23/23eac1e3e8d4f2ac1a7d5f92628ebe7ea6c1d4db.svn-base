import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import NavigationBar from '../Pub/NavigationBar/NavigationBar'
import SignDemo from './SignDemo/SignDemo'
import ListDemo from '../Pub/ListComponents/ListComponents'
import ServiceDemo from './ServiceDemo/ServiceDemo'
import ActivityAddExec from '../Business/Activity/ActivityAddExec'
import ModalDatePickerDemo from '../Pub/ModalDatePicker/Demo/ModalDatePickerDemo'
import MoreController from "./MoreController";
export default class More extends Component {
    constructor(props) {
        super(props);
        this.moreController = new MoreController(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title="更多"
                    {...this.props}
                />
                <View style={{margin: 5}}>
                    <Button
                        onPress={()=> this.moreController.exit()}
                        title="退出登录"
                        color="#841584"
                    />
                </View>
                <View style={{margin: 5}}>
                    <Button
                        onPress={()=> {
                            this.props.navigator.push({
                                component: SignDemo,//具体版块
                            })
                        }}
                        title="客户回访登记"
                        color="#841584"
                    />
                </View>
                <View style={{margin: 5}}>
                    <Button
                        onPress={()=> {
                            this.props.navigator.push({
                                component: ModalDatePickerDemo,//具体版块
                            })
                        }}
                        title="日期选择器Demo"
                        color="#841584"
                    />
                </View>
                <View style={{margin: 5}}>
                    <Button
                        onPress={()=> {
                            this.props.navigator.push({
                                component: ListDemo,//具体版块
                            })
                        }}
                        title="指标列表Demo"
                        color="#841584"
                    />
                </View>
                <View style={{margin: 5}}>
                    <Button
                        onPress={()=> {
                            this.props.navigator.push({
                                component: ServiceDemo,//具体版块
                            })
                        }}
                        title="服务连接测试Demo"
                        color="#841584"
                    />
                </View>
                <View style={{margin: 5}}>
                    <Button
                        onPress={()=> {
                            this.props.navigator.push({
                                component: ActivityAddExec,//具体版块
                            })
                        }}
                        title="补充活动页面"
                        color="#841584"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
});
