/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';

import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Entypo'
import Home from '../Home/Home'
import Quota from '../Quota/Quota'
import Report from '../Report/Report'
import More from '../More/More'

export default class Main extends Component {
    //初始化函数
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home'//默认选中home
        }
    }

    render() {
        return (
            <TabNavigator>
                {/*--首页--*/}
                {this.TabNavigatorItem('首页', 'home', 'home', Home, '1')}
                {/*--指标--*/}
                {this.TabNavigatorItem('指标', 'line-graph', 'shop', Quota)}
                {/*--报表--*/}
                {this.TabNavigatorItem('报表', 'text', 'mine', Report)}
                {/*--更多--*/}
                {this.TabNavigatorItem('更多', 'dots-three-horizontal', 'more', More)}
            </TabNavigator>
        )
    }

    TabNavigatorItem(title, icon, selectedTab, Component, badgeText) {
        return (
            <TabNavigator.Item
                title={title}
                renderIcon={() => <Icon name={icon} size={23} color="#999999"/>}
                renderSelectedIcon={() => <Icon name={icon} size={23} color="orange"/>}
                selected={this.state.selectedTab === selectedTab}
                onPress={() => this.setState({selectedTab: selectedTab})}
                selectedTitleStyle={{color: 'orange'}}
                badgeText={badgeText}
            >
                <Component
                    {...this.props}
                />
            </TabNavigator.Item>
        )
    }
}
