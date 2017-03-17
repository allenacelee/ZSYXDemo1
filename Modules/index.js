import React, {Component} from 'react';
import {
    AppRegistry,
    Navigator
} from 'react-native';
/**导入外部组件类**/
import Launch from './Main/LaunchImage';
import Orientation from 'react-native-orientation'
if(!__DEV__){
    global.console={
      info:()=>{},
      log:()=>{},
      warn:()=>{},
      error:()=>{},  
    };
}
export default class ZSYXDemo extends Component {

    componentWillMount() {
        Orientation.lockToPortrait();
    }

    render() {
        return (
            <Navigator
                initialRoute={{name: '启动页', component: Launch}}
                configureScene={() => {
                    return Navigator.SceneConfigs.FloatFromBottomAndroid
                }}
                renderScene={(route, navigator) => {
                    let Component = route.component;
                    return <Component {...route.params} navigator={navigator}/>
                }}/>
        );
    }
}

AppRegistry.registerComponent('ZSYXDemo', () => ZSYXDemo);