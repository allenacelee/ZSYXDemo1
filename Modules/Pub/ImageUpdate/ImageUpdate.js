import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
    TouchableWithoutFeedback,
    ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-picker';
import ImagePreview from '../ImagePreview/ImagePreview';

const Width = Dimensions.get("window").width;

export default class ImageUpdate extends Component {

    static defaultProps = {
        showImgNum: 5,
        selectedImageArray: [],
        callbackImageArray: null,
    };

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            imgSourceArray: props.selectedImageArray,
            indicator: false,
        };
    }

    render() {
        return (
            <ScrollView
                contentContainerStyle={[styles.container, {height: Width * 0.35 + 10}]}
                horizontal={true}
            >
                {this.renderImageMethod()}
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                    <View style={styles.avatar}>
                        <Icon name='camera' color='#999' size={40}/>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        )
    }

    // 点击删除照片
    removePicMethod(i) {
        //删除数组中指定下表的元素 i为需要删除元素的位置 1为需要删除的长度
        let imgSourceArray = this.state.imgSourceArray;
        imgSourceArray.splice(i, 1);
        this.setState({
            imgSourceArray: imgSourceArray,
        });
        //回传图片数据数组
        this.props.callbackImageArray(imgSourceArray);
    }

    selectPhotoTapped() {
        if (this.state.imgSourceArray.length == this.props.showImgNums) {
            alert('最多上传' + this.props.showImgNums + '张照片');
            return;
        }
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '从相册选取',
            cancelButtonTitle: '取消',
            title: '选择照片',
            storageOptions: {
                skipBackup: true
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) { // 取消
                console.log('User cancelled photo picker');
            }
            else if (response.error) {/* 出错 */
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // 选定照片后执行此分支
                let source = response;
                // You can display the image using either:
                // source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

                //Or:
                // if (__ANDROID__) {
                //     source = {uri: response.uri, isStatic: true};
                // } else {
                //     source = {uri: response.uri.replace('file://', ''), isStatic: true};
                // }

                if (__IOS__) {
                    source.uri = response.uri.replace('file://', '')
                }

                let imgSourceArray = this.state.imgSourceArray;
                imgSourceArray.push(source);
                // 添加选中的图片资源
                this.setState({
                    imgSourceArray: imgSourceArray,
                });
                //回传图片数据数组
                this.props.callbackImageArray(imgSourceArray);

                //todo
                //离线测试
                // setTimeout(()=> {
                //     this.setState({
                //         indicator: false,
                //     });
                // }, 1000);

                //todo
                //构造网络请求参数
                // let params = {
                //     data: response.data,//base64.encode(response.data),
                //     type: response.type,
                //     fileName: response.fileName,
                // };
                // console.log(params);
                // CommunicateService.communicate('appMarketingActivityService', 'uploadPicToServer', params)
                //     .then((response)=> {
                //         //解除加载动画
                //         this.setState({
                //             indicator: false,
                //         });
                //         console.log(response)
                //     }).catch((err)=> {
                //     console.warn(err);
                //     alert('上传失败,请重新上传');
                //     this.setState({
                //         indicator: false,
                //     });
                // });
            }
        });
    }

    renderImageMethod() {
        let TempArray = [];
        for (let i = 0; i < this.state.imgSourceArray.length; i++) {
            TempArray.push(
                <TouchableOpacity onPress={this.clickOnItem.bind(this, this.state.imgSourceArray, i)} key={i}>
                    <Image style={styles.ImgStyle} source={this.state.imgSourceArray[i]} key={i}>
                        {/* 删除图片的按钮 */}{/* 此处传值 需要将 this 也传到removePicMethod此方法中*/}
                        <TouchableWithoutFeedback style={styles.removeImgStyle}
                                                  onPress={this.removePicMethod.bind(this, i)}>
                            <View style={styles.removeImgStyle}>
                                <Icon name='cross' size={15} color='white'/>
                            </View>
                        </TouchableWithoutFeedback>
                    </Image>
                </TouchableOpacity>
            )
        }
        return TempArray;
    }

    // 点击图片 进行预览
    clickOnItem(imageSourceArray, index) {
        this.props.navigator.push({
            component: ImagePreview,
            params: {
                imageSourceArray: imageSourceArray,
                clickItemIndex: index,
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        height: Width * 0.35,
    },
    avatar: {
        width: Width * 0.35,
        height: Width * 0.35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#999',
        backgroundColor: '#F6F6F6'
    },
    ImgStyle: {
        width: Width * 0.35,
        height: Width * 0.35,
        marginRight: 10
    },
    removeImgStyle: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 20,
        height: 20,
        backgroundColor: '#999',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
