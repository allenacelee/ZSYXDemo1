/**
 * Created by xxx on 2016/12/15.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ListView,
    Dimensions
} from 'react-native';

import NavigationBar from '../../Pub/NavigationBar/NavigationBar'

export default class ContractUsersPage extends Component {

    render(){
        return(
            <View style={styles.container}>
                {/* rightButtonIcon="home" */}
                <NavigationBar
                    title="已续约"
                    titleColor="orange"
                    onPressRightIcon={()=>this.props.navigator.popToTop()}
                    {...this.props}
                />
                <Text>已续约用户</Text>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})