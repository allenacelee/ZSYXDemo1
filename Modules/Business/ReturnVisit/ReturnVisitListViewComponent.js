/**
 * =========================================================================
 *
 * @file ReturnVisitListViewComponent
 * @description 客户回访列表内部公共组件
 * =========================================================================
 *
 * @author linzixiong
 * @date 2017/2/28
 * @version 1.0
 * =========================================================================
 */
import React, {Component} from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
const width = Dimensions.get('window').width;

export default class ReturnVisitListViewComponent extends Component {
    static defaultProps = {
        rowData: {},
    };

    constructor(props) {
        super(props);
        this.state = {
            isStar: this.props.rowData.isStar != '0',
        };
    };

    render() {
        let rowData = this.props.rowData;
        return (
            <View style={styles.container}>
                <View>
                    <TouchableOpacity onPress={() => {
                        this.setState({
                            isStar: !this.state.isStar,
                        })
                    }}>
                        <Icon
                            name={this.state.isStar ? "star" : "star-o"}
                            size={25}
                            style={[styles.star, {color: this.state.isStar ? 'orange' : '#cccccc'}]}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.normal}>
                    <Text style={styles.compText}>{rowData.contactName}</Text>
                    <Text style={styles.addressText}>{rowData.pgidName}</Text>
                </View>
                <View style={styles.customView}>
                    <Text style={styles.customInfo}>
                        {rowData.cmcustName}
                    </Text>
                </View>
            </View>
        )
    };
}
const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderTopColor: '#e5e5e5',
        paddingTop: 5,
        flexDirection: 'row',
        height: 100,
    },
    star: {
        marginTop: 30,
        marginLeft: 20,
    },
    normal: {
        justifyContent: 'center',
    },
    compText: {
        padding: 10,
        fontSize: 15,
        color: '#444',
    },
    addressText: {
        fontSize: 14,
        color: '#bbbbbb',
        padding: 10,
    },
    customView: {
        position: 'absolute',
        top: 21,
        right: width * 0.07,
    },
    customInfo: {
        fontSize: 15,
        color: '#444',
    }
});

