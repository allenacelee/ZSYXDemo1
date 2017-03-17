/**
 * =========================================================================
 *
 * @file Decorate
 * @description 装修验收功能点入口页面
 * =========================================================================
 *
 * @author linzixiong
 * @date 2017/3/8
 * @version 1.0
 * =========================================================================
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    WebView,
    TextInput,
    Button,
} from 'react-native';
import NavigationBar from '../../Pub/NavigationBar/NavigationBar'
import DecorateController from "./DecorateController";
import DecorateView from "./DecorateView";

//页面导入

export default class Decorate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ip: '',
        };
        this.decorateController = new DecorateController(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title="装修验收"
                    {...this.props}
                />
                <TextInput style={styles.textInputStyle}
                           returnKeyType="done"
                           clearButtonMode="always"
                           underlineColorAndroid="transparent"
                           placeholder="请输入IP地址"
                           onChangeText={(ip)=>this.setState({
                               ip: ip,
                           })}
                >
                </TextInput>
                <View style={{margin: 5}}>
                    <Button
                        onPress={()=> this.props.navigator.push({
                            component: DecorateView,//具体版块
                            params: {
                                ip: this.state.ip,
                            }
                        })}
                        title="点击进入"
                        color="#841584"
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    textInputStyle: {
        color: '#666',
        fontSize: 15,
        borderWidth: 1,
        borderColor: "#F7F7F7",
        height: 40,
        borderRadius: 5.0,
        marginLeft: 5,
        textAlign: 'center',
    },
});
