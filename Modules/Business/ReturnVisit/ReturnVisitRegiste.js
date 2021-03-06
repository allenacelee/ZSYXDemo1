import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableWithoutFeedback,
    StyleSheet,
    Dimensions,
    TextInput,
} from 'react-native'
import NavigationBar from '../../Pub/NavigationBar/NavigationBar'
import Icon from 'react-native-vector-icons/FontAwesome';
const width = Dimensions.get('window').width;

export default class ReturnVisitRegiste extends Component {
    static defaultProps = {
        customName: '建设银行金融街支行',
        interviewName: '陈飞凯',
        interviewNumber: '18800101234'
    };

    constructor(props) {
        super(props);
        this.state = {
            isSelect: true,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/*设置导航栏信息*/}
                <NavigationBar
                    title="客户回访登记"
                    isRightButtonText={true}          //设置右边按钮可以为文字
                    rightButtonIcon="提交"            //设置右边按钮显示文字
                    {...this.props}
                />
                {/*客户名称显示*/}
                <View style={styles.similarView}>
                    <Text style={styles.similarText}>
                        客户名称：{this.props.customName}
                    </Text>
                </View>
                {/*走访方式显示*/}
                <View style={styles.similarView}>
                    <Text style={styles.similarText}>走访方式：</Text>
                    <View style={styles.icon}>
                        <TouchableWithoutFeedback onPress={() => {
                            this.setState({
                                isSelect: !this.state.isSelect,
                            })
                        }}>
                            <Icon
                                name={this.state.isSelect ? 'square-o' : 'check-square-o'}
                                size={25}
                                style={[
                                    styles.iconView,
                                    {color: this.state.isSelect ? '#cccccc' : 'orange'}
                                ]}
                            />
                        </TouchableWithoutFeedback>
                        <Text style={styles.similarText}>上门</Text>
                    </View>
                    <View style={[styles.icon, {marginLeft: width * 0.1,}]}>
                        <TouchableWithoutFeedback onPress={() => {
                            this.setState({
                                isSelect: !this.state.isSelect,
                            })
                        }}>
                            <Icon
                                name={this.state.isSelect ? 'check-square-o' : 'square-o'}
                                size={25}
                                style={[
                                    styles.iconView,
                                    {color: this.state.isSelect ? 'orange' : '#cccccc'}
                                ]}
                            />
                        </TouchableWithoutFeedback>
                        <Text style={styles.similarText}>电话</Text>
                    </View>
                </View>
                {/*走访人信息显示*/}
                <View style={styles.similarView}>
                    <Text style={styles.similarText}>走&nbsp;&nbsp;&nbsp;访&nbsp;&nbsp;人：</Text>
                    <View style={styles.icon}>
                        <Icon
                            name='user'
                            size={25}
                            style={styles.iconView}
                        />
                        <Text style={styles.similarText}>
                            {this.props.interviewName}
                        </Text>
                    </View>
                    <View style={[styles.icon, {marginLeft: width * 0.05}]}>
                        <Icon
                            name='phone'
                            size={25}
                            style={styles.iconView}
                        />
                        <Text style={styles.similarText}>
                            {this.props.interviewNumber}
                        </Text>
                    </View>
                    <Icon
                        name="angle-right"
                        size={30}
                        style={styles.angle}
                    />
                </View>
                <View style={styles.textInputView}>
                    <TextInput style={styles.textInputStyle}
                               placeholder="说点什么吧..."
                               returnKeyType="done"
                               numberOfLines={40}
                               multiline={true}
                               placeholderTextColor="#ccc"
                    />
                </View>
                <View>

                </View>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    similarView: {
        height: 50,
        flexDirection: "row",
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
        paddingLeft: width * 0.05,
    },
    similarText: {
        fontSize: 16,
        color:'#555',
    },
    iconView: {
        color: 'orange',
        marginRight: 5,
        marginLeft: 10,
    },
    icon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    angle: {
        color: 'orange',
        position: 'absolute',
        top: 10,
        right: width * 0.03,
    },
    textInputStyle: {
        color: '#555',
        fontSize: 16,
        height: 200,
        width: width * 0.92,
        marginLeft: width * 0.04,
        textAlignVertical:'top',
    },
    textInputView: {
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
    },
});