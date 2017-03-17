/**
 * @file AutoCheckComponent
 * @author liana
 * @version 1.0
 **/

import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
const width = Dimensions.get('window').width;

export default class AutoCheckComponent extends Component {
    static defaultProps = {
        rowData: {},
        backgroundColor: 'white'
    };

    constructor(props) {
        super(props);
    }

    render() {
        let rowData = this.props.rowData;
        return (
            <View style={[styles.container, {backgroundColor: this.props.backgroundColor}]}>
                <View style={styles.info}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.text}>
                            门店名称：
                        </Text>
                        <Text style={[styles.text, {width: width * 0.65}]}>
                            {rowData.taskName}
                        </Text>
                    </View>
                    <Text style={styles.text}>
                        门店编码：{rowData.officeCode}
                    </Text>
                    <View style={{flexDirection: 'row', marginBottom: 10}}>
                        <Text style={styles.text}>
                            地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：
                        </Text>
                        <Text style={[styles.text, {width: width * 0.65}]}>
                            {rowData.officeAddress}
                        </Text>
                    </View>
                </View>
                <View style={styles.angle}>
                    <Icon name='angle-right' size={30} style={{color: 'orange'}}/>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        height: 130,
        borderTopWidth: 1,
        borderTopColor: '#e5e5e5',
        flexDirection: 'row',
    },
    info: {
        marginTop: 10,
        marginLeft: 10,
        justifyContent: 'space-around',
    },
    text: {
        color: '#555',
        fontSize: 13,
    },
    angle: {
        position: 'absolute',
        top: 50,
        right: width * 0.05
    },
});