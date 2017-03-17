/**
 * =========================================================================
 *
 * @file DecorateView
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
} from 'react-native';
import NavigationBar from '../../Pub/NavigationBar/NavigationBar'
import DecorateController from "./DecorateController";

//页面导入

export default class DecorateView extends Component {

    static defaultProps = {
        ip: '10.0.2.2',
    };

    constructor(props) {
        super(props);
        this.state = {};
        this.decorateController = new DecorateController(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <WebView
                    source={{uri: "http://" + this.props.ip + "/test/index.html"}}
                    scalesPageToFit={true}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
});
