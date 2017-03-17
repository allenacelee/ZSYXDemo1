/**
 * =========================================================================
 *
 * @file
 * @description
 * =========================================================================
 *
 * @author linzixiong
 * @date 2017/2/10
 * @version 1.0
 * =========================================================================
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Button,
} from 'react-native';
import HomeController from '../HomeController'

export default class OwnerInfoListComponent extends Component {

    static defaultProps = {
        rowData: {},
    };

    constructor(props) {
        super(props);
        this.state = {
            acctDate: this.props.acctDate,
        };
        this.homeController = new HomeController(this)
    }

    render() {
        let rowData = this.props.rowData;
        return (
            <View style={styles.container}>
                <View style={styles.detailStyle}>
                    <Image style={styles.imgStyle} source={require("../../Img/img/avatar_left@3x.png")}/>
                    <Text style={[styles.textStyle, {fontSize: 23, color: '#444'}]}>{rowData.name}</Text>
                </View>
                <View style={styles.detailStyle}>
                    <Image style={styles.imgStyle} source={require("../../Img/img/call_left_1@3x.png")}/>
                    <Text style={styles.textStyle}>{rowData.phoneNum}</Text>
                </View>
                <View style={styles.detailStyle}>
                    <Image style={styles.imgStyle} source={require("../../Img/img/icon_product@3x.png")}/>
                    <Text style={styles.textStyle}>{rowData.type}</Text>
                </View>
                <View style={styles.detailStyle}>
                    <Image style={styles.imgStyle} source={require("../../Img/img/addr_left@3x.png")}/>
                    <Text style={styles.textStyle}>{rowData.address}</Text>
                </View>
                <View style={styles.timeViewStyle}>
                    <Text style={{color: 'orange'}}>到期时间:{rowData.expiration}</Text>
                    <Text style={{color: '#67BBCA'}}>续趸时间:{rowData.xudun}</Text>
                </View>
                <Text style={{color: 'orange', marginLeft: 50, position: 'absolute', top: 15, right: 50}}>
                    [{rowData.state} {rowData.date}]</Text>
                <View style={{position: 'absolute', top: 0, right: 0}}>
                    <Image
                        source={rowData.expState == 1 ? require('../../Img/img/continued@3x.png') : require('../../Img/img/no_continued@3x.png')}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderTopColor: '#cccccc',
        paddingTop: 5,
    },
    detailStyle: {
        marginTop: 5,
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textStyle: {
        marginLeft: 10,
    },
    imageStyle: {
        height: 16,
        width: 16,
        marginRight: 2,
    },
    timeViewStyle: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 10,
        justifyContent: 'space-around',
    },
});
