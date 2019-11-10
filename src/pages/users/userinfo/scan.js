
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    Dimensions,
    Animated,
    InteractionManager,
    Easing,
    Alert,
    Image,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import { RNCamera } from 'react-native-camera';
let { width, height } = Dimensions.get('window');
export default class ScanScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            moveAnim: new Animated.Value(0),
            torchState: 'off'
        };
    }

    componentDidMount() {
        this.startAnimation();
    }

    startAnimation = () => {
        this.state.moveAnim.setValue(0);
        Animated.timing(
            this.state.moveAnim,
            {
                toValue: -320,
                duration: 1500,
                easing: Easing.linear
            }
        ).start(() => this.startAnimation());
    };
    //  识别二维码
    onBarCodeRead = (e) => {
        //alert(e.data)
        //alert(e.type) 条码类型
        //alert(this.state.show)
        if (this.state.show) {
            this.state.show = false;
            if (e) {
                this.props.navigation.navigate('Webview', { url: e.data, nav: this.props.navigation })
            } else {
                Alert.alert(
                    '提示',
                    '扫描失败'
                    [{ text: '确定' }]
                )
            }
        }
    };

    onChangeMode(e) {
        if (this.state.torchState == 'off') {
            this.setState({
                torchState: 'on'
            })
        } else {
            this.setState({
                torchState: 'off'
            })
        }
    };

    render() {
        return (
            <View style={styles.container}>
                {/* <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    onBarCodeRead={this.onBarCodeRead}
                > */}

                <RNCamera
                    style={styles.preview}
                    ratio={'16:9'}
                    defaultVideoQuality={RNCamera.Constants.VideoQuality["720p"]}
                    flashMode={this.state.torchState == 'off' ? RNCamera.Constants.FlashMode.off : RNCamera.Constants.FlashMode.torch}
                    onBarCodeRead={this.onBarCodeRead.bind(this)}
                    //permissionDialogTitle={'请求相机权限'}
                    //permissionDialogMessage={'应用没有获取到相机权限，请先到设置中为应用开启相机权限'}
                >
                    {/* <View style={{ width: 522 * width / 750, height: 521 * height / 1334, position: 'absolute', left: 115 * width / 750, top: 328 * height / 1334, borderWidth: 1, borderColor: 'red', borderStyle: 'solid', backgroundColor: 'transparent' }}>
                    </View> */}
                    <View style={styles.rectangleContainer}>
                        <View style={styles.rectangle} />
                        <Animated.View style={[
                            styles.border,
                            { transform: [{ translateY: this.state.moveAnim }] }]} />
                        <TouchableOpacity onPress={this.onChangeMode.bind(this)}>
                            <Text style={styles.rectangleText}>将二维码放入框内，即可自动扫描</Text>
                        </TouchableOpacity>
                    </View>
                </RNCamera>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: height ,
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        marginTop:height*0.2,
        backgroundColor: 'transparent'
    },
    rectangle: {
        height: height * 0.4,
        width: width - width / 4,
        borderWidth: 1,
        borderColor: '#00FF00',
        backgroundColor: 'transparent'
    },
    rectangleText: {
        flex: 0,
        color: '#fff',
        marginTop: 10
    },
    border: {
        flex: 0,
        width: width - width / 4,
        height: 2,
        backgroundColor: '#00FF00',
    }
});