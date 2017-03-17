/**
 * =========================================================================
 *
 * @file
 * @description
 * =========================================================================
 *
 * @author linzixiong
 * @date 2017/1/6
 * @version 1.0
 * =========================================================================
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Button,
} from 'react-native';
import GridTable from '../GridTable'


const dataSource = require('./MultipleGridTableData.json');

export default class MultipleGridTableDemo extends Component {
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
                    titleArray={["分公司", "分局", "网格", "总完成量:1日,2日,3日,4日,5日,6日,7日,8日,9日", "日预算", "日完成量"]}
                    titleWidthArray={[80, 130, 130, [50, 50, 50, 50, 50, 50, 50, 50, 50], 100, 100]}
                    titleHeights={80}
                    dataSource={this.state.dataSource}
                    dataNameArray={["qujuName", "fenjuName", "wanggeName", "monthMb", "monthMb", "busiType", "monthMb", "monthMb", "monthMb", "busiType", "busiType", "busiType", "dayMb", "monthMb"]}
                    stickyColumnNumber={1}
                    isMultipleHeader={true}
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
