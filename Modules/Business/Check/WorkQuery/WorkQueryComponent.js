/**
 * =========================================================================
 *
 * @file WorkQueryComponent
 * @description 工作查询公共组件
 * =========================================================================
 *
 * @author liana
 * @date 2017/3/3
 * @version 1.0
 * =========================================================================
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
} from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome'
const width = Dimensions.get('window').width;

export default class WorkQueryComponent extends Component {
    static defaultProps = {
        rowData: {},
        isSelected: false,              //用于判断是否选择，false为不显示，true为显示
        backgroundColor: 'white',
        callbackID: null,               //回传多选框id
    };

    constructor(props) {
        super(props);
        this.state = {
            squareState: false,         //用于判断选择框的状态
        }
    }

    render() {
        return (
            <View style={[styles.container, {backgroundColor: this.props.backgroundColor}]}>
                {/*通过判断isSelected的状态选择是否显示该组件*/}
                {this.props.isSelected ?
                    <TouchableOpacity
                        style={styles.square}
                        onPress={() => {
                            this.setState({
                                squareState: !this.state.squareState,
                            });
                            this.props.callbackID(this.props.rowData.waitListId);
                        }}
                    >
                        <Icon
                            name={this.state.squareState ? "check-square-o" : "square-o"}
                            size={25}
                            style={{color: this.state.squareState ? 'orange' : '#ccc'}}
                        />
                    </TouchableOpacity> :
                    <View></View>
                }

                <View style={[styles.info, {marginLeft: this.props.isSelected ? width * 0.07 : width * 0.03}]}>
                    <Text style={styles.infoText}>工作名称：{this.props.rowData.waitDesc}</Text>
                    <View style={styles.bottomView}>
                        <Text style={[styles.infoText]}>
                            创建时间：{this.props.rowData.createDate}
                        </Text>
                        <Text style={[
                            styles.infoText,
                            {marginLeft: width * 0.05}
                        ]}>
                            状态：
                            {
                                this.props.rowData.sts == 'W' ? '未处理' :
                                    this.props.rowData.sts == 'Y' ? '已处理' : '过期未处理'
                            }
                        </Text>
                    </View>
                </View>
                <View style={styles.angle}>
                    <Icon
                        name="angle-right"
                        size={30}
                        style={{color: "orange"}}
                    />
                </View>
            </View>
        )
    };
}
const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderTopColor: '#e5e5e5',
        flexDirection: 'row',
        height: 100,
    },
    square: {
        position: 'absolute',
        top: 25,
        left: width * 0.01,
    },
    info: {
        justifyContent: 'center',
    },
    infoText: {
        padding: 8,
        color: '#444',
        fontSize: 13,
    },
    angle: {
        position: 'absolute',
        top: 35,
        right: width * 0.05,
    },
    bottomView: {
        flexDirection: 'row',
    }
});

