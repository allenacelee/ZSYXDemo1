import React, {Component} from 'react'
import {
    View,
    ListView,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native'
import NavigationBar from '../../Pub/NavigationBar/NavigationBar'
import testList from './test_return_visit_list_view.json'
import ContactsMaintenanceComponent from './ContactsMaintenanceComponent';
const width = Dimensions.get('window').width;


export default class ContactsMaintenance extends Component {
    static defaultProps = {
        rowData: {},
    };

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(testList.viewList)
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title="联系人维护"
                    {...this.props}
                />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    style={{flex: 1, width: width}}
                />
                <View style={styles.buttonView}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            alert("新增")
                        }}
                    >
                        <Text style={styles.buttonText}>新增</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            alert("更新")
                        }}
                    >
                        <Text style={styles.buttonText}>更新</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderRow(rowData) {
        return (
            <View>
                <ContactsMaintenanceComponent
                    rowData={rowData}
                />
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: "space-around",
    },
    button: {
        backgroundColor: 'orange',
        width: width * 0.45,
        height: 40,
        borderRadius: 20,
        flexDirection: 'column',
        justifyContent: 'space-around',
        margin: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
    },

});