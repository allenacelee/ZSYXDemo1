import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
const width = Dimensions.get('window').width;

export default class ContactsMaintenanceComponent extends Component {
    static defaultProps = {
        rowData: {},
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let rowData = this.props.rowData;
        return (
            <View style={styles.container}>
                <View style={styles.custom}>
                    <Icon name='dot-single' size={50}/>
                    <Text>
                        {rowData.cmcustName}
                    </Text>
                </View>
                <View style={styles.telephone}>
                    <Text>
                        电话:{rowData.contactPhone}
                    </Text>
                </View>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        height: 70,
        width: width * 0.95,
        borderBottomWidth: 2,
        borderBottomColor: '#ddd',
        marginLeft: width * 0.025,
        flexDirection: 'row',
        alignItems: 'center',
    },
    custom: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    telephone: {
        position: 'absolute',
        top: 25,
        right: width * 0.1,
    },
});