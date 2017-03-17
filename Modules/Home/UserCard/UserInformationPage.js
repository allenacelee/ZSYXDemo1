/**
 * Created by xxx on 2017/2/22.
 * 用户详细信息
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
    Text,
    TouchableOpacity
} from 'react-native';

//颜色数组
var colorArray = [{'bgColor':'orange','textColor':'white'},
                  {'bgColor':'#e8e8e8','textColor':'black'},
                  {'bgColor':'#e8e8e8','textColor':'black'},
                  {'bgColor':'#e8e8e8','textColor':'black'}
                 ];

import HomeController from '../HomeController'
import NavigationBar from '../../Pub/NavigationBar/NavigationBar'
import BasicInfoView from './BasicInformationView' //基本信息
import ProductInfoView from './ProductInformation' //产品信息
import CollectionInfoView from './CollectionInformation'//归集信息
import AccountInfoView from './AccountInformation' //开户信息

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var SelectedViewColor = 'orange';
var SelectedTextColor = 'white';

export default class UserInformationPage extends Component{
    static defaultProps = {
        dataArray:{}
    };
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            showComponent:"BasicInfoView"  //需要展示的视图
        };
      }

      render(){
          let  ViewComponent;
          switch (this.state.showComponent){
              case "BasicInfoView":
                  ViewComponent = BasicInfoView;
                  break;
              case "ProductInfoView":
                  ViewComponent = ProductInfoView;
                  break;
              case "CollectionInfoView":
                  ViewComponent = CollectionInfoView;
                  break;
              case "AccountInfoView":
                  ViewComponent = AccountInfoView;
                  break;
          }
          return(
              <View style={styles.container}>
                  <NavigationBar
                      title="用户卡片"
                      {...this.props}
                  />
                  <View style={{width:width,height:height-64,flexDirection:'row'}}>
                      {/* 左侧功能键视图 */}
                      <View style={styles.functionViewStyle}>

                              <View style={{width:100,height:80,justifyContent:'center',alignItems:'center',backgroundColor:colorArray[0].bgColor}}>
                                  <TouchableOpacity onPress={()=>this.clickFunctionItem('Basi')}>
                                    <Text style={{color:colorArray[0].textColor,textAlign:'center'}}>基本信息</Text>
                                  </ TouchableOpacity>
                              </View>

                              <View style={{width:100,height:80,justifyContent:'center',alignItems:'center',backgroundColor:colorArray[1].bgColor}}>
                                  <TouchableOpacity onPress={()=>this.clickFunctionItem('Product')}>
                                    <Text style={{color:colorArray[1].textColor,textAlign:'center'}}>产品信息</Text>
                                  </TouchableOpacity>
                              </View>
                              <View style={{width:100,height:80,justifyContent:'center',alignItems:'center',backgroundColor:colorArray[2].bgColor}}>
                                  <TouchableOpacity onPress={()=>this.clickFunctionItem('Collection')}>
                                    <Text style={{color:colorArray[2].textColor,textAlign:'center'}}>归集信息</Text>
                                  </TouchableOpacity>
                              </View>
                              <View style={{width:100,height:80,justifyContent:'center',alignItems:'center',backgroundColor:colorArray[3].bgColor}}>
                                  <TouchableOpacity onPress={()=>this.clickFunctionItem('Account')}>
                                    <Text style={{color:colorArray[3].textColor,textAlign:'center'}}>开户信息</Text>
                                  </TouchableOpacity>

                              </View>
                      </View>
                      {/* 右侧基本信息展示视图 */}
                      <View style={{width:width-100,height:-64,marginLeft:0,marginTop:0}}>
                          <ViewComponent
                              dataArray={this.props.dataArray}
                          />
                      </View>
                  </View>

              </View>
          )
      }
    clickFunctionItem(typeItem){
        switch (typeItem){
            case "Basi":{
                colorArray = [
                    {'bgColor':'orange','textColor':'white'},
                    {'bgColor':'#e8e8e8','textColor':'black'},
                    {'bgColor':'#e8e8e8','textColor':'black'},
                    {'bgColor':'#e8e8e8','textColor':'black'}
                ];
                this.setState({
                    showComponent:"BasicInfoView"
                });
            }
                break;
            case "Product":{
                colorArray = [
                    {'bgColor':'#e8e8e8','textColor':'black'},
                    {'bgColor':'orange','textColor':'white'},
                    {'bgColor':'#e8e8e8','textColor':'black'},
                    {'bgColor':'#e8e8e8','textColor':'black'}
                ];
                this.setState({
                    showComponent:"ProductInfoView"
                });
            }
                break;
            case "Collection":{
                colorArray = [
                    {'bgColor':'#e8e8e8','textColor':'black'},
                    {'bgColor':'#e8e8e8','textColor':'black'},
                    {'bgColor':'orange','textColor':'white'},
                    {'bgColor':'#e8e8e8','textColor':'black'}
                ];
                this.setState({
                    showComponent:"CollectionInfoView"

                });
            }

                break;
            case "Account":{
                colorArray = [
                    {'bgColor':'#e8e8e8','textColor':'black'},
                    {'bgColor':'#e8e8e8','textColor':'black'},
                    {'bgColor':'#e8e8e8','textColor':'black'},
                    {'bgColor':'orange','textColor':'white'}
                ];
                this.setState({
                    showComponent:"AccountInfoView"
                });
            }

                break;
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    functionViewStyle:{
        backgroundColor:'#e8e8e8',
        alignItems:'center',
        flexDirection:'column',
        width:100,
        height:Dimensions.get('window').height
    }
});