/**
 * =========================================================================
 *
 * @file FitmentAcceptComponent
 * @description 门店评级公共组件
 * =========================================================================
 *
 * @author liana
 * @date 2017/3/23
 * @version 1.0
 * =========================================================================
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
} from 'react-native';
const width = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/Entypo'

export default class FitmentAcceptComponent extends Component {
    static defaultProps = {
        rowData: {},
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                {/*信息显示页面*/}
                <View style={styles.mainDisplay}>
                    {/*验收任务名称*/}
                    <View>
                        <Text style={styles.fitAccChName} numberOfLines={1}>
                            {this.props.rowData.fitAccChName}
                        </Text>
                    </View>
                    {/*门店名称*/}
                    <View>
                        <Text>
                            {this.props.rowData.mdname}
                        </Text>
                    </View>
                    {/*有效上报日期*/}
                    <View>
                        <Text>
                            有效上报日期:{this.props.rowData.appearDate}
                        </Text>
                    </View>
                </View>
                {/*用于显示虚线*/}
                <View style={styles.line}></View>
                {/*地址显示*/}
                <View style={styles.addressView}>
                    <Icon
                        name="location"
                        color='lightsalmon'
                        size={15}
                        style={{marginRight: 5}}
                    />
                    <Text>
                        {this.props.rowData.mdaddress}
                    </Text>
                </View>
                {/*审核状态显示*/}
                <View style={styles.stsView}>
                    <Image
                        style={{width: 40, height: 40}}
                        source={
                            this.props.rowData.sts == '01' && this.props.rowData.fbsts == 'Y' ?
                                require('../../../Img/img/fitment_accept_gone.png') :
                                this.props.rowData.sts == '02' && this.props.rowData.fbsts == 'Y' ?
                                    require('../../../Img/img/fitment_accept_wait.png') :
                                    require('../../../Img/img/fitment_accept_nopass.png')
                        }
                    />
                </View>
            </View>
        )
    };
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        height: 140,
        width: width * 0.95,
        margin: 6,
        borderColor: '#eee',
        borderWidth: 1,
    },
    /*信息显示页面样式*/
    mainDisplay: {
        height: 105,
        padding: 10,
        justifyContent: 'space-around',
    },
    /*地址信息样式*/
    addressView: {
        width: width,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },
    /*分割虚线样式*/
    line: {
        width: width,
        borderStyle: 'dotted',
        borderColor: '#eee',
        borderWidth: 1,
    },
    /*验收任务名称样式*/
    fitAccChName: {
        fontSize: 18,
        color: '#333',
        width: width * 0.85,
        overflow: 'hidden',
    },
    /*状态样式*/
    stsView: {
        position: 'absolute',
        top: 0,
        right: 0,
    }
});