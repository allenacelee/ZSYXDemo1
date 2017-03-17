import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Dimensions,
    TouchableOpacity,
    ScrollView,

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import NavigationBar from '../Pub/NavigationBar/NavigationBar'
import QuotaController from "./QuotaController";

const Width = Dimensions.get('window').width;
//const Height = Dimensions.get('window').height;
//日指标数据
var DayQuotaData = require('../../LoaclData/DayQuotaData.json');
//月指标数据
var MonthQuotaData = require('../../LoaclData/MonthQuotaData.json');

export default class Quota extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: 'day',
            dataArray: [],
            dayDataArray: [],
            monthDataArray: []
        };
        this.quotaController = new QuotaController(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title="指标"
                    {...this.props}
                />
                {/* 日指标 OR 月指标 标题*/}
                <View style={styles.titleViewStyle}>
                    {/* 日指标 */}
                    <TouchableOpacity style={styles.dayQuotaStyle} onPress={()=>this.clickOnDayQuotaItem()}>
                        <View
                            style={[styles.dayQuotaStyle, {backgroundColor: this.state.selectedItem == 'day' ? 'orange' : 'white'}]}>
                            <Text style={{color: this.state.selectedItem == 'day' ? 'white' : 'orange'}}>日指标</Text>
                        </View>
                    </TouchableOpacity>
                    {/* 月指标 */}
                    <TouchableOpacity style={styles.monthQuotaStyle} onPress={()=>this.clickOnMonthQuotaItem()}>
                        <View
                            style={[styles.monthQuotaStyle, {backgroundColor: this.state.selectedItem == 'month' ? 'orange' : 'white'}]}>
                            <Text style={{color: this.state.selectedItem == 'month' ? 'white' : 'orange'}}>月指标</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* 指标 */}
                <ScrollView bounces={false}>
                    <ScrollView
                        horizontal={true}
                        alwaysBounceHorizontal={false}
                        contentContainerStyle={styles.scrollViewStyle}
                    >
                        {this.renderQuotaView()}
                    </ScrollView>
                </ScrollView>
            </View>
        );
    }

    // 获取月指标和日指标数据
    componentDidMount() {
        // 读取页面信息
        storage.load({
            key: 'quotaPageData',
            id: userId
        }).then(reportPageData => {
            this.setState({
                dayDataArray: reportPageData.contentList[0].menuList,//日指标数据 默认数据
                monthDataArray: reportPageData.contentList[1].menuList, //月指标数据
                dataArray: reportPageData.contentList[0].menuList  // 首次加载 默认加载日指标数据
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

    //点击日指标
    clickOnDayQuotaItem() {
        this.setState({
            dataArray: this.state.dayDataArray,
            selectedItem: 'day'
        })
    }

    //点击月指标
    clickOnMonthQuotaItem() {
        this.setState({
            dataArray: this.state.monthDataArray,
            selectedItem: 'month'
        })
    }

    //渲染具体指标视图
    renderQuotaView() {
        var colorArray = ["rgb(168,205,100)", "rgb(253,174,56)", "rgb(233,85,32)", "rgb(95,200,225)", "rgb(111,208,139)"];
        var dataArray = this.state.dataArray;
        var ItemArray = [];
        for (let i = 0; i < dataArray.length; i++) {
            ItemArray.push(
                <TouchableOpacity key={i} style={{height: 60, marginTop: 10}}
                                  onPress={()=>this.quotaController.onPressQuotaItem(dataArray[i])}>
                    <View style={[styles.quotaViewStyle, {backgroundColor: colorArray[(i + 1 ) % 5]}]}>
                        <Icon name='file-text-o' color='white' size={30}/>
                        <Text style={styles.contextStyle}>{dataArray[i].menuName}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return ItemArray;

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'

    },
    //标题View样式
    titleViewStyle: {
        flexDirection: 'row',
        width: Width,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60
    },
    //日指标样式
    dayQuotaStyle: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        height: 35,
        width: (Width - 40) / 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'orange',
        borderWidth: 1.0
    },
    //月指标样式
    monthQuotaStyle: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        height: 35,
        width: (Width - 40) / 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'orange',
        borderWidth: 1.0
    },
    //指标列表视图样式
    quotaViewStyle: {
        width: (Width - 30) / 2,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    //指标图标样式
    imageStyle: {
        width: 30,
        height: 45,
        marginLeft: 10,
        tintColor: 'white'
    },
    //指标视图底层ScrollView样式
    scrollViewStyle: {
        flexWrap: 'wrap',
        width: Width,
        justifyContent: 'space-around',
        paddingHorizontal: 5
    },
    //指标描述文字样式
    contextStyle: {
        width: (Width - 30) / 2 * 0.6,
        marginLeft: 10,
        color: 'white',
        textAlign: 'center'
    }
});
