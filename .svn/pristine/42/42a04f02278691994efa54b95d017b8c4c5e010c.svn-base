/**
 * Created by xxx on 2017/2/17.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    ListView,
    Dimensions,
    Modal,
    ActivityIndicator,
    RefreshControl,
    Text
} from 'react-native';
import HomeController from '../HomeController'
import NavigationBar from '../../Pub/NavigationBar/NavigationBar'
import CellComponent from '../UserCard/UesrCardCellComponent'
import UserInformationPage from '../UserCard/UserInformationPage'
import SearchBox from './SearchBoxView'

//是否是初次加载
var isFirstLoad = true;
var lastTimeDataCount = 0;

export default class UserCardPage extends Component {

    static defaultProps = {
    }

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            modalVisible: false,
            animating: false,
            dataArray:[],
            isRefreshing:false,
            pages:1,  //请求数据的页数
            dataCount:0, //本次请求返回的数据条数
            ds:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),

        };
        this.HomeController = new HomeController(this);

      }

    //请求用户卡片模块数据
    componentWillMount() {
        //页面初始化时 若初始请求页数不为0 则设置为0
        if(this.props.pages!=0){
          this.props.pages = 0;
        }
        isFirstLoad = true;
        this.HomeController.getUserCardData(this.HomeController.loadPage,isFirstLoad);
    }
    //初始化完成后 设置首次加载为 false
    componentDidMount() {
        isFirstLoad = false;
    }
    render(){
        return(
            <View style={styles.container}>

                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={()=>this.mainController.cancelLogin()}
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <ActivityIndicator
                            animating={true}
                            size="large"
                        />
                    </View>
                </Modal>

                <NavigationBar
                    title="用户卡片"
                    {...this.props}
                />
                {/* 搜索框 */}
                <SearchBox
                    dataArray={this.state.dataArray}
                    SlecteSearchType={()=>this.SlecteSearchType(this)}
                    TextInputTextChanged={()=>this.TextInputTextChanged(this)}
                />
                <View style={{backgroundColor:'#e8e8e8',width:Dimensions.get('window').width,height:1 ,marginTop:1}}/>
                {this.renderUserCardMethod()}
            </View>
        )
    }

    SlecteSearchType(){
        alert('选择筛选类型');
    }
    TextInputTextChanged(text){
        alert('输入框文本发生变化');
    }




    //用户卡片列表渲染方法
    renderUserCardMethod(){
        if(this.state.dataArray && this.state.dataArray.length>0){
            return(
                <ListView
                    dataSource={this.state.ds.cloneWithRows(this.state.dataArray)}
                    renderRow={this.renderRow.bind(this)}
                    onEndReachedThreshold={10}
                    renderFooter={this.renderFooter.bind(this)}
                    onEndReached={()=> {this.onloadData()}}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh.bind(this)}
                            tintColor="#ff0000"
                            progressBackgroundColor="#ffff00"
                            enabled={true}
                        />
                    }
                />

            )
        }
    }

    onloadData() {
        //临时记录数据源中的数据量
        if (this.state.dataArray.length > lastTimeDataCount){
            var temp = this.state.dataArray.length;
        }

        //调用网络请求数据方法 获取更多数据
        this.HomeController.getUserCardData(this.HomeController.loadPage ,isFirstLoad);
    }

    //cachedRowCount是DataSource中数据项数量的计数器
    renderFooter() {
        return (<View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 20}}>{this.state.dataArray.length == 45 ? '全部数据加载完毕' : '正在加载更多……'}</Text>
        </View>)
    }
    onRefresh(){
        this.setState({isRefreshing: true});
        this.HomeController.getUserCardData('0',isFirstLoad);
    }

    //点击列表
    clickItem(rowID, index) {
        //数据传递
        this.props.navigator.push({
            component: UserInformationPage, // BuildingPage
            params:{
                dataArray:this.state.dataArray[rowID] //this.state.dataArray[rowID],
            }
        })
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <CellComponent
                dataArray={rowData}
                clickOnItem={this.clickItem.bind(this)}
                rowID={rowID}
            />
        )
    }

    contextChanged(text){
        if (text === '')return;
        alert('文本框内容发生改变');
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        flex:1
    },
    searchTextInput:{
        backgroundColor: 'white',
        borderColor: '#cccccc',
        borderRadius: 2,
        borderWidth: 1,
        height: 35,
        marginTop:5,
        marginLeft:5,
        width:Dimensions.get('window').width - 10,
        fontSize:15
    }
});