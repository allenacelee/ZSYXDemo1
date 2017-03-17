/**
 * @file GridTableDemo
 *
 * @requires ./Pub/GridTable/GridTable
 *
 * @author linzixiong
 * @date 2016/12/8
 * @version 1.0
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Button,
} from 'react-native';
import GridTable from '../GridTable'


const dataSource = require('./GridTabledata.json');

export default class GridTableDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/*传入数据按钮*/}
                <Button
                    title="传入数据到GridTable中"
                    onPress={()=>this.setState({
                        dataSource: dataSource.rows
                    })}
                />
                {/*表格数据*/}
                <GridTable
                    titleArray={['分公司', '名单制客户名称', '客户经理名称', '客户经理工号', '客户经理联系方式']}
                    titleWidthArray={[100, 300, 150, 150, 150]}
                    titleHeights={40}
                    dataSource={this.state.dataSource}
                    dataNameArray={['eparchyName', 'name', 'custManagerName', 'custManagerCode', 'custManagerPhone']}
                    stickyColumnNumber={1}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
