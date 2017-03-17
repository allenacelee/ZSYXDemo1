/**
 * =========================================================================
 *
 * @file 前后台网络请求公共类测试页面
 * @description
 * =========================================================================
 *
 * @requires
 *
 * @param
 * @param
 * @param
 * =========================================================================
 *
 * @example
 * @todo
 *
 * @author linzixiong
 * @date 2016/12/14
 * @version 1.0
 * =========================================================================
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    Alert,
    ToastAndroid
} from 'react-native';
import NavigationBar from '../../Pub/NavigationBar/NavigationBar'
import ConstantService from '../../System/Service/ConstantService'
import EncryptService from '../../System/Service/EncryptService'
import MD5Service from '../../System/Service/MD5Service'
import CommunicateService from '../../System/Service/CommunicateService'

export default class ServiceDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            outTitle: 'outTitle'
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title="服务连接测试Demo"
                    {...this.props}
                />
                <ScrollView>
                    <Text>{`ConstantService.URL:\n` + ConstantService.URL + '\n' }</Text>
                    <Text>{'哈哈哈哈\n'}</Text>
                    <Text>{`EncryptService.encrypt('javascript'):\n` + EncryptService.encrypt('javascript') + '\n'}</Text>
                    <Text>{`EncryptService.decrypt('Vuf2CnZd3DA11DBu20lVNg=='):\n` + EncryptService.decrypt('Vuf2CnZd3DA11DBu20lVNg==') + '\n'}</Text>
                    <Text>{'哈哈哈哈\n'}</Text>
                    <Text>{`MD5Service.hex_md5('Aa123456'):\n` + MD5Service.hex_md5('Aa123456') + '\n'}</Text>
                    <Text>{'afdd0b4ad2ec172c586e2150770fbf9e\n'}</Text>
                    <Button
                        title='发起请求'
                        onPress={this.fetchData.bind(this)}
                    />
                    <Button
                        title='解码'
                        onPress={
                            ()=>console.log(EncryptService.decrypt('Pn5WldU3yLt7JcFQg510tI8BjztY+lDMNzBG0zyCfhp/JdK3lGoxwyRCK8U0LA1FMmvVHxgVxv/nbVoiHZKR4bJatLIDeZlXyyn5Ey7111taD9klAu35O7RFynTILAMnePwxyrWBhUe1pkRgEFWNR2usp4j+A8f27yDu3clyMw4PtM152msp0AP2L5YIELKez8W32iiAGA4i2cXz/Z2Qfw/5IuB5Cy2q/31BbeiWynMieGFeWSFxPkl7274MTrFstKxx5aIKY+vUsB1sL3xWejjWZiv744EyXoUE8O5Q/PDRUxs0oNjNUBxHz2KgjtvBb280x4rKGc1JHs3OZYdO4fCOBCdEGickL23MzNlKilKFj2bacqU0th/iHqAM+YS+6vZVyHDVRfGovdPQvzZnHSqvF0DvUTYvg/ek67FFA+2X1e/FdQEy+ZPGz/Xy4Bz65DaiMigrS6xxYPO5pFxiQkVy83dNU2JrpkUbCnw39TLvok7+W+l8+2lFAOB/1iSOl02IgFsNCJpK9/RZXGB70dga2Dk5bAELKUJ581VtPsidWF9Kej6qFieDjIuX+TO37AuCWnZgXXGwYWGnDZCUneFq0kQJO30QtsRvQh2tdCxe4tIyDoLLWulWs9xHOBoDnWoFL9oRcysH+oSsIJ6xtFH//ZkkCa3XkxTO9LIeAzil0JsostkQY6E3k6q5/1RBgDNR3g1u116vz83PfWLYdrKW8sAtksQjl6dgWKEHhzE='))}
                    />
                </ScrollView>
            </View>
        );
    }

    fetchData() {
        var contentUser = {
            username: 'admin',
            userpassword: MD5Service.hex_md5('Aa123456'),
            userimei: null,
            usermobile: null,
            clientVersion: ConstantService.CLIENT_VERSION
        };
        CommunicateService.communicate('loginService', 'login', contentUser)
            .then(e=>alert(e.isSuccess))
            .catch((error) => console.error(error));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
});
