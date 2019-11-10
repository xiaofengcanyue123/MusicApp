import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Animated,   //使用Animated组件
    Easing,     //引入Easing渐变函数
    PanResponder,
    Dimensions,
    DeviceEventEmitter,
} from 'react-native';
import { connect } from 'react-redux'

@connect((state) => ({ player: state.player }), {})
export default class Rotate extends Component {
    constructor(props) {
        super(props);
        //使用Animated.Value设定初始化值（缩放度，角度等等）
        this.state = {
            rotateValue: new Animated.Value(0),//旋转角度的初始值
           
        };
        this.playerAnimated = Animated.timing(this.state.rotateValue, {
            toValue: 1,
            duration: 50000,
            easing: Easing.inOut(Easing.linear)
        })
        this.isPlaying=false
    }
    componentWillMount() {
        var { height, width } = Dimensions.get('window');
        this.panResponder = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => {
                // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
                // gestureState.{x,y} 现在会被设置为0
            },
            onPanResponderMove: (evt, gestureState) => {
                // 最近一次的移动距离为gestureState.move{X,Y}

                // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
                // 一般来说这意味着一个手势操作已经成功完成。
                if (gestureState.dx > 0 && Math.abs(gestureState.dx) > (width / 2)) {
                    DeviceEventEmitter.emit("changeMusic", -1);
                } else if (gestureState.dx < 0 && Math.abs(gestureState.dx) > (width / 2)) {
                    DeviceEventEmitter.emit("changeMusic", 1);
                }
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
                // 默认返回true。目前暂时只支持android。
                return true;
            },
        });
    }
    componentDidMount() {
        // 在初始化渲染执行之后立刻调用动画执行函数
        this.listener = DeviceEventEmitter.addListener("pause", () => {
            // console.log('暂停播放---'+playing)
            this.isPlaying=false
            this.stopPlay()
        });
        this.listener = DeviceEventEmitter.addListener("play", () => {
            // console.log('开始播放---'+playing)
            this.isPlaying=true
            this.startPlay()
        });
    }
    rotating() {
        if (this.isPlaying) {
            this.state.rotateValue.setValue(0);
            this.playerAnimated.start(() => {
                this.rotating()
            })
        }
    };

    startPlay() {
        this.playerAnimated.start(() => {
            this.playerAnimated = Animated.timing(this.state.rotateValue, {
                toValue: 1, //角度从0变1
                duration: 50000, //从0到1的时间
                easing: Easing.inOut(Easing.linear), //线性变化，匀速旋转
            });
            this.rotating();
        });
    }

    stopPlay() {
        this.state.rotateValue.stopAnimation((oneTimeRotate) => {
            //计算角度比例
            this.playerAnimated = Animated.timing(this.state.rotateValue, {
                toValue: 1,
                duration: (1 - oneTimeRotate) * 50000,
                easing: Easing.inOut(Easing.linear),
            });
        });
    }
    render() {
        var { height, width } = Dimensions.get('window');
        let { musicIndex, musiclist } = this.props.player
        // this.spin()
        return (
            <View style={{
                alignItems: 'center',
                width: width,
                marginTop: 100,
            }} 
            // {...this.panResponder.panHandlers}
            >
                <Animated.Image
                    source={{ uri: musiclist[musicIndex].img }}
                    // source={musiclist[musicIndex].img}
                    style={{
                        width: 200,
                        height: 200,
                        position: "absolute",
                        bottom: 50,
                        borderRadius: 100, //图片变园(1/2长宽)
                        transform: [
                            {
                                rotateZ: this.state.rotateValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '360deg'],
                                })
                            },
                        ]
                    }}>
                </Animated.Image>
                <Animated.Image source={require('./icon/disc-ip6.png')}
                    style={{
                        width: 300,
                        height: 300,
                        transform: [
                            //使用interpolate插值函数,实现了从数值单位的映
                            //射转换,上面角度从0到1，这里把它变成0-360的变化
                            {
                                rotateZ: this.state.rotateValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '360deg'],
                                })
                            },
                        ]
                    }}>
                </Animated.Image>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {

        alignItems: 'center',
        width: '100%',
        marginTop: 100,
    }
});
