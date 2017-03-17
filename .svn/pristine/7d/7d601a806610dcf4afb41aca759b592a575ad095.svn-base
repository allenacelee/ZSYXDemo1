import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ListView,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import ReportController from './ReportController'
import NavigationBar from '../Pub/NavigationBar/NavigationBar'

export default class Report extends Component {
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2})
        this.state = {
            dataSourceMonth: ds.cloneWithRows([]),
            dataSourceDay: ds.cloneWithRows([])
        };
        this.reportController = new ReportController(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title="报表"
                    {...this.props}
                />
                <ScrollView>
                    <View>
                        <ListView
                            dataSource={this.state.dataSourceMonth}
                            renderRow={this.renderRow.bind(this)}
                            enableEmptySections={true}
                            renderHeader={()=>this.renderHeader('月报', 'orange')}
                        />
                    </View>
                    <View>
                        <ListView
                            dataSource={this.state.dataSourceDay}
                            renderRow={this.renderRow.bind(this)}
                            enableEmptySections={true}
                            renderHeader={()=>this.renderHeader('日报', 'green')}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }

    componentDidMount() {
        // 读取页面信息
        storage.load({
            key: 'reportPageData',
            id: userId
        }).then(reportPageData => {
            var ds1 = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2});
            var ds2 = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2});
            this.setState({
                dataSourceMonth: ds1.cloneWithRows(reportPageData.contentList[0].menuList),
                dataSourceDay: ds2.cloneWithRows(reportPageData.contentList[1].menuList)
            })
        }).catch(err => {
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    break;
                case 'ExpiredError':
                    break;
            }
        })
    }

    renderRow(rowData) {
        let rowDatasss = rowData.menuId;
        let imgUrl;
        switch (rowData.imgUrl) {
            case 'img/report_day.png':
                imgUrl = require('../Img/img/report_day@3x.png');
                break;
            case 'img/report_month.png':
                imgUrl = require('../Img/img/report_month@3x.png');
                break;

        }
        return (
            <TouchableOpacity onPress={()=>this.reportController.onPressReportItem(rowData)}>
                <View style={styles.listViewRowStyle}>
                    <Image style={{marginLeft: 20, marginRight: 10, width: 20, height: 20}} source={imgUrl}/>
                    <Text>{rowData.menuName}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    renderHeader(title, barColor) {
        //
        return (
            <View style={styles.listViewHeaderStyle}>
                <View style={[styles.headerBarStyle, {backgroundColor: barColor}]}></View>
                <Text style={{fontSize: 20, color: 'black'}}>{title}</Text>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    listViewRowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 30,
        borderTopWidth: 1,
        borderColor: '#e8e8e8'
    },
    listViewHeaderStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
    },
    headerBarStyle: {
        width: 5,
        height: 24,
        marginTop: 7,
        marginLeft: 8,
        marginRight: 5,
    },
});
