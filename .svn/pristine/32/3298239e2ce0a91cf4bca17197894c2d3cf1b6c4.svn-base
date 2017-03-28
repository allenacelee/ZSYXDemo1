/**
 * =========================================================================
 *
 * @file 【公共组件】加载动画 Indicator
 * @description 遮罩层加载动画公共组件
 * =========================================================================
 *
 * @param visible: false    //显示隐藏状态
 * @param text: ''          //提示信息
 * =========================================================================
 *
 * @author linzixiong
 * @date 2017/3/14
 * @version 1.0
 * =========================================================================
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Dimensions,
    Modal,
    TouchableWithoutFeedback,
} from 'react-native';

const {width} = Dimensions.get("window");

export default class Indicator extends Component {

    static defaultProps = {
        visible: false,
        text: '',
        onRequestClose: ()=> {
        },
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={()=> this.props.onRequestClose()}
            >
                <View style={styles.container}>
                    {/*indicator加载视图*/}
                    <View style={styles.indicatorView}>
                        <ActivityIndicator
                            animating={true}
                            size="large"
                            color="orange"
                        />
                        <Text style={{color: 'white'}}>{this.props.text}</Text>
                    </View>
                    {/*强制返回*/}
                    <TouchableWithoutFeedback onPress={()=>this.props.onRequestClose()}>
                        <View style={styles.backView}>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </Modal>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    indicatorView: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.4,
        height: width * 0.4,
        borderRadius: 5,
    },
    backView: {
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        position: 'absolute',
        top: 0,
        left: 0,
        width: 40,
        height: 40,
    }
});